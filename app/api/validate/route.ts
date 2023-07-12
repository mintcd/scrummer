import { NextRequest, NextResponse } from 'next/server';
import connect from '@controllers/database';
import { generateCookie } from '@controllers/helpers'
export async function POST(req: NextRequest) {
  const user = await req.json();
  const users = connect().collection('user');

  console.log(user)
  const result = await users.findOne({ username: user.usernameOrEmail, password: user.password });

  if (!result) return new Response(JSON.stringify({ error: "Email or username invalid" }), { status: 401 });
  else {
    const cookie = generateCookie(32)
    await users.updateOne({ username: user.username }, { $set: { cookie: cookie } });
    return new Response(
      JSON.stringify({ message: "Signed in", cookie: cookie }),
      { status: 200 }
    );
  }
}

