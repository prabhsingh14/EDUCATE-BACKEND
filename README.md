# 🎓 Educate Backend

A production-ready backend system powering a modern EdTech platform. Built with Node.js and MongoDB, this project enables secure authentication, instructor dashboards, course progress tracking, and integrated Razorpay payments.

---

## Tech Stack

- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Authentication**: JWT + Cookie-based auth  
- **Payments**: Razorpay  
- **Email**: Nodemailer  
- **Cloud Storage**: Cloudinary  

---

## Core Features

### Auth
- Sign up & login with JWT authentication
- Password reset with secure OTP generation via email
- Token-based session management

### Course Management
- CRUD operations on courses (Create, Read, Update, Delete)
- Course progress tracking for enrolled users
- Section & subsection management (Create, Update, Delete)
- Instructor-specific course listing

### User & Profile Management
- Update profile information
- Upload/update display picture
- Delete user account
- Get all user details
- View enrolled courses

### Razorpay Payment Integration
- Secure checkout with Razorpay gateway
- Course purchase and enrollment tied to successful payment

### Ratings & Reviews
- Users can submit course reviews
- Reviews linked to user and course

### Contact Us
- "Contact Us" form sends message to admin email via Nodemailer

### 📊 Instructor Dashboard
- Retrieve key metrics for courses and user engagement
- Monthly Analytics

---

## Current Status
1. Fully functional backend with complete feature set
2. Secure, scalable, and production-ready architecture
3. Ready to integrate with any frontend (React, Next.js, etc.)

---

## Contribute
PRs are welcome to expand features or migrate to microservices/GraphQL versions. Fork and open a pull request.
