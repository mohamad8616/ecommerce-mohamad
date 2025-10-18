"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "./auth";
import { getSession } from "@/app/_customhooks/hooks";
import { revalidatePath } from "next/cache";
import { prisma } from "./prismaClient";

//LOGIN
const LoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long")
    .max(100),
});

export const login = async (prevState: any, formData: FormData) => {
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
    const res = await auth.api.signInEmail({
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

export const signout = async () => {
  await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  redirect("/");
};

export const signinByGoogle = async () => {
  const result = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/",
    },
  });

  if (result.url) {
    redirect(result.url);
  }
};

export const logout = async () => {
  await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  redirect("/");
};

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
