import express from "express";
import { check } from "express-validator";
import {
  petArticleGet,
  petArticle,
  petArticleUpdate,
  petArticleDelete,
} from "../controllers/ArticleController.js";
import { isAdmin } from "../middlewares/isAuth.js";
const router = express.Router();

router.route("/articles").get(petArticleGet);

router
  .route("/admin/articles")
  .post(
    [
      check("category").notEmpty().withMessage("Category can't be empty"),
      check("title").notEmpty().withMessage("Title can't be empty"),
      check("description").notEmpty().withMessage("Description can't be empty"),
    ],
    isAdmin,
    petArticle
  );
router
  .route("/admin/articles/:id")
  .put(isAdmin, petArticleUpdate)
  .delete(isAdmin, petArticleDelete);
export default router;
