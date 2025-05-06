import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL!;
const client = new MongoClient(uri);

// Ensure connection is established
await client.connect();

export { client };
