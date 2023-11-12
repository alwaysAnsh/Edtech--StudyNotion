const express = require("express");
const app = express();


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

//db connect 
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin : "*",
        credentials : true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir: "/tmp",
    })
)

//cloudinary coonect
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

app.listen(PORT, () => {
    console.log(`app is Running at port ${PORT}`);
})


