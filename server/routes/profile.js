import express from "express";
import { auth, isInstructor } from "../middleware/auth";
import { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard } from "../controllers/profile";

const router = express.Router();

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Instructor-specific routes
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

export default router;