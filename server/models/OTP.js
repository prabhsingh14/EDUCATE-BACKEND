import mongoose from "mongoose";
import mailSender from "../utils/mailSender";
import emailTemplate from "../mail/templates/emailVerificationTemplate";

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},

	otp: {
		type: String,
		required: true,
	},
	
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

OTPSchema.pre("save", async function (next) {
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;