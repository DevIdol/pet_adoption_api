import { Request, Response, NextFunction } from "express";
import PetArticle from "../models/ArticleModel";
import { validationResult } from "express-validator";
import { logger } from "../logger/Logger.js";

//get
export const petArticleGetService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const article = await PetArticle.find({});
        res.json({
            data: article,
            status: 1
        });
    } catch (err: any) {
        logger.error('GET Article API Error');
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ message: 'GET Article API Error', status: 1 });
    }
};

//post
export const petArticleService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error: any = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        };
        if (req.body.category === "dog" || req.body.category === "cat") {
            const article = {
                category: req.body.category,
                title: req.body.title,
                description: req.body.description,
            };

            const newArticle = new PetArticle(article);
            const result = await newArticle.save();
            res
                .status(201)
                .json({ message: "Article Created Successfully!", data: result, status: 1 });
        } else {
            res.status(405).json({ data: "Input only dog/cat" });
        }
    } catch (err: any) {
        logger.error('Create Post API Error');
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ message: 'Create Post API Error', status: 1 });
    }
};

//update
export const petArticleUpdateService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const article = await PetArticle.findById(req.params.id);
        if (!article) {
            const error: any = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        if (req.body.category === "dog" || req.body.category === "cat") {
            article.category = req.body.category;
            article.title = req.body.title;
            article.description = req.body.description;
            let newArticle = new PetArticle(article);
            const result = await newArticle.save();
            res.json({ message: "Updated Successfully!", data: result, status: 1 });
        } else {
            res.status(405).json({ data: "Input only dog/cat" });
        }
    } catch (err: any) {
        logger.error('Update Article API Error');
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ data: 'Update Article API Error', status: 1 });
    }
};

//delete
export const petArticleDeleteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const requestedId = req.params.id;
        PetArticle.findById(requestedId, (err: any, item: any) => {
            if (err) console.log("error");
            PetArticle.deleteOne({ _id: requestedId }, (err) => {
                if (!err) {
                    res.json({ data: `${item.title} Deleted successfully`, status: 1 })
                }
            });
        })

    } catch (err: any) {
        logger.error('Delete Post API Error');
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ data: 'Delete Post API Error', status: 1 });
    }
};