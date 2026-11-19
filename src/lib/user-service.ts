import { query } from "./db";
import { hashPassword, verifyPassword } from "./auth";

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

// In-memory fallback user store when database is not connected
const memoryUsers: Map<string, UserRecord> = new Map();

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const res = await query<{
      id: string;
      username: string;
      email: string;
      name: string;
      password_hash: string;
      created_at: string;
    }>(
      "SELECT id, username, email, name, password_hash, created_at FROM users WHERE LOWER(email) = $1 LIMIT 1",
      [normalizedEmail],
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0]!;
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.name,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
      };
    }
  } catch (error) {
    console.warn("Database not ready for user query, checking memory store:", error);
  }

  for (const user of memoryUsers.values()) {
    if (user.email.toLowerCase() === normalizedEmail) {
      return user;
    }
  }

  return null;
}

export async function findUserByUsername(username: string): Promise<UserRecord | null> {
  const normalizedUsername = username.toLowerCase().trim();

  try {
    const res = await query<{
      id: string;
      username: string;
      email: string;
      name: string;
      password_hash: string;
      created_at: string;
    }>(
      "SELECT id, username, email, name, password_hash, created_at FROM users WHERE LOWER(username) = $1 LIMIT 1",
      [normalizedUsername],
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0]!;
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.name,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
      };
    }
  } catch (error) {
    console.warn("Database not ready for user query, checking memory store:", error);
  }

  for (const user of memoryUsers.values()) {
    if (user.username.toLowerCase() === normalizedUsername) {
      return user;
    }
  }

  return null;
}

export async function findUserByIdentifier(identifier: string): Promise<UserRecord | null> {
  const clean = identifier.trim();
  if (clean.includes("@")) {
    return findUserByEmail(clean);
  }

  // Try username first, then email
  const byUsername = await findUserByUsername(clean);
  if (byUsername) return byUsername;

  return findUserByEmail(clean);
}

export async function createUser(
  username: string,
  email: string,
  plainPassword: string,
  name?: string,
): Promise<UserRecord> {
  const normalizedUsername = username.toLowerCase().trim();
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = await hashPassword(plainPassword);
  const userName = name?.trim() || username;

  try {
    const res = await query<{
      id: string;
      username: string;
      email: string;
      name: string;
      password_hash: string;
      created_at: string;
    }>(
      `INSERT INTO users (username, email, password_hash, name, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, username, email, name, password_hash, created_at`,
      [normalizedUsername, normalizedEmail, passwordHash, userName],
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0]!;
      const user: UserRecord = {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.name,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
      };
      memoryUsers.set(user.id, user);
      return user;
    }
  } catch (error) {
    console.warn("Database not connected for user insert, storing in memory:", error);
  }

  // Fallback in-memory user
  const fallbackUser: UserRecord = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "user-1",
    username: normalizedUsername,
    email: normalizedEmail,
    name: userName,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  memoryUsers.set(fallbackUser.id, fallbackUser);
  return fallbackUser;
}

export async function validateUserCredentials(
  identifier: string,
  plainPassword: string,
): Promise<UserRecord | null> {
  const user = await findUserByIdentifier(identifier);
  if (!user) return null;

  const valid = await verifyPassword(plainPassword, user.passwordHash);
  if (!valid) return null;

  return user;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  try {
    const res = await query<{
      id: string;
      username: string;
      email: string;
      name: string;
      password_hash: string;
      created_at: string;
    }>(
      "SELECT id, username, email, name, password_hash, created_at FROM users WHERE id = $1 LIMIT 1",
      [id],
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0]!;
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.name,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
      };
    }
  } catch (error) {
    console.warn("DB findUserById error:", error);
  }

  return memoryUsers.get(id) || null;
}

export async function updateUserProfile(
  userId: string,
  data: { name?: string; username?: string; email?: string },
): Promise<{ success: boolean; user?: Partial<UserRecord>; error?: string }> {
  const currentUser = await findUserById(userId);
  if (!currentUser) {
    return { success: false, error: "User not found" };
  }

  const newUsername = (data.username || currentUser.username).toLowerCase().trim();
  const newEmail = (data.email || currentUser.email).toLowerCase().trim();
  const newName = data.name !== undefined ? data.name.trim() : currentUser.name;

  try {
    await query(
      `UPDATE users SET
         username = $1,
         email = $2,
         name = $3,
         updated_at = NOW()
       WHERE id = $4`,
      [newUsername, newEmail, newName, userId],
    );

    const mem = memoryUsers.get(userId);
    if (mem) {
      mem.username = newUsername;
      mem.email = newEmail;
      mem.name = newName;
    }

    return {
      success: true,
      user: {
        id: userId,
        username: newUsername,
        email: newEmail,
        name: newName,
      },
    };
  } catch (err: unknown) {
    console.error("DB updateUserProfile error:", err);
    const msg = err instanceof Error ? err.message : "Failed to update profile";
    return { success: false, error: msg };
  }
}

export async function changeUserPassword(
  userId: string,
  oldPass: string,
  newPass: string,
): Promise<{ success: boolean; error?: string }> {
  const user = await findUserById(userId);
  if (!user) {
    return { success: false, error: "User not found" };
  }

  const isValid = await verifyPassword(oldPass, user.passwordHash);
  if (!isValid) {
    return { success: false, error: "Incorrect current password" };
  }

  const newHash = await hashPassword(newPass);

  try {
    await query("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2", [
      newHash,
      userId,
    ]);

    const mem = memoryUsers.get(userId);
    if (mem) {
      mem.passwordHash = newHash;
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("DB changeUserPassword error:", err);
    return { success: false, error: "Failed to update password in database" };
  }
}
