import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";
console.log("MongoDB connection string:", connectionString);

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,  // Optional, adds new URL parsing logic
    useUnifiedTopology: true // Optional, recommended to handle topology changes
});

let db;

const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB is CONNECTED!!! :)');
        db = client.db("APDS");
    } catch (e) {
        console.error('MongoDB connection error:', e);
        process.exit(1); // Exit the process if unable to connect
    }
};

// Call the connect function
connectDB();

// Close the MongoDB client when the Node.js process ends
process.on("SIGINT", async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
});

export default db;