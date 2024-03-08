import express from "express";
import User from "../controller/index.js"
const router = express.Router();

router.post("/signup", User.createUser);
router.post("/login", User.loginUser);
router.get("/allemp", User.getallemp);
router.post("/delete",User.deleteemp)
router.post("/update/emp",User.updateemp)
router.get("/get/user",User.getoneuser) 

export default router;