import connect from "@controllers/database";

export async function POST(req: Request) {
  const userInfo: signupInfo = await req.json();
  const collection = connect().collection("user");

  let user = {
    ...userInfo,
    cookie: null
  };

  try {
    const res = await collection.findOne({ $or: [{ username: user.username }, { email: user.email }] });

    if (res) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    } else {
      await collection.insertOne(user);
      return new Response(JSON.stringify({ message: "Signed up successfully" }), { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

