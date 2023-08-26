const PORT = 9000;
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const uri =
  "mongodb+srv://browixxx:UBXkYq2oZpa9UshB@meeter.tbkg9xd.mongodb.net/Meeter?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).send("user already exists. Please login");
    }
    const sanitiziedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitiziedEmail,
      hashedPassword: hashedPassword,
    };
    const insertedUser = await users.insertOne(data);
    const token = jwt.sign(insertedUser, sanitiziedEmail, {
      expiresIn: 60 * 24,
    });

    res
      .status(201)
      .json({ token, userId: generatedUserId, email: sanitiziedEmail });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req,res) => {
  const client = new MongoClient(uri)
  const {email, password} = req.body
  console.log(email, password)
  try{
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const user = await users.findOne({email})
    const correctPassword = await bcrypt.compare(password, user.hashedPassword)
    if(user && correctPassword){
      const token = jwt.sign(user, email,{
        expiresIn: 60*24
      })
      console.log(token)
      res.status(201).json({token,userId: user.user_id, email})
    } 
    res.status(400).send('Invalid Credentials')
  } catch(err){
    console.log(err)
  }
})

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
