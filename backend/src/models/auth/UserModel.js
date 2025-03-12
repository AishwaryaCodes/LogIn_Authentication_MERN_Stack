import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name."],
    },

    email: {
        type: String,
        required: [true, "Please Enter Email address."],
        unique: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please add valid Email address."],
    },

    password: {
        type: String,
        required: [true, "Enter Password"],
    },

    photo: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/84147216?v=4",
    },

    bio: {
        type: String,
        default: "I am a new user."
    },

    role: {
        type: String,
        enum: ["user", "admin", "creator"],
        default: "user",
    },

    isVerified: {
        type: Boolean,
        default: false,
    }, 
},
    {timestamps: true, minimize: true}
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
    //Hash the pw 
    const salt = await bcrypt.genSalt(10);

    //hash pw with salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    //set pw to hashed pw
    this.password = hashedPassword;

    //call next middleware
    next();
});

const User = mongoose.model("user", userSchema);

export default User;