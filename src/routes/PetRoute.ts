import express from "express";
import { check } from "express-validator";
import {
  petDelete,
  petGet,
  petUpdate,
  petUpload,
  petDetail,
} from "../controllers/PetController";
import { store } from "../middlewares/multer";
import { isAdmin } from "../middlewares/isAuth";
const router = express.Router();

router.route("/pets").get(petGet);

router
  .route("/admin/pets")
  .post(
    store.array("images", 1200),
    [
      check("name").notEmpty().withMessage("name can't be empty"),
      check("breed").notEmpty().withMessage("breed can't be empty"),
      check("age").notEmpty().withMessage("age can't be empty"),
      check("size").notEmpty().withMessage("size can't be empty"),
      check("sex").notEmpty().withMessage("sex can't be empty"),
      check("description").notEmpty().withMessage("description can't be empty"),
    ],
    isAdmin,
    petUpload
  );

router.route("/pets/:id").get(petDetail);

router
  .route("/admin/pets/:id")
  .delete(isAdmin, petDelete)
  .put(isAdmin, store.array("images", 1200), petUpdate);
export default router;
