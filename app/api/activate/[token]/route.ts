import { NextRequest, NextResponse } from "next/server";
import { activateUser } from "@controllers/database";

export async function GET(req: NextRequest) {
  const token = req.url.slice(req.url.lastIndexOf('/') + 1);
  const { status, cookie } = await activateUser(token);

  const response = NextResponse.json({ status: status });

  if (cookie) {
    response.cookies.set('auth', cookie, {
      path: '/',
      httpOnly: false,
    });
  }

  return response;
}
