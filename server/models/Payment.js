import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    // student who made the payment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    // instructor who received the payment
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // razorpay metadata
    razorpayPaymentId: {
        type: String,
        required: true
    },

    razorpayOrderId: {
        type: String,
        required: true
    },

    razorpaySignature: { type: String },

    // financial info
    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: "INR"
    },

    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },

    paymentDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

export default mongoose.model("Payment", PaymentSchema);