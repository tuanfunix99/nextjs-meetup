import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { title, image, address, description } = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://minggu99:minggu99@cluster0.8ty0e.mongodb.net/meetupdb?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const result = await meetupCollection.insertOne({ title, image, address, description });
    console.log(result);
    client.close();
    res.status(201).send({ message: 'success'});
  }
}

export default handler;
