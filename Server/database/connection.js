import { mongoose } from 'mongoose';

export function connect(){

    const url = `mongodb+srv://andjiao:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.rujjilh.mongodb.net/GoodAndEvil`;
 
mongoose.set('strictQuery', true);
mongoose.connect(url)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))


const db = mongoose.connect(url)

const collection = db.collection("GoodAndEvil")

//larb@kea.dk
}