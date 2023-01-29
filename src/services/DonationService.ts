import { Request, Response, NextFunction } from "express";
import Donate from "../models/DonationModel";
import { validationResult } from "express-validator";
import { logger } from "../logger/Logger";
//get
export const donateRequestService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const donations = await Donate.find({});
        res.json({
            data: donations,
            status: 1,
        });
    } catch (err: any) {
        logger.error("GET Post API Error");
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ message: "GET Post API Error", status: 1 });
    }
};

//post
export const donateRequestCreateService = async (
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
        }
        const donationCreate = {
            itemName: req.body.itemName,
            quantity: req.body.quantity,
            description: req.body.description,
        };
        const newDonate = new Donate(donationCreate);
        const result = await newDonate.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    } catch (err: any) {
        logger.error("Create Post API Error");
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ message: "Create Post API Error", status: 1 });
    }
};

//update
export const donationUpdateService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const donation = await Donate.findById(req.params.id);
        if (!donation) {
            const error: any = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        donation.itemName = req.body.itemName;
        donation.quantity = req.body.quantity;
        donation.description = req.body.description;
        let newDonation = new Donate(donation);
        const result = await newDonation.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    } catch (err: any) {
        logger.error("Update Post API Error");
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ data: "Update Post API Error", status: 1 });
    }
};

//delete
export const donationDeleteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const requestedId = req.params.id;
        Donate.findById(requestedId, (err: any, item: any) => {
            if (err) console.log("error");
            Donate.deleteOne({ _id: requestedId }, (err) => {
                if (!err) {
                    res.json({
                        data: `${item.itemName} Deleted successfully`,
                        status: 1,
                    });
                }
            });
        });
    } catch (err: any) {
        logger.error("Delete Donation API Error");
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ data: "Delete Donation API Error", status: 1 });
    }
};
