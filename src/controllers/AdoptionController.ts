import { Request, Response, NextFunction } from "express";
import {
    adoptionFormService,
    adoptionDeleteService,
    adoptionAdminDeleteService,
    availableAdoptionService,
    getAdoptionService,
    getAllAdoptionService,
    getAllAdoptionListService,
} from "../services/AdoptionService";

//create adoption
export const adoptionForm = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    adoptionFormService(req, res, next);
};

//get adoption
export const getAdoption = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    getAdoptionService(req, res, next);
};

//delete adoption
export const adoptionDelete = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    adoptionDeleteService(req, res, next);
};

//get all adoption from admin
export const getAllAdoption = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    getAllAdoptionService(req, res, next);
};

//delete adoption from admin
export const adoptionAdminDelete = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    adoptionAdminDeleteService(req, res, next);
};

//available adoption
export const availableAdoption = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    availableAdoptionService(req, res, next);
};

//get all adoption list
export const getAllAdoptionList = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    getAllAdoptionListService(req, res, next);
};
