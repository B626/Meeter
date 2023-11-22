import { NextFunction, Request, Response } from "express";

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const server = createServer(app);

const io = new Server({cors: "http://localhost:3000"});

const uri = process.env.URI;
const port = process.env.PORT || 8000;

const secretOrPublicKey = "secretOrPublicKey";
const client = new MongoClient(uri);

app.use(cookieParser());

const corsConfig = {
  origin: true,
  credentials: true,
};

let onlineUsers:any[] = []

let matchedUsers:any[] = []

io.on("connection", (socket: any) => {
  console.log("user connected", socket.id);
  socket.on("addNewUser", (userEmail:any) => {
    !onlineUsers.some((user) => user.userEmail === userEmail) &&
      onlineUsers.push({
        userEmail,
        socketId: socket.id,
      });
      console.log("onlineUsers", onlineUsers);
      io.emit("getOnlineUsers", onlineUsers);
  })
  socket.on("setMatchedUsers", (data:any[]) => {
    matchedUsers = data
  })
  socket.on("sendMessage", (data:any) => {
    const user = onlineUsers.find((user:any) => user.userEmail === data.receiverEmail)
    if(user){
      io.to(user.socketId).emit("getMessage", data.newMessage)
    }
  })
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    io.emit("getOnlineUsers", onlineUsers)
  })
});

io.listen(7000)

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(async (req: Request, res: Response, next: NextFunction) => {
  await client.connect();
  next();
});

app.get("/", (req: any, res: any) => {
  res.send("Hello world");
});

app.post("/signup", async (req: Request, res: Response) => {
  const { email, password, gender_identity, gender_interest } = req.body;
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
      matches: [],
      is_admin: false
    };
    await users.insertOne(data);
    res.status(201).json({ userId: generatedUserId, email: sanitiziedEmail });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const database = client.db("app-data");
    const users = database.collection("users");
    const { hashed_password, ...user } = await users.findOne({ email });
    const correctPassword = await bcrypt.compare(password, hashed_password);
    if (user && correctPassword) {
      const token = jwt.sign({ email }, secretOrPublicKey, {
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
    const insertedUser = await users.updateOne(
      { email: data.email },
      updateDocument
    );
    res.status(200).json(insertedUser);
  } catch (err) {
    console.log(err);
  }
});

app.put("/addmatch", async (req: Request, res: Response) => {
  try {
    const { email, matched_email } = req.body;
    const { authToken } = req.cookies;
    const data = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = { email };
    const updateDocument = {
      $push: { matches: { email: matched_email } },
    };
    const user = await users.updateOne(query, updateDocument);
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
    res.status(201).json(filteredUsers);
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
    const matchedPromises = matches.map((e: { email: string }) =>
      users.findOne({ email: e.email })
    );
    const matchedUsers: Object[] = await Promise.all(matchedPromises);
    res.status(200).json(matchedUsers);
  } catch (err) {
    console.log(err);
  }
});

app.put("/deletematch", async(req:Request, res:Response) => {
  const deletedMatchEmail = req.body.email
  try{  
    const { authToken } = req.cookies;
    const { email } = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const users = database.collection("users");
    const updateMatches = {
      $pull: { matches: { email: deletedMatchEmail } },
    };
    await users.updateOne({email}, updateMatches);
    const user = await users.findOne({email})
    res.send(user.matches)
  } catch(err) {
    console.log(err)
  }
})

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

app.get("/messages", async (req: Request, res: Response) => {
  try {
    const receiverEmail = req.query.email;
    console.log(receiverEmail)
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
    res.status(201).json(messages);
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
      message,
    };
    const updatedMessage = await messagesCollection.insertOne(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/createchat", async (req: Request, res: Response) => {
  const receiverEmail = req.body.email;
  try {
    const { authToken } = req.cookies;
    const { email } = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const chatsCollection = database.collection("chats");
    const chat = await chatsCollection.findOne({
      members: { $all: [email, receiverEmail] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = {
      members: [email, receiverEmail],
      createdAt: Date.now(),
      messages: []
    };
    const response = await chatsCollection.insertOne(newChat);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

app.get("/isadmin", async (req: Request, res: Response) => {
  try {
    const { authToken } = req.cookies;
    const { email } = await jwt.verify(authToken, secretOrPublicKey);
    const database = client.db("app-data");
    const users = database.collection("users");
    const { is_admin } = await users.findOne({ email });
    res.send(is_admin)
  } catch(err) {
    console.log(err)
  }
});

server.listen(port, () => console.log("Server running on port " + port));
