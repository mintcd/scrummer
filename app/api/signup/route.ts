import { NextRequest, NextResponse } from "next/server"
import { addUser } from "@controllers/database";

export async function POST(req: NextRequest) {
  try {
    if (req.method === "POST") {
      const userInfo: UserInfo = await req.json();
      const host = req.nextUrl.host

      await addUser(host, userInfo);

      return NextResponse.json({ message: `Signed up successfully!`, status: 200 });
    } else {
      return NextResponse.json({ message: "Sethod Not Allowed", status: 405 });
    }
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 });
  }
}
