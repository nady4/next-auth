import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Check if email already exists
    const userFoundByEmail = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFoundByEmail) {
      return NextResponse.json({
        error: "Email already exists",
      });
    }

    // Check if username already exists
    const userFoundByUsername = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userFoundByUsername) {
      return NextResponse.json({
        error: "Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        error: "An error occurred while creating the user",
      },
      {
        status: 500,
      }
    );
  }
}
