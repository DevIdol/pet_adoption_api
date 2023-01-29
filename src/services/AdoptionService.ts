import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import AdoptionModel from "../models/AdoptionModel";
import PetModel from "../models/PetModel";
import { createError } from "../utils/CreateError";

//create adoption
export const adoptionFormService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: any = req.params.userId;
        let petId = req.params.petId;

        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        if (!req.body.desc) {
            return next(createError(400, "Description can't be empty"));
        }
        let user: any = await User.findOne({ _id: userId });
        let adoPet: any[] = [];
        let adoption: any = await AdoptionModel.find({ userId });
        let pet: any = await PetModel.findById(petId);
        if (!pet) {
            return next(createError(404, "Pet Not Found"));
        }
        if (!pet.isAvailable) {
            return next(createError(410, "This pet is out"));
        }
        adoption.filter((ado: any) => {
            let isPet = String(ado.petId) === petId;
            adoPet.push(isPet);
        });

        let adoptionInfo = { userId, petId, ...req.body };
        if (!adoPet.includes(true)) {
            const newAdoption = new AdoptionModel(adoptionInfo);
            const savedAdoption = await newAdoption.save();
            user.adoptions.push(savedAdoption);
            user.save();
            res.status(200).json({
                success: true,
                data: savedAdoption,
            });
        } else {
            return next(createError(409, "This pet is already registered"));
        }
    } catch (error) {
        next(createError(500, "Internal Server Error!!"));
    }
};

//get adoption
export const getAdoptionService = async (
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
        const adoptions = await AdoptionModel.find({ userId }).populate("petId");
        res.status(200).json({
            success: true,
            data: adoptions,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error!!"));
    }
};

//delete adoption
export const adoptionDeleteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: any = req.params.userId;
        const adoId: any = req.params.adoId;
        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        let user: any = await User.findById(userId);
        const ado: any = await AdoptionModel.find({ userId });
        let arr: any = [];
        ado.find((a: any) => {
            const isAdo = String(a.userId) === userId;
            arr.push(isAdo);
        });
        if (arr.includes(true)) {
            user.adoptions = user.adoptions.filter((a: any) => String(a) !== adoId);
            user.save();
            await AdoptionModel.findByIdAndDelete(adoId);
            res.status(200).json({
                success: true,
                message: "Removed Success",
            });
        }
    } catch (error) {
        next(createError(500, "Internal Server Error!!"));
    }
};

//Get all adoptions from admin
export const getAllAdoptionService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const adoptions = await AdoptionModel.find()
            .populate("userId")
            .populate("petId");

        if (!adoptions) {
            return next(createError(404, "No Adoption Form"));
        }
        res.status(200).json({
            success: true,
            data: adoptions,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error!!"));
    }
};

//delete adoption from admin
export const adoptionAdminDeleteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let userId = req.params.userId;
        let adoId = req.params.adoId;
        let user: any = await User.findById(userId);
        const ado: any = await AdoptionModel.find({ userId });

        let arr: any = [];
        ado.find((a: any) => {
            const isAdo = String(a.userId) === userId;
            arr.push(isAdo);
        });
        if (arr.includes(true)) {
            user.adoptions = user.adoptions.filter((a: any) => String(a) !== adoId);
            user.save();
            await AdoptionModel.findByIdAndDelete(adoId);
            res.status(200).json({
                success: true,
                message: "Removed Success",
            });
        } else {
            return next(createError(404, "Adoption Not Found"));
        }
    } catch (error) {
        console.log(error);
        next(createError(500, "Internal Server Error!!"));
    }
};

//Pet Adoption Available from admin
export const availableAdoptionService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const petId = req.params.petId;
        const pet: any = await PetModel.findById(petId);
        if (!pet) {
            return next(createError(404, "Pet Not Found"));
        }
        if (!pet.isAvailable) {
            await PetModel.findByIdAndUpdate(petId, {
                $set: { isAvailable: true },
            });
            res.status(200).json({
                success: true,
                message: "This pet is available for adoption",
            });
        }
        if (pet.isAvailable) {
            await PetModel.findByIdAndUpdate(petId, {
                $set: { isAvailable: false },
            });
            res.status(200).json({
                success: true,
                message: "This pet is out",
            });
        }
    } catch (error) {
        next(createError(500, "Internal Server Error!!"));
    }
};

//get all adoption list
export const getAllAdoptionListService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const adoptions = await AdoptionModel.find().populate(["userId", "petId"]);
        res.status(200).json({
            success: true,
            data: adoptions,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error!!"));
    }
};
