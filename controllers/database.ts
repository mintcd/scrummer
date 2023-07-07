import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import sendConfirmMail from './confirm-mail';

export async function connect() {
  const uri = "mongodb+srv://mintbee:235711@mintbee.dzclaqv.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.db("admin").command({ ping: 1 });
  } catch (err) {
    console.log(err)
  }

  return client.db("ScrumAssistant")
}

export async function addUser(host: string, info: UserInfo) {
  const collection = (await connect()).collection("user");
  let user: UserInfo = {
    ...info,
    isActivated: false,
    cookie: null
  };

  console.log(user)

  try {
    if (await collection.findOne({ username: user.username })) {
      throw Error("user already exists");
    }
    await collection.insertOne(user);
    console.log("Added", user.username);
    const token = (await collection.findOne({ username: user.username }))._id.toString()

    await sendConfirmMail(host, info.email, token)

    console.log("Token", token);
  } catch (err) {
    console.error(err.message);
  }
}

export async function activateUser(token: string) {
  const collection = (await connect()).collection('user');

  function generateRandomString(length: number = 20): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  const cookie = generateRandomString()

  const result = await collection.updateOne(
    {
      _id: new ObjectId(token),
      isActivated: { $ne: true }
    },
    {
      $set: {
        isActivated: true,
        cookie: cookie
      }
    }
  );

  if (result.modifiedCount === 0) return { status: 300, cookie: null }
  else return { status: 200, cookie: cookie }
}

// export async function verifyCookie(cookie: string | true): Promise<boolean> {
//   return true
// }

