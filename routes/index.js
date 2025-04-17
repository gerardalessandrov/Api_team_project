const passport = require("passport");
const router = require("express").Router();
const contacts = require("./contacts");
const products = require("./products");

// Si quieres tener una ruta GET explícita para ver que funcionan
router.get("/contacts", contacts);  // <-- ❌ Esto dará error, porque contacts es un router, no un handler
router.get("/products", products);  // <-- ❌ Mismo problema
router.use("/", require("./swagger"));
router.get("/", (req, res) => {
  res.send("Logged out");
});
router.get("/tasks", (req, res) => {
  res.send("Logged out");
});
// router.use("/contacts", require("./contacts"));
// router.use("/products", require("./products"));
router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
