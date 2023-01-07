import { Router } from "express";
import { validation } from "../../middleware/validationMiddleware.js";
import {signUpValidation } from "./authvalidation.js";
import * as controller from "./controller/user.controller.js"

export const userRouter = Router();


userRouter.post("/signup" ,validation(signUpValidation),  controller.signUp);
userRouter.get("/confirmEmail/:token" , controller.confirmEmail);
userRouter.post("/signIn" , controller.signIn); 