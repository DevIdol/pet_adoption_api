import express, { Router } from "express";
import { isAdmin } from "../middlewares/isAuth";
import {
  approvedAdmin,
  approvedUser,
  deleteUserFromAdmin,
  getAllUser,
} from "../controllers/UserController";
import {
  adoptionAdminDelete,
  availableAdoption,
  getAllAdoption,
} from "../controllers/AdoptionController";

const adminRoute: Router = express.Router();

//get all users
adminRoute.get("/users", isAdmin, getAllUser);

//approved user from admin
adminRoute.put("/approved-user/:userId", isAdmin, approvedUser);

//approved to be admin
adminRoute.put("/approved-admin/:userId", isAdmin, approvedAdmin);

//delete user from admin
adminRoute.delete("/users/:userId", isAdmin, deleteUserFromAdmin);

//get all adoption from admin
adminRoute.get("/adoptions", isAdmin, getAllAdoption);

//delete adoption from admin
adminRoute.delete("/adoptions/:userId/:adoId", isAdmin, adoptionAdminDelete);

//available adoption
adminRoute.put("/adoable-pets/:petId", isAdmin, availableAdoption);

export default adminRoute;
