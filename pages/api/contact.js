// /api/contact
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };

    // console.log(newMessage);

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gmwjq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    let client;
    try {
      // const username = process.env.MONGODB_USERNAME;
      // const password = process.env.MONGODB_PASSWORD;
      // const dbName = "posts";
      // const url = `mongodb+srv://${username}:${password}@cluster0.gmwjq.mongodb.net/${dbName}?retryWrites=true&w=majority`;
      // client = await MongoClient.connect(url);
      // client = await MongoClient.connect(url, {
      //   // useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // });
      client = await MongoClient.connect(connectionString, {
        // useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db(); // client.db("posts");

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}

export default handler;
