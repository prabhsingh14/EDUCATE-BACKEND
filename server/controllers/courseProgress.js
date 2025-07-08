import mongoose from "mongoose";
import Section from "../models/Section.js";
import SubSection from "../models/Subsection.js";
import CourseProgress from "../models/CourseProgress.js";
import Course from "../models/Course.js";

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId)
    }

    // Save the updated course progress
    await courseProgress.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

exports.getProgressPercentage = async (req, res) => {
  const { courseId } = req.body
  const userId = req.user.id

  if (!courseId) {
    return res.status(400).json({ error: "Course ID not provided." })
  }

  try {
    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })
      .populate({
        path: "courseID",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection" // This was missing in your original code
          }
        },
      })
      .exec()

    if (!courseProgress) {
      return res
        .status(404)
        .json({ error: "Course progress not found for this user and course." })
    }

    // Calculate total lectures across all sections
    let totalLectures = 0
    courseProgress.courseID.courseContent?.forEach((section) => {
      totalLectures += section.subSection?.length || 0
    })

    // Handle edge case where course has no lectures
    if (totalLectures === 0) {
      return res.status(200).json({
        data: 0,
        message: "Course has no lectures",
      })
    }

    // Calculate progress percentage
    let progressPercentage = (courseProgress.completedVideos.length / totalLectures) * 100

    // Round to 2 decimal places
    progressPercentage = Math.round(progressPercentage * 100) / 100

    // Ensure percentage doesn't exceed 100%
    progressPercentage = Math.min(progressPercentage, 100)

    return res.status(200).json({
      data: progressPercentage,
      totalLectures,
      completedLectures: courseProgress.completedVideos.length,
      message: "Successfully fetched course progress",
    })
  } catch (error) {
    console.error('Error calculating course progress:', error)
    return res.status(500).json({ error: "Internal server error" })
  }
}