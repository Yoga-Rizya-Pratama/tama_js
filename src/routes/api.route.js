const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("../docs/api-docs");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Hello, this is the root endpoint!",
      version: "1.0.0",
      api_docs: "/api-docs",
    });
  } catch (error) {
    next(error);
  }
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
