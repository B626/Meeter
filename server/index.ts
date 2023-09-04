import {NextFunction, Request, Response} from "express";

const {MongoClient} = require("mongodb");
const {v4: uuidv4} = require("uuid");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

const uri = process.env.URI;
const port = process.env.PORT || 8000;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());
app.use(async (req: Request, res: Response, next: NextFunction) => {
    await client.connect();
    next();
});

app.get("/", (req: any, res: any) => {
    res.json("Hello world", req, res);
});

app.post("/signup", async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const database = client.db("app-data");
        const users = database.collection("users");
        const existingUser = await users.findOne({email});
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
        res
            .status(201)
            .json({userId: generatedUserId, email: sanitiziedEmail});
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const database = client.db("app-data");
        const users = database.collection("users");
        const user = await users.findOne({email});
        const correctPassword = await bcrypt.compare(
            password,
            user.hashed_password
        );
        if (user && correctPassword) {
            // todo change user to user_id
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24,
            });
            res.status(201).json({token, userId: user.user_id, email});
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

    } catch (err) {

    }
});

app.listen(port, () => console.log("Server running on port " + port));
