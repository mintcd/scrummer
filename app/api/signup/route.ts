import { NextRequest, NextResponse } from "next/server"
import { addUser } from "@controllers/database";

export async function POST(req: NextRequest) {
  try {
    if (req.method === "POST") {
      const userInfo: UserInfo = await req.json();
      console.log("Received user info:", userInfo);

      addUser(userInfo);

      return NextResponse.json({ message: "Received data successfully!" });
    } else {
      return NextResponse.json({ message: "Method Not Allowed", status: 405 });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
