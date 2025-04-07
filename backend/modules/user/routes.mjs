import { Router } from 'express';
import { createUser, getAllUsers, login, deleteUser,updateUser,} from "./controller/index.mjs";
import tokenVerification from "../../Middleware/tokenVerification.mjs";

const router = Router();

router.post("/", createUser);
router.get("/", tokenVerification,getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", login);
// router.get("/", tokenVerification, getLoggedInUser); // Fetch logged-in user's details
// router.get('/isAdmin', tokenVerification, isAdmin);

export default router;