

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import sendConfirmMail from './confirm-mail';

async function connectDatabase() {
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
    console.log("Database connection established");
  } catch (err) {
    console.log(err)
  }

  return client.db("ScrumAssistant")
}

export async function addUser(info: UserInfo) {
  const collection = (await connectDatabase()).collection("user");
  let user = { ...info };
  user.isActive = false;
  try {
    if (await collection.findOne({ username: user.username })) {
      throw new Error("User already exists");
    }
    await collection.insertOne(user);
    console.log("Added", user.username);
    const token = (await collection.findOne({ username: user.username }))._id.toString()

    sendConfirmMail(info.email, token)

    console.log("Token", token);
  } catch (err) {
    console.error(err.message);
  }
}

export async function activateUser(token: string) {
  const collection = (await connectDatabase()).collection("user");
  collection.updateOne(
    { _id: new ObjectId(token) },
    {
      isActive: true
    },
  )
}


