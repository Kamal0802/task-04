import Router from "express";

import userContoller from "../controllers/user.controller.mjs"

import authMiddleWare from "../utils/authorization.mjs";

const {RegisterUser,Login,getProfile,userForSideBar,getUserById}=userContoller

const UserRouter=Router();

UserRouter.post("/register",RegisterUser)

UserRouter.post("/login",Login)

UserRouter.get("/me",authMiddleWare,getProfile);

UserRouter.get("/",authMiddleWare,userForSideBar)

UserRouter.get("/:id",authMiddleWare,getUserById)


export default UserRouter;