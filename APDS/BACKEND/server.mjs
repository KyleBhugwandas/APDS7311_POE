import https from "https";
import fs from "fs";
import post from "./routes/post.mjs";
import users from "./routes/user.mjs";
import express from "express";
import cors from "cors";

const PORT = 3000;
const app = express();

// HTTPS options for secure connection
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Define your routes
app.use("/post", post);
app.use("/user", users);

// Create HTTPS server
let server = https.createServer(options, app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
