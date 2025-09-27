/*const mongoose = require('mongoose');
const uri = "mongodb+srv://kabiraaxd:Z8VXmr03k7vnLy2z@cluster0.urvhvhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);*/

import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "react_school",
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Error occured while connecting to database");
    });
};



