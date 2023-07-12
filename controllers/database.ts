import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';

export default function connect() {
  const uri = "mongodb+srv://mintbee:235711@mintbee.dzclaqv.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  client.db("admin").command({ ping: 1 })
    .then(() =>
      console.log("Database connection established")
    )
    .catch(err => {
      console.error("Error connecting", err)
    });

  return client.db("ScrumAssistant")
}
