import mongoose ,{Mongoose} from 'mongoose';

//get mongodb url from env file
const MONGODB_URl  = process.env.MONGODB_URL;

//make interface 
interface MongooseConnection{
    conn:Mongoose | null;
    promise: Promise<Mongoose> | null
}

//make a cache 
let cached : MongooseConnection = (global as any).mongoose

if(!cached){
    cached = (global as any).mongoose = {
        conn:null,promise:null
    }
}

//connection function writing
export const connectionTODb = async () => {
    if (cached.conn) return cached.conn
    if(!MONGODB_URl) throw new Error('missing mongodb url')

    cached.promise = cached.promise || mongoose.connect(MONGODB_URl,{
        dbName:'ImagiShift',bufferCommands:false
    })
    cached.conn = await cached.promise
    return cached.conn;
}
