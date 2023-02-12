import { Router } from "express";
import * as UserController from "../controllers/Usercontroller";

const router = Router();

router.get("/:id", UserController.getUser);
router.get("/", UserController.getUsers);
router.post("/", UserController.addUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;