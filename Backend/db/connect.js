import mongoose from"mongoose";

const  connectDB = async ()=>{
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connected.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed" , error.message);
        process.exit(1);
    }
}


export default connectDB;