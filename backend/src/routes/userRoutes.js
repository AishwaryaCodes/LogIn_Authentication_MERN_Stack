import express from "express";
import {registerUser, loginUser, logoutUser, getUser, updateUser, userLoginStatus, 
    verifyEmail, forgotPassword, resetPassword, changePassword} from "../controllers/auth/userController.js";
import {protect, adminMiddleware, creatorMiddleware } from "../middleware/authMiddleware.js";
import {deleteUser, getAllUsers } from "../controllers/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/update", protect, updateUser);

//Admin Routes
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

//Get all users
router.get("/users/getall", protect, creatorMiddleware ,getAllUsers);

//Login status
router.get("/loginStatus", userLoginStatus);


//verify user and email verification
router.get("/sendEmail", protect, verifyEmail);


// forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password/:resetPasswordToken", resetPassword);

// change password ---> user must be logged in
router.patch("/change-password", protect, changePassword);

export default router;