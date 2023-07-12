import { NextRequest, NextResponse } from "next/server"
import connect from "@controllers/database"
export async function POST(req: NextRequest) {
  try {
    if (req.method === "POST") {
      const session = await req.json();
      console.log(session)

      const collection = connect().collection('session')
      await collection.insertOne({ ...session, time: new Date })

      return NextResponse.json("OK");
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
