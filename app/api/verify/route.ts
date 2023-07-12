import { NextRequest, NextResponse } from 'next/server';
import connect from '@controllers/database';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const cookie = data.cookie;

  const users = connect().collection('user');

  const result = await users.findOne({ cookie: cookie }, { projection: { username: 1 } });

  if (!result) return new Response(
    JSON.stringify({ error: "Invalid cookie" }),
    { status: 401 }
  );
  return new Response(
    JSON.stringify({ message: "Valid cookie", user: result }),
    { status: 200 }
  );
}

