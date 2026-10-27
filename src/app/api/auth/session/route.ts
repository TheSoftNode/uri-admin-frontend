import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "uri_admin_session";

/** 7 days — matches the trusted-device duration promised at sign-in. */
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/**
 * TODO(auth): once POST /auth/admin/totp exists on the backend, this route
 * should relay to it and store whatever session token it returns instead of
 * a bare email. For now it just establishes the cookie proxy.ts checks, so
 * the console's route protection and the login flow are real end to end
 * even though there's no backend behind them yet.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
