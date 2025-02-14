const userModel = require("../models/auth");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");



const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
                error
            })
        }

        const user = await userModel.findOne({ email })


        if (!user) {
            return res.status(401).json({
                error,
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }
        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_SECRET,
            );

            // Save token to user document in database
            user.token = token;
            user.password = undefined;
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }
}

const registerCtrl = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ name, email, password: hashedPassword });
        res.status(201).send({
            message: "admin crated successfully!",
            user
        })
    } catch (error) {
        res.status(500).send({
            message: "error while creading admin ",
            user
        })
    }
}



  
  

module.exports = { loginCtrl, registerCtrl,}