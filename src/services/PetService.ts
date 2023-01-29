import { NextFunction, Request, Response } from "express";
import Pet from "../models/PetModel";
import { validationResult } from "express-validator";
import fs from "fs";
import User from "../models/UserModel";
import jwtDecode from "jwt-decode";
import { logger } from "../logger/Logger";
import FavoriteModel from "../models/FavoriteModel";
import PetModel from "../models/PetModel";
import { createError } from "../utils/CreateError";

//get
export const petGetService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let pet = await Pet.find({});
        res.json({
            data: pet,
            status: 1,
        });
    } catch (err: any) {
        logger.error("GET Pet API Error");
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ message: "GET Pet API Error", status: 1 });
    }
};

//post
export const petUploadService = async (
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
        const files = req.files;
        if (files) {
            let imgArray;
            if (Array.isArray(files)) {
                imgArray = files.map((file: any) => {
                    let img = fs.readFileSync(file.path);
                    return img.toString("base64");
                });
            } else {
                imgArray = Array.prototype.map.call(files, (file: any) => {
                    let img = fs.readFileSync(file.path);
                    return img.toString("base64");
                });
            }
            let result = imgArray.map((src, index) => {
                let pet;
                if (Array.isArray(files) && files[index]) {
                    pet = {
                        filename: files[index].originalname,
                        contentType: files[index].mimetype,
                        imageBase64: src,
                        name: req.body.name,
                        breed: req.body.breed,
                        age: req.body.age,
                        size: req.body.size,
                        sex: req.body.sex,
                        kind: req.body.kind,
                        description: req.body.description,
                        isAvailable: req.body.isAvailable,
                    };
                    let newPet: any = new Pet(pet);
                    return newPet.save();
                } else {
                    res.send("not right");
                }
            });
            Promise.all(result)
                .then((msg) => {
                    res.json({ data: msg });
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    } catch (err: any) {
        res.json(err);
    }
};

//update
export const petUpdateService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const pet: any = await Pet.findById(req.params.id);
        if (!pet) {
            const error: any = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }

        const files: any = req.files;
        if (!files || files.length === 0) {
            if (!req.body.name) {
                req.body.name = pet.name;
                console.log(req.body.name);
            }
            if (!req.body.breed) {
                req.body.breed = pet.breed;
            }
            if (!req.body.age) {
                req.body.age = pet.age;
            }
            if (!req.body.size) {
                req.body.size = pet.size;
            }
            if (!req.body.sex) {
                req.body.sex = pet.sex;
            }
            if (!req.body.kind) {
                req.body.kind = pet.kind;
            }
            if (!req.body.description) {
                req.body.description = pet.description;
            }
            if (!req.body.isAvailable) {
                req.body.isAvailable = pet.isAvailable;
            }
            console.log(req.body.name);
            pet.name = req.body.name;
            pet.breed = req.body.breed;
            pet.age = req.body.age;
            pet.size = req.body.size;
            pet.sex = req.body.sex;
            pet.kind = req.body.kind;
            pet.description = req.body.description;
            pet.isAvailable = req.body.isAvailable;
            let newPet: any = new Pet(pet);
            const newP = await newPet.save();
            res.json({ data: newP });
        } else {
            let imgArray;
            if (Array.isArray(files)) {
                imgArray = files.map((file: any) => {
                    let img = fs.readFileSync(file.path);
                    return img.toString("base64");
                });
            } else {
                imgArray = Array.prototype.map.call(files, (file: any) => {
                    let img = fs.readFileSync(file.path);
                    return img.toString("base64");
                });
            }
            let result = imgArray.map((src, index) => {
                if (Array.isArray(files) && files[index]) {
                    if (!req.body.name) {
                        req.body.name = pet.name;
                    }
                    if (!req.body.breed) {
                        req.body.breed = pet.breed;
                    }
                    if (!req.body.age) {
                        req.body.age = pet.age;
                    }
                    if (!req.body.size) {
                        req.body.size = pet.size;
                    }
                    if (!req.body.sex) {
                        req.body.sex = pet.sex;
                    }
                    if (!req.body.kind) {
                        req.body.kind = pet.kind;
                    }
                    if (!req.body.description) {
                        req.body.description = pet.description;
                    }
                    if (!req.body.isAvailable) {
                        req.body.isAvailable = pet.isAvailable;
                    }
                    pet.filename = files[index].originalname;
                    pet.contentType = files[index].mimetype;
                    pet.imageBase64 = src;
                    pet.name = req.body.name;
                    pet.breed = req.body.breed;
                    pet.age = req.body.age;
                    pet.size = req.body.size;
                    pet.sex = req.body.sex;
                    pet.kind = req.body.kind;
                    pet.description = req.body.description;
                    pet.isAvailable = req.body.isAvailable;
                    let newPet: any = new Pet(pet);
                    return newPet.save();
                } else {
                    res.send("not right");
                }
            });
            Promise.all(result)
                .then((msg) => {
                    res.json({ data: msg });
                })
                .catch((err) => {
                    res.json(err);
                });
        }
    } catch (err: any) {
        res.json(err);
    }
};

//delete
export const petDeleteService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const requestedPetId = req.params.id;
        Pet.findById(requestedPetId, (err: any, item: any) => {
            if (err) console.log(err);
            Pet.deleteOne({ _id: requestedPetId }, (err) => {
                if (!err) {
                    res.json({ data: `${item.name} Deleted successfully`, status: 1 });
                }
            });
        });
    } catch (err: any) {
        logger.error("Delete Pet API Error");
        logger.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(403).json({ data: "Delete Pet API Error", status: 1 });
    }
};

//get pet detail
export const petDetailUserService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.access_token;
        let user: any;
        let petId: any[] = [];
        if (token) {
            const decoded: any = jwtDecode(token);
            user = decoded.user;
            await User.findById(user._id).populate("favorites");
            let Fav = await FavoriteModel.find({ userId: user._id });
            Fav.map((p: any) => {
                let pid = String(p.pets);
                petId.push(pid);
            });
        }
        const pet: any = await PetModel.findById(req.params.id);
        const pId: any[] = [];
        petId.filter((p) => {
            let id = p == pet._id;

            pId.push(id);
        });
        let isFav = pId.includes(true);
        if (!pet) {
            return next(createError(404, "Pet Not Found"));
        }
        res.status(200).json({
            success: true,
            isFav,
            data: pet,
        });
    } catch (err: any) {
        next(createError(500, "Internal Server Error"));
    }
};
