import Profile from "../models/user.model.js";
import bcryptjs from "bcryptjs";
 

// register routes
export const registerUser = async (request, response) =>{
    const {email, passWord, fullName } = request.body;

    // check if all data is received

    try{
        if ( !fullName || !email || !passWord ){
            console.log("all field are required");
        }

        // check if user exist

        const userExist = await Profile.findOne({ email });
        console.log('userExist', userExist);

        if(userExist){
            return response.status(401).json({
                success: false,
                message: 'user Already Exist',
            });
        }

        // hash password
        const hashedPassWord = await bcryptjs.hash(passWord, 10);

        // create user
        const user = new Profile({
            fullName,
            email,
            passWord: hashedPassWord,
        });
            
        await user.save();

        response.status(201).json({
            success: true,
            message:'user created successfully',
            user:{
                ...user._doc,
                passWord: undefined,
            }
        });

        console.log(user);

    } catch(erorr) {
        console.log(erorr);

        response.status(400).json({
            success: false,
            message: erorr.message,
        })
    }
}


export const loginUser = async (request, response) => {
    const {email, passWord} = request.body;

    try {
        const user = await Profile.findOne({email});

        if (!user) {
            return response.status().json({
                success: false,
                message: 'invalid email'
            })
        };

        // check password

        const isPasswordValid = bcryptjs.compare(passWord, user.passWord);
        if (isPasswordValid) {
            return response.status(400).json({
               success: false,
               message: "invalid credentail" 
            })
        };

        await user.save();
        response.status(200).json({
            success: true,
            message: 'login successfully',
            user:{
                ...user._doc,
                passWord: undefined,
            }
        })
    } catch (error) {
        console.log('erorr in login');
        response.status(500).json({
            success: false, 
            message: error.message,
        })
    };
}