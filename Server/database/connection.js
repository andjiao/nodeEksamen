import "dotenv/config";

import { MongoClient } from "mongodb"

async function main(){  
    const uri = `mongodb+srv://andjiao:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.rujjilh.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);
    
    try {
        await client.connect();

    } catch (e) {
        console.error(e)
    } 
     //want to make sure my cluter is closed
    finally{
        await client.close();
    }
}

main().catch(console.error)