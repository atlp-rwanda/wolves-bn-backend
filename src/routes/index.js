import express from "express";

const router = express.Router();
router.use(express.json());
// Test if endpoint works
router.get("/", (req, res) => {
  res.send("Get endpoint is working");
});

export default router;
