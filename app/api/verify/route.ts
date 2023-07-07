import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@controllers/database';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const cookie = data.cookie;

  const users = (await connect()).collection('user');

  const result = await users.findOne({ cookie: cookie }, { projection: { username: 1 } });
  if (!result) return NextResponse.json({ user: undefined });
  return NextResponse.json({ user: result.username });
}

