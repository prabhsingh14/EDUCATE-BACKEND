import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
dotenv.config();

// middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET);

			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			return res.status(401).json({ 
				success: false, 
				message: "token is invalid" 
			});
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};

exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}

		next();
	} catch (error) {
		return res.status(500).json({ 
			success: false, 
			message: `User Role Can't be Verified` 
		});
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}

		next();
	} catch (error) {
		return res.status(500).json({ 
			success: false, 
			message: `User Role Can't be Verified` 
		});
	}
};

exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}

		next();
	} catch (error) {
		return res.status(500).json({ 
			success: false, 
			message: `User Role Can't be Verified` 
		});
	}
};
