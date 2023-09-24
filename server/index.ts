import e, { NextFunction, Request, Response } from "express";

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const uri = process.env.URI;
const port = process.env.PORT || 8000;

const secretOrPublicKey = "secretOrPublicKey";

const client = new MongoClient(uri);

app.use(cookieParser());

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(async (req: Request, res: Response, next: NextFunction) => {
  await client.connect();
  next();
});

app.get("/", (req: any, res: any) => {
  res.json("Hello world", req, res);
});

app.post("/signup", async (req: Request, res: Response) => {
  const {
    email,
    password,
    gender_identity,
    gender_interest,
  } = req.body;
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
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
      hashed_password: hashedPassword,
      first_name: "",
      last_name: "",
      dob_day: "",
      dob_month: "",
      dob_year: "",
      age: null,
      gender_identity,
      gender_interest,
      about: "",
      pic_url:
        "https://www.medqualityassurance.org/views/images/default_user.png",
      matches: []
    };
    await users.insertOne(data);
    res.status(201).json({ userId: generatedUserId, email: sanitiziedEmail });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const database = client.db("app-data");
    const users = database.collection("users");
    const { hashed_password, ...user } = await users.findOne({ email });
    const correctPassword = await bcrypt.compare(password, hashed_password);
    if (user && correctPassword) {
      const token = jwt.sign({email}, secretOrPublicKey, {
        expiresIn: 60 * 24,
      });
      res.cookie("authToken", token, { maxAge: 900000, httpOnly: true });
      res.status(201).json({ token, user });
    }
  } catch (err) {
    res.status(400).send("Invalid Credentials");
    console.log(err);
  }
});

app.post("/logout", async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken");
    res.status(201).json("Logged out");
  } catch (err) {
    res.status(400).send("Invalid Credentials");
    console.log(err);
  }
});

app.put("/updateuser", async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      dob_day,
      dob_month,
      dob_year,
      age,
      about,
      gender_identity,
      gender_interest,
      pic_url,
      matches
    } = req.body;
    const { authToken } = req.cookies;
    const data = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const users = database.collection("users");
    const updateDocument = {
      $set: {
        first_name,
        last_name,
        email,
        dob_day,
        dob_month,
        dob_year,
        age,
        about,
        gender_identity,
        gender_interest,
        pic_url,
        matches
      },
    };
    const insertedUser = await users.updateOne({email:data.email}, updateDocument);
    res.status(200).json(insertedUser);
  } catch (err) {
    console.log(err);
  }
});

app.put("/addmatch", async (req: Request, res: Response) => {
  try {
    const {
      email,
      matched_email
    } = req.body;
    const { authToken } = req.cookies;
    const data = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = {email}
    const updateDocument = {
      $push: {matches: {email: matched_email}}
    };
    const user = await users.updateOne(query, updateDocument)
    res.status(200).json(user);

  } catch (err) {
    console.log(err);
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const database = client.db("app-data");
    const users = database.collection("users");
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (err) {
    console.log(err);
  }
});

app.get("/filteredusers", async (req: Request, res: Response) => {
  try {
    const gender_interest = req.query.gender_interest;
    const age = Number(req.query.age);
    const email = req.query.email;
    const database = client.db("app-data");
    const users = database.collection("users");
    const query =
      gender_interest === "both"
        ? {
            age: { $gte: age - 10, $lte: age + 10 },
          }
        : {
            gender_identity: gender_interest,
            age: { $gte: age - 10, $lte: age + 10 },
          };
    const returnedUsers = await users.find(query).toArray();
    const filteredUsers = returnedUsers.filter((e: any) => e.email !== email);
    res.send(filteredUsers);
  } catch (err) {
    console.log(err);
  }
});

app.get("/matchedusers", async (req: Request, res: Response) => {
  try {
    const { authToken } = req.cookies;
    if (!authToken) res.status(401).send("Not Authorized");
    const { email } = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const users = database.collection("users");
    const { matches } = await users.findOne({ email });
    const matchedUsers:Object[] = await Promise.all(matches.map(async (e: any) => {
      const user = await users.findOne({ email: e.email });
      return user
    }))
    res.send(matchedUsers)
  } catch (err) {
    console.log(err);
  }
});

app.get("/user", async (req: Request, res: Response) => {
  try {
    console.log(req.query)
    const { authToken } = req.cookies;
    if (!authToken) res.status(401).send("Not Authorized");
    const { email } = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const users = database.collection("users");
    const { hashed_password, ...rest } = await users.findOne({ email });
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
  }
});

app.get("/messages", async (req: Request, res: Response) => {
  try {
    const receiverEmail = req.query.email
    const { authToken } = req.cookies;
    const { email } = await jwt.verify(authToken, secretOrPublicKey);
    const query = {
      $or: [
        { from: email, to: receiverEmail },
        { from: receiverEmail, to: email },
      ],
    }; 
    // const query = { from: email, to: receiverEmail }
    const database = client.db("app-data");
    const messagesCollection = database.collection("messages");
    const messages = await messagesCollection.find(query).toArray();
    console.log(messages)
    res.send(messages)
  } catch (err) {
    console.log(err);
  }
});

app.post("/sendmessage", async (req: Request, res: Response) => {
  try {
    const { message, to } = req.body;
    const { authToken } = req.cookies;
    const { email } = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const messagesCollection = database.collection("messages");
    const data = {
      timestamp: Date.now(),
      from: email,
      to,
      message
    }
    await messagesCollection.insertOne(data)
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log("Server running on port " + port));
