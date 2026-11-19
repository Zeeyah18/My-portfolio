import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, signAuthToken } from "@/lib/auth";
import { createUser, findUserByEmail, findUserByUsername } from "@/lib/user-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, name } = body;

    const trimmedUsername = typeof username === "string" ? username.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!trimmedUsername || trimmedUsername.length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters long." },
        { status: 400 },
      );
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      return NextResponse.json(
        { error: "Username can only contain letters, numbers, underscores, and hyphens." },
        { status: 400 },
      );
    }

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 },
      );
    }

    const existingByUsername = await findUserByUsername(trimmedUsername);
    if (existingByUsername) {
      return NextResponse.json(
        { error: "This username is already taken. Please choose another." },
        { status: 400 },
      );
    }

    const existingByEmail = await findUserByEmail(trimmedEmail);
    if (existingByEmail) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in." },
        { status: 400 },
      );
    }

    const user = await createUser(trimmedUsername, trimmedEmail, password, name);

    const token = await signAuthToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
