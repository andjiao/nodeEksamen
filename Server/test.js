import { MongoClient } from "mongodb"
import { mongo } from "mongoose";

/* 
if user.isEvil =true {
    viderstil til createEvil
}els{
    viderstil til createGood
}
*/


async function main(){
    const url = `mongodb+srv://andjiao:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.rujjilh.mongodb.net/GoodAndEvil`;
    const client = new MongoClient(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    
    })

    
    
    try {
        await client.connect();
        mongo.start
        await findEvilMentor(client, false)
      
        
    } catch (e) {
        console.error(e)
    } 
    finally{
        client.close()
    }
    
}

main().catch(console.error)

async function findEvilUser(client, userIsEvil){
    const evilUser = client.db().collection('users').find({isEvil:userIsEvil})
    
   
    await evilUser.forEach((user) => {
        if(user.isEvil = userIsEvil){
            const evilStudents = client.db().collection('evilstudents').find()
            evilStudents.forEach((item) =>{
                return console.log(item.name)
            }
            )

               
        } else {
            const goodStudents = client.db().collection('goodstudents').find()
            goodStudents.forEach((item) =>{
                console.log(item.name)
            }
            )
        }

    })
}



/*async function findEvil(client){
    const evilMentors = client.db("GoodAndEvil").collection('mentors').find({isEvil:true})

    await evilMentors.forEach((mentor) => {
        if(mentor.isEvil=true){
            const evilStudents = client.db("GoodAndEvil").collection('evilstudents').find();
            await evilStudents.forEach((item) =>{
                console.log(item.name)
            })
        } else {
            const goodStudents = client.db("GoodAndEvil").collection('goodstudents').find();
            await goodStudents.forEach((item)=>{
                console.log(item.name)
            })
        }
    })
}*/

  