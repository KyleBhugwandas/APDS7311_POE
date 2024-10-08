import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import checkauth from "../check-auth.mjs";

const router = express.Router();

// Get all the records
router.get("/post", async (req, res) => {
    try {
        let collection = await db.collection("posts");
        let results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts", error });
    }
});

// Create a new record
router.post("/upload", checkauth, async (req, res) => {
    try {
        // Ensure the collection exists and is accessible
        const collection = await db.collection("posts");
        console.log("Accessing 'posts' collection");

        // Extract user data from the authenticated JWT
        const user = req.user;  // Assuming checkauth attaches the user object to the request

        // Create a new post with the user's full name and account number
        let newDocument = {
            user: user.fullName,  // The user's full name from the token
            accountNumber: user.accountNumber,  // The user's account number from the token
            content: req.body.content,
            createdAt: new Date()
        };

        // Insert the new post into the collection
        let result = await collection.insertOne(newDocument);
        console.log("Post created, result:", result);

        res.status(201).json({ message: "Post created", postId: result.insertedId });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post", error });
    }
});

// Update a record by id
router.patch("/:id", checkauth, async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        // Update only the content of the post
        const updates = {
            $set: {
                content: req.body.content,
                updatedAt: new Date()
            }
        };

        let collection = await db.collection("posts");
        let result = await collection.updateOne(query, updates);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Post not found or no changes made" });
        }

        res.status(200).json({ message: "Post updated", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to update post", error });
    }
});

export default router;
