import { Request, Response, NextFunction } from "express";
import {
  petArticleGetService,
  petArticleService,
  petArticleUpdateService,
  petArticleDeleteService
} from "../services/ArticleService.js";

export const petArticleGet = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleGetService(req, res, next);
}
export const petArticle = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleService(req, res, next);
}

export const petArticleUpdate = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petArticleUpdateService(req, res, next);
}

export const petArticleDelete = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petArticleDeleteService(req, res, next);
}