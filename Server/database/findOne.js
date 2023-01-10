import "dotenv/config";
import { MongoClient } from "mongodb"

async function main(){
    
    const uri = `mongodb+srv://andjiao:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.rujjilh.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);
    try {
        await client.connect();
        await findOneListingByName(client, "Ribeira Charming Duplex");
        /*await findListingsWithMinimumBedroomsAndMostRecentReviews(client,{
            minimumNumberOfBedrooms:4,
            minimumNumberOfBathrooms: 2,
            maximumNumberOfResult:5
        })*/

    } catch (e) {
        console.error(e)
    } 
    finally{
        await client.close();
    }
}

main().catch(console.error)
//SEARCH ONE

/* findeOne will return the first document that matches the given query
even if more than one document matches the query, only one document will be returned
findOne has only 1 param, and that's a query of type object
the query object can contain zero or more properties that mongodb will use to 
 find a document in the collection
 if you want to query all documents in a collection without narrowing your results
 in any way, you can send an empty object.

 In this example we want to search for an airbnb listing with a particular name

 depending on the name we pass, we may/may not get a result
*/
async function findOneListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .findOne({name: nameOfListing});

    if (result){
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    }else{
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

//SEARCH MULTIPLE
/*
$gte is a comparison query operators that mongodb offers
a cursor allows traversal over the result set of a query 

you can choose to use cursor's functions to modify what documents are included
in the results
fx. lets say we want to sort our results so that with the most recent reviews are returned first

limits tells how many reesults i want in return

*/
async function findListingsWithMinimumBedroomsAndMostRecentReviews(client, {
minimumNumberOfBedrooms =0,
minimumNumberOfBathrooms =0,
maximumNumberOfResult = Number.MAX_SAFE_INTEGER
} = {}){
    const cursor = await client.db("sample_airbnb").collection("listingsAndReviews")
    .find({
        bedrooms: {$gte: minimumNumberOfBedrooms},
        bathrooms: {$gte: minimumNumberOfBathrooms},

    }).sort({last_review:-1})
    .limit(maximumNumberOfResult);

    const results = await cursor.toArray();

    // Print the results
    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            const date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${date}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}


