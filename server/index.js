const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const bodyParser = require('body-parser');



dotenv.config();

const PORT = process.env.PORT || 8080
connectDB();





// middleware 
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

cloudinaryConnect();


// routes  
app.use("/api/v1/auth", require("./routes/authRoute"))
app.use("/api/v1/blog", require("./routes/blogRoute"))
app.use("/api/v1/image", require("./routes/imageRoute"))



// default route 
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ..."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`)
})
