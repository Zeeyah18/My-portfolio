import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findUserById } from "@/lib/user-service";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await findUserById(session.userId);
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        username: user?.username || session.username,
        email: user?.email || session.email,
        name: user?.name || session.name || "Admin",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/auth/me:", error);
    return NextResponse.json({ error: "Failed to get current user" }, { status: 500 });
  }
}
