import express from "express";
const router = express.Router();

import { capturePayment, verifyPayment, sendPaymentSuccessEmail, enrollStudents } from "../controllers/Payment";
import { auth, isStudent } from "../middleware/auth";

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
router.post("/enrollStudents", auth, isStudent, enrollStudents);

export default router;