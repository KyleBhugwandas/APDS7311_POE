import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";

const router = express.Router();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

router.post("/signup", async (req, res) => {
  try {
    // Properly await the hash result
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the new document with the hashed password
    let newDocument = {
      name: req.body.name,
      password: hashedPassword
    };

    // Insert the new user into the database
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    
    // Log the hashed password for debugging purposes
    console.log(hashedPassword);

    // Send a response
    res.status(201).json(result);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/login", bruteforce.prevent, async (req, res) => {
  const { name, password } = req.body;
  console.log(name + " " + password);

  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    } else {
      // Authentication successful
      const token = jwt.sign({ username: req.body.username, password: req.body.password }, 
        "this_secret_should_be_longer_than_it_is", { expiresIn: "1h" });
      res.status(200).json({ message: "Authentication successful", token: token, name: req.body.name });
      console.log("Your new token is: ", token);
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
