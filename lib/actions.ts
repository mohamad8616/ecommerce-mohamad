"use server";

import { getSession } from "@/app/_customhooks/hooks";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { email, z } from "zod";
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

//create Invoice
const InvoiceSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(5, "Mobile number is required"),
  address: z.string().min(1, "Address is required"),
  totalPrice: z.string().min(1, "Total price is required"),

  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    }),
  ),
});

export const createInvoice = async (formdata: FormData, authority: string) => {
  //Authentication
  const session = await getSession();
  if (!session) {
    throw new Error("User is not authenticated");
  }

  // Validation
  const data = Object.fromEntries(formdata);
  const cartItems = JSON.parse(formdata.get("items") as string);
  const validatedData = InvoiceSchema.safeParse({
    ...data,
    items: cartItems,
    totalPrice: data.totalPrice.toString(),
  });

  if (!validatedData.success) {
    throw new Error(validatedData.error.message);
  }

  const { firstName, lastName, email, mobile, address, items, totalPrice } =
    validatedData.data;

  try {
    await prisma.invoice.create({
      data: {
        invoiceNumber: Math.floor(
          10000000 + Math.random() * 90000000,
        ).toString(),
        authority,
        userId: session.user.id,
        totalPrice: Number(totalPrice),
        items: {
          create: items,
        },
        firstname: firstName,
        lastname: lastName,
        email,
        mobile,
        address,
      },
    });
  } catch (error) {
    console.error("Create invoice failed:", error);
  }
  revalidatePath("/userInvoices");

  redirect("/thanks");
};

//ZarinPal payment

const PaymentFormSchema = z.object({
  amount: z.number().min(10000, "Amount must be at least 10000"),
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

  const { amount, description, mobile, email } = validatedData.data;
  try {
    const response = await zarinpal.payments.create({
      amount: 10000,
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

export async function pay() {
  const res = await fetch(`${process.env.APP_URL}/api/payment/request`, {
    method: "POST",
  });
  const data = await res.json();
  redirect(data.url);
}
