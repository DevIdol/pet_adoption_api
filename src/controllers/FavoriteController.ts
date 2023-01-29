import { NextFunction, Request, Response } from "express";
import {
    createFavoriteService,
    deleteFavoriteService,
    getFavoriteService,
} from "../services/FavoriteService";

//create favorite
export const createFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    createFavoriteService(req, res, next);
};

//delete favorite
export const deleteFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    deleteFavoriteService(req, res, next);
};

//get favorite
export const getFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    getFavoriteService(req, res, next);
};
