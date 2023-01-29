import express, { Router } from "express";
import { isUser } from "../middlewares/isAuth";
import {
  createFavorite,
  deleteFavorite,
  getFavorite,
} from "../controllers/FavoriteController";

const favoriteRoute: Router = express.Router();

//create favorite
favoriteRoute.post("/:userId/:petId", isUser, createFavorite);

//delte favorite
favoriteRoute.delete("/:userId/:favId", isUser, deleteFavorite);

//get favorite
favoriteRoute.get("/:userId", isUser, getFavorite);
export default favoriteRoute;
