import { Router } from 'express';
import { createUser, getAllUsers, login, } from "./controller/index.mjs";
// import tokenVerification from "../../Middleware/tokenVerification.mjs";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
// router.put("/user/:id", updateUser);
// router.delete("/user/:id", deleteUser);
router.post("/login", login);
// router.get("/user", tokenVerification, getLoggedInUser); // Fetch logged-in user's details
// router.get('/isAdmin', tokenVerification, isAdmin);

export default router;