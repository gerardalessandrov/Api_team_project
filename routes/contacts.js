const express = require("express");
const router = express.Router();
const usersController = require("../controllers/contacts");
const { body, validationResult } = require("express-validator");
const { isAuthenticated } = require("../middleware/authenthicate");
router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

// POST route to create a new user with validations
router.post(
  "/",
  isAuthenticated,
  [
    body("fullName").isLength({ min: 1 }).withMessage("Full name is required."),

    body("email").isEmail().withMessage("A valid email address is required."),

    body("address").isLength({ min: 1 }).withMessage("Address is required."),

    body("phone")
      .isMobilePhone("any", { strictMode: false })
      .withMessage("A valid phone number is required."),

    body("registrationDate")
      .isISO8601()
      .withMessage("A valid registration date is required (ISO 8601 format)."),

    body("isActive")
      .isBoolean()
      .withMessage("Active status must be a boolean value (true or false)."),
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
  isAuthenticated,
  [
    body("fullName").isLength({ min: 1 }).withMessage("Full name is required."),

    body("email").isEmail().withMessage("A valid email address is required."),

    body("address").isLength({ min: 1 }).withMessage("Address is required."),

    body("phone")
      .isMobilePhone("any", { strictMode: false })
      .withMessage("A valid phone number is required."),

    body("registrationDate")
      .isISO8601()
      .withMessage("A valid registration date is required (ISO 8601 format)."),

    body("isActive")
      .isBoolean()
      .withMessage("Active status must be a boolean value (true or false)."),
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

router.delete("/:id", isAuthenticated, usersController.deleteUser);
module.exports = router;
