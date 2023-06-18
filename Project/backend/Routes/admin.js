import express from "express";
const router = express.Router();

const admin_data = "Admin data";

const getAdmin = async (req, res) => {
  try {
    res.status(200).send(admin_data);
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get("/", getAdmin);
export default router;
