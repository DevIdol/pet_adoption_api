import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import PetModel from "../models/PetModel";
import FavoriteModel from "../models/FavoriteModel";
import { createError } from "../utils/CreateError";

export const createFavoriteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        let user: any = await User.findById(userId);
        const fav: any = await FavoriteModel.find({ userId });
        const pet: any = await PetModel.findById(req.params.petId);
        let arr: any = [];
        let favId: any;
        fav.find((f: any) => {
            const isFav = String(f.pets) === String(pet._id);
            arr.push(isFav);
        });
        fav
            .filter((f: any) => String(f.pets) == req.params.petId)
            .map((p: any) => {
                favId = p._id;
            });
        if (!arr.includes(true)) {
            const favorite = new FavoriteModel({
                userId: userId,
                pets: pet,
            });
            let saveFav = await favorite.save();
            user.favorites.push(saveFav);
            user.save();
            res.status(200).json({
                success: true,
                data: saveFav,
            });
        } else {
            const isFav: any = await FavoriteModel.findOne({
                _id: favId,
            });
            await FavoriteModel.deleteOne({ _id: isFav.id });
            user.favorites = user.favorites.filter(
                (f: any) => String(f) !== isFav.id
            );
            user.save();
            res.status(200).json({
                success: true,
                message: "Removed from favorite",
            });
        }
    } catch (err: any) {
        console.log(err);
        next(createError(500, "Internal Server Error"));
    }
};

//delete favorite
export const deleteFavoriteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const favId = req.params.favId;
        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        let user: any = await User.findById(userId);
        const fav: any = await FavoriteModel.find({ userId });
        let isFavArr: any = [];
        fav.find((f: any) => {
            const isFav = String(f.userId) === userId;
            isFavArr.push(isFav);
        });
        if (isFavArr.includes(true)) {
            user.favorites = user.favorites.filter((f: any) => String(f) !== favId);
            user.save();
            let favorite = await FavoriteModel.findByIdAndDelete(favId);
            if (!favorite) {
                return next(createError(404, "Favorite Not Found"));
            }
            res.status(200).json({
                success: true,
                message: "Deleted Favorite Successfully",
            });
        } else {
            return next(createError(404, "Favorite Not Found"));
        }
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

//get favorite
export const getFavoriteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId: any = req.params.userId;
    try {
        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        const fav: any = await FavoriteModel.find({ userId }).populate("pets");
        await User.findById(userId).populate("favorites");
        res.status(200).json({
            success: true,
            data: fav,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};
