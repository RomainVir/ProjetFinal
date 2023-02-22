import express from "express";
import userController from "../controllers/user_controller.js";
import validateLoginDto from "../utils/validate_login_dto.js";

const userRouter = express.Router();

//registro de nuevo usuario
userRouter.post("/register", userController.addUser);

// Login de un usuario
userRouter.post("/login", validateLoginDto, userController.loginUser);

//delete an user con el id
userRouter.delete("/:id", userController.deleteUser);

//modificar un usuario con el id
userRouter.patch("/:id", userController.updateUser);

//obtener usuarios
userRouter.get("/users/:id", userController.getUser);

export default userRouter;
