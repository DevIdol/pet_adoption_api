import express from "express";
import { check } from "express-validator";
import {
  donateRequest,
  donateRequestCreate,
  donationUpdate,
  donationDelete,
} from "../controllers/DonationController";
import { isAdmin } from "../middlewares/isAuth";

const router = express.Router();
router.route("/donations").get(donateRequest);

router.route("/admin/donations").post(
  [
    check("itemName").notEmpty().withMessage("Item name can't be empty"),
    check("quantity")
      .notEmpty()
      .withMessage("Quantity can't be empty")
      .matches(/^[0-9]{0,4}$/g)
      .withMessage("Type number 1 to 4 digits"),
    check("description").notEmpty().withMessage("Description can't be empty"),
  ],
  isAdmin,
  donateRequestCreate
);
router
  .route("/admin/donations/:id")
  .put(isAdmin, donationUpdate)
  .delete(isAdmin, donationDelete);

export default router;
