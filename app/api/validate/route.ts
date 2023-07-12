import { NextRequest, NextResponse } from 'next/server';
import connect from '@controllers/database';
import { generateCookie } from '@controllers/helpers'
import { isEmail } from '@controllers/helpers';
export async function POST(req: NextRequest) {
  const user = await req.json();
  const users = connect().collection('user');

  console.log(user)

  const isemail = isEmail(user.usernameOrEmail)


  const result = isemail
    ? await users.findOne({ email: user.usernameOrEmail, password: user.password })
    : await users.findOne({ username: user.usernameOrEmail, password: user.password })

  if (!result) return new Response(JSON.stringify({ error: "Email or username invalid" }), { status: 401 });
  else {
    const cookie = generateCookie(32)
    console.log("user", user)
    console.log("Generated cookie", cookie);

    try {
      const updateResult = isemail
        ? await users.updateOne(
          { email: user.usernameOrEmail },
          { $set: { cookie: cookie } }
        )
        : await users.updateOne(
          { username: user.usernameOrEmail },
          { $set: { cookie: cookie } }
        );

      if (updateResult.modifiedCount > 0) {
        console.log('Update successful');
      } else {
        console.log('No documents matched the update criteria');
      }
    } catch (error) {
      console.error('Error occurred during update:', error);
    }
    return new Response(
      JSON.stringify({ message: "Signed in", cookie: cookie }),
      { status: 200 }
    );
  }
}

