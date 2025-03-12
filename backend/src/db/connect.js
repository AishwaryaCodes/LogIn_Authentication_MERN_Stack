import mongoose from "mongoose";

const connect = async () => {
    try{
        console.log(`Attempt to connect`);
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MONGO_URI:", process.env.MONGO_URI);
        console.log(`Connected`);
    }
    catch(error) {
        console.log(`failed to connect ${error.message}`);
        process.exit(1);
    }
}

export default connect;