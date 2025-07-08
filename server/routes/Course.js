import express from "express";
const router = express.Router();

import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} from "../controllers/Course";

import {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} from "../controllers/Category";

import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/Section";

import {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} from "../controllers/Subsection";

import {
  createRating,
  getAverageRating,
  getAllRatingReview,
} from "../controllers/RatingandReview";

import { updateCourseProgress, getProgressPercentage } from "../controllers/CourseProgress";

import { auth, isInstructor, isStudent, isAdmin } from "../middleware/auth";


// routes accessible to instructors only
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);


// routes requiring auth but not restricted to a role
router.post("/getFullCourseDetails", auth, getFullCourseDetails);


// routes accessible to students only
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
router.post("/getProgressPercentage", auth, isStudent, getProgressPercentage);
router.post("/createRating", auth, isStudent, createRating);


// routes accessible to admin only
router.post("/createCategory", auth, isAdmin, createCategory);


// routes accessible to all users
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingReview);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);

export default router;