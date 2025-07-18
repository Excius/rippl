"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import z from "zod";
import { auth } from "@/lib/auth";

const credentialsSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
});

export const register = async (formData: FormData) => {
  const email = formData.get("email")?.toString().toLowerCase();
  const username = formData.get("username");
  const password = formData.get("password");

  const parsed = credentialsSchema.safeParse({
    email,
    username,
    password,
  });

  if (!parsed.data?.password) {
    throw new Error("Password is required");
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email: parsed.data.email }, { username: parsed.data.username }],
    },
  });

  if (userExists) {
    throw new Error("User with this email or username already exists");
  }

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      username: parsed.data.username,
      password: hashedPassword,
    },
  });

  if (user) {
    redirect("/auth/login");
  }
};

export async function updateUsername(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const username = formData.get("username")?.toString().trim();

  if (!username) {
    throw new Error("Username is required");
  }

  const userExists = await prisma.user.findFirst({
    where: { username },
  });

  if (userExists) {
    throw new Error("Username already taken");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });

  redirect("/");
}
