import { Router } from 'express';
import tokenVerification from "../../Middleware/tokenVerification.mjs";
import { createUser, getAllUsers, updateUser, deleteUser, login, } from "./controller/index.mjs";

const router = Router();

router.get("/user",tokenVerification, getAllUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/user/login", login);
// router.get("/user/me", tokenVerification, getLoggedInUser); // Fetch logged-in user's details
// router.get('/isAdmin', tokenVerification, isAdmin);

export default router;