const express = require("express");
const router = express.Router();

const binController = require("../controllers/bin.controller");
const bin = new binController();

router.get("/", bin.getHome);

router.get("/new", bin.createNew);

router.post("/save", bin.saveBin);

router.get("/:id/duplicate", bin.duplicateBin);

router.get("/:id", bin.getBin);

module.exports = router;
