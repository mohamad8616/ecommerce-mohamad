"use server";

import { getSession } from "@/app/_customhooks/hooks";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "./auth";
import { prisma } from "./prismaClient";
import zarinpal from "./zarinPal";

//LOGIN
const LoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long")
    .max(100),
});

export const login = async (prevState: unknown, formData: FormData) => {
  //VALIDATION
  const data = Object.fromEntries(formData);

  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.issues[0].message || "Invalid form data",
      success: false,
    };
  }

  // lOGIN
  try {
    await auth.api.signInEmail({
      body: {
        email: result.data.email,
        password: result.data.password,
        callbackURL: "/",
      },
    });
    return { success: true, error: null, redirect: "/" };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "رمز عبور یا ایمیل اشتباه است" };
  }
  // redirect("/");
};

export const signinByGithub = async () => {
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: "/",
    },
  });

  if (result.url) {
    redirect(result.url);
  }
};

//SIGNUP
const SignupSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.email("Email is not valid"),
  password: z
    .string("Password is required")
    .min(6, "The password must be at least 6 characters long")
    .max(50, "The password must be at most 50 characters long"),
});

export const signup = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const result = SignupSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  try {
    await auth.api.signUpEmail({
      body: {
        email: result.data.email,
        password: result.data.password,
        name: result.data.name,
      },
    });
  } catch (error) {
    console.error("Signup failed:", error);
  }
  redirect("/login");
};

//Signout
export const signout = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
};

export const logout = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
};

//update profile
const updateFormSchema = z.object({
  name: z.string().min(4).max(100),
  image: z.string().url(),
});

export const updateProfile = async (userId: string, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const validatedData = updateFormSchema.safeParse(data);
  if (!validatedData.success) {
    throw new Error(validatedData.error.message);
  }
  const session = await getSession();
  if (!session) {
    throw new Error("User is not authenticated");
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: validatedData.data.name,
        image: validatedData.data.image,
      },
    });
  } catch (error) {
    console.error("Update profile failed:", error);
  }
  revalidatePath("/profile");
};

//Update password
const updatePassSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "رمز عبور باید 6 رقم و بیشتر باشد")
      .max(100, "رمز عبور بسیار طولانی است"),
    currentPassword: z
      .string()
      .min(6, "رمز عبور باید 6 رقم و بیشتر باشد")
      .max(100, "رمز عبور بسیار طولانی است"),
    confirmNewPassword: z
      .string()
      .min(6, "رمز عبور باید 6 رقم و بیشتر باشد")
      .max(100, "رمز عبور بسیار طولانی است"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "رمزهای عبور مطابقت ندارند",
    path: ["confirmNewPassword"],
  });

export const updatePassword = async (
  prevState: unknown,
  formdata: FormData,
) => {
  const data = Object.fromEntries(formdata);

  const session = await getSession();
  if (!session) {
    return { success: false, error: "User is not authenticated" };
  }

  const validatedData = updatePassSchema.safeParse(data);
  if (!validatedData.success) {
    return { success: false, error: "Failed form input validation" };
  }

  if (
    validatedData.data.confirmNewPassword !== validatedData.data.newPassword
  ) {
    return { success: false, error: "Confirm new error failed" };
  }

  try {
    await auth.api.changePassword({
      body: {
        newPassword: validatedData.data.newPassword,
        currentPassword: validatedData.data.currentPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });

    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: "عملیات ناموفق" };
  }
};

//Initiate payment
const PaymentFormSchema = z.object({
  totalPrice: z.string().min(5, "Amount must be at least 10000"),
  description: z.string().min(1, "Description is required").optional(),
  mobile: z.string().min(11, "Mobile number is required"),
  email: z.string().email("Invalid email"),
  cardPan: z.array(z.string()).optional(),
});

export default async function initiatePayment(formData: FormData) {
  //Authentication
  const session = await getSession();
  if (!session) {
    throw new Error("User is not authenticated");
  }

  //Get data from form
  const data = Object.fromEntries(formData);

  // Validation
  const validatedData = PaymentFormSchema.safeParse(data);
  if (!validatedData.success) {
    throw new Error(validatedData.error.message);
  }

  const { totalPrice, description, mobile, email } = validatedData.data;
  try {
    const response = await zarinpal.payments.create({
      amount: Number(totalPrice),
      callback_url: `${process.env.APP_URL}/thanks`,
      description: description ?? `Payment for order ${email}`,
      mobile,
      email,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

//verify payment for admin
export async function verifyPayment(
  authority: string,
  status: string,
  amount: number,
) {
  if (status === "OK") {
    if (amount) {
      try {
        const response = await zarinpal.verifications.verify({
          amount: amount,
          authority: authority,
        });

        if (response.data.code === 100) {
          console.log("Payment verified successfully.");
          return response;
        } else if (response.data.code === 101) {
          console.log("Payment already verified.");
          return response;
        } else {
          console.log("Transaction failed with code:", response.data.code);
        }
      } catch (error) {
        console.error("Payment Verification Failed:", error);
      }
    } else {
      console.log("No Matching Transaction Found For This Authority Code.");
    }
  } else {
    console.log("Transaction was cancelled or failed.");
  }
}

//create Invoice

const InvoiceSchema = z.object({
  lastName: z.string().min(1),
  mobile: z.string().min(11),
  address: z.string().min(1),
  totalPrice: z.string().min(1),
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
      price: z.number(),
    }),
  ),
  authority: z.string(),
});

export async function createInvoiceAction(data: unknown) {
  //Authentication
  const session = await getSession();
  if (!session?.user?.id) {
    return { success: false, error: "کاربر وارد نشده" };
  }

  try {
    const parsed = InvoiceSchema.parse(data);

    await prisma.invoice.create({
      data: {
        invoiceNumber:
          Date.now().toString() +
          Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0"),
        authority: parsed.authority,
        userId: session.user.id,
        totalPrice: Number(parsed.totalPrice),
        items: { create: parsed.items },
        firstname: session.user.name ?? "",
        lastname: parsed.lastName,
        email: session.user.email ?? "",
        mobile: parsed.mobile,
        address: parsed.address,
      },
    });
    console.log("invoice created");
    revalidatePath("/userInvoices");
    return { success: true };
  } catch (error) {
    console.error("Invoice creation failed:", error);
    return { success: false, error: "ثبت سفارش ناموفق بود" };
  }
}
