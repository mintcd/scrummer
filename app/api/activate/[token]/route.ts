import { NextResponse } from "next/server";
import { activateUser } from "@controllers/database";

export async function GET(req: Request) {
  const token = req.url.slice(req.url.lastIndexOf('/') + 1)
  activateUser(token);
}