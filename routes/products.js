const express = require("express");
const router = express.Router();
const usersController = require("../controllers/products");
const { body, validationResult } = require("express-validator");
// const { isAuthenticated } = require("../middleware/authenthicate");
router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

router.post(
  "/",
//   isAuthenticated,
  [
    body("name").isLength({ min: 1 }).withMessage("Product name is required."),

    body("description")
      .isLength({ min: 1 })
      .withMessage("Product description is required."),

    body("price")
      .isFloat({ gt: 0 })
      .withMessage(
        "A valid product price is required and must be greater than 0."
      ),

    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer."),

    body("category")
      .isLength({ min: 1 })
      .withMessage("Product category is required."),

    body("available")
      .isBoolean()
      .withMessage("Availability must be a boolean value (true or false)."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  usersController.createUser
);

// PUT route to update an existing user with validations
router.put(
  "/:id",
//   isAuthenticated,
  [
    body("name").isLength({ min: 1 }).withMessage("Product name is required."),

    body("description")
      .isLength({ min: 1 })
      .withMessage("Product description is required."),

    body("price")
      .isFloat({ gt: 0 })
      .withMessage(
        "A valid product price is required and must be greater than 0."
      ),

    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer."),

    body("category")
      .isLength({ min: 1 })
      .withMessage("Product category is required."),

    body("available")
      .isBoolean()
      .withMessage("Availability must be a boolean value (true or false)."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  usersController.updateUser
);

router.delete("/:id", usersController.deleteUser);
module.exports = router;
