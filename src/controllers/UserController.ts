import { NextFunction, Request, Response } from "express";
import {
    approvedAdminService,
    approvedUserService,
    deleteUserAdminService,
    deleteUserService,
    getAllUserService,
    getUserService,
    updateUserService,
    verifyEmailService,
} from "../services/UserService";

//verify email
export const verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    verifyEmailService(req, res, next);
};

//get all users
export const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    getAllUserService(req, res, next);
};

//get user
export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    getUserService(req, res, next);
};

//update user
export const udpateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    updateUserService(req, res, next);
};

//delete user
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    deleteUserService(req, res, next);
};

//delete user from admin
export const deleteUserFromAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    deleteUserAdminService(req, res, next);
};

//approved user from admin
export const approvedUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    approvedUserService(req, res, next);
};

//approved to be admin
export const approvedAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    approvedAdminService(req, res, next);
};
