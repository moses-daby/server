import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passWord:{
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps:true
    }
)

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;