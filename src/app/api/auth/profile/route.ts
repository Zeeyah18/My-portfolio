import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { updateUserProfile, changeUserPassword } from "@/lib/user-service";

export async function PUT(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, username, email, currentPassword, newPassword } = body;

    // Handle password change if requested
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password is required to set a new password." },
          { status: 400 }
        );
      }
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }
      const pwResult = await changeUserPassword(session.userId, currentPassword, newPassword);
      if (!pwResult.success) {
        return NextResponse.json({ error: pwResult.error || "Failed to change password" }, { status: 400 });
      }
    }

    // Handle profile info update
    if (name !== undefined || username !== undefined || email !== undefined) {
      const profResult = await updateUserProfile(session.userId, { name, username, email });
      if (!profResult.success) {
        return NextResponse.json({ error: profResult.error || "Failed to update profile" }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error in PUT /api/auth/profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
