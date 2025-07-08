import express from "express";
import userRoutes from "./routes/User";
import profileRoutes from "./routes/Profile";
import courseRoutes from "./routes/Course";
import paymentRoutes from "./routes/Payments";
import contactUsRoute from "./routes/Contact";
import database from "./config/database";
import cookieParser from "cookie-parser";
import cors from "cors";
import { cloudinaryConnect } from "./config/cloudinary";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

const PORT = process.env.PORT || 4000;
dotenv.config();
database.connect();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});