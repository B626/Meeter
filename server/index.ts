import { NextFunction, Request, Response } from "express";

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
  const { email, password } = req.body;
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
      const token = jwt.sign(user, secretOrPublicKey, {
        expiresIn: 60 * 24,
      });

      res.cookie("authToken", token, { maxAge: 900000, httpOnly: true });
      res.status(201).json({ token, user });
    }
    res.status(400).send("Invalid Credentials");
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

app.get("/user", async (req: Request, res: Response) => {
  try {
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

app.listen(port, () => console.log("Server running on port " + port));
