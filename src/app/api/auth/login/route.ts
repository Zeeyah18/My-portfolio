import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, signAuthToken } from "@/lib/auth";
import { validateUserCredentials } from "@/lib/user-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = (body.identifier || body.username || body.email || "").toString().trim();
    const password = (body.password || "").toString();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username/email and password are required." },
        { status: 400 },
      );
    }

    const user = await validateUserCredentials(identifier, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid username/email or password." }, { status: 401 });
    }

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
    console.error("Error in login:", error);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
