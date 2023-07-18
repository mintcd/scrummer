import connect from "@controllers/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userInfo: signupInfo = await req.json();
  const collection = connect().collection("user");

  let user = {
    ...userInfo,
    cookie: null
  };

  try {
    const res = await collection.findOne({ $or: [{ username: user.username }, { email: user.email }] });

    if (res) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    } else {
      await collection.insertOne(user);
      return NextResponse.json({ message: "Signed up successfully" }, { status: 200 })
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}

