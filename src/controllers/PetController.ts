import { Request, Response, NextFunction } from "express";
import {
  petGetService,
  petUploadService,
  petDeleteService,
  petUpdateService,
  petDetailUserService,
} from "../services/PetService.js";

//get
export const petGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petGetService(req, res, next);
};

//post
export const petUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petUploadService(req, res, next);
};

//update
export const petUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petUpdateService(req, res, next);
};

//delete
export const petDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petDeleteService(req, res, next);
};

//get pet detail
export const petDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petDetailUserService(req, res, next);
};
