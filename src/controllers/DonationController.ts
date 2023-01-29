import { Request, Response, NextFunction } from "express";
import {
  donateRequestService,
  donateRequestCreateService,
  donationUpdateService,
  donationDeleteService
} from "../services/DonationService";
export const donateRequest = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donateRequestService(req, res, next);
}


export const donateRequestCreate = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donateRequestCreateService(req, res, next);
}

export const donationUpdate = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donationUpdateService(req, res, next);
}

export const donationDelete = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donationDeleteService(req, res, next);
}


