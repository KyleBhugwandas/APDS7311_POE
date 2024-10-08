

import ExpressBrute from "express-brute";

const router = express.Router();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { fullName, idNumber, accountNumber, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user document
    const newUser = {
      fullName: fullName,
      idNumber: idNumber,
      accountNumber: accountNumber,
      password: hashedPassword
    };

    // Insert the user into the database
    const collection = await db.collection("users");
    const result = await collection.insertOne(newUser);

    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error });
  }
});


// Login route
router.post("/login", bruteforce.prevent, async (req, res) => {
  const { fullName, accountNumber, password } = req.body;
  console.log(fullName + " " + accountNumber + " " + password);

  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ fullName, accountNumber });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    } else {
      // Authentication successful
      const token = jwt.sign(
        { fullName: req.body.fullName, accountNumber: req.body.accountNumber },
        "this_secret_should_be_longer_than_it_is",
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Authentication successful", token: token, fullName: req.body.fullName });
      console.log("Your new token is: ", token);
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
