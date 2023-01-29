import express, { Router } from "express";
import { isUser } from "../middlewares/isAuth";
import {
  adoptionDelete,
  adoptionForm,
  getAdoption,
  getAllAdoptionList,
} from "../controllers/AdoptionController";

const adoptionRoute: Router = express.Router();

//create adoption
adoptionRoute.post("/:userId/:petId", isUser, adoptionForm);

//get adoption
adoptionRoute.get("/:userId", isUser, getAdoption);

//delete adoption
adoptionRoute.delete("/:userId/:adoId", isUser, adoptionDelete);

//get all adoption list
adoptionRoute.get("/", getAllAdoptionList);

export default adoptionRoute;
