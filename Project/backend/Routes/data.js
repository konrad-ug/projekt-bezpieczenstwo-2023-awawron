import express from "express";
const router = express.Router();

let data = {
  "user@gmail.com": ["user data"],
  "admin@gmail.com": ["admin data"],
};

const getData = async (req, res) => {
  try {
    const email = req.user;

    res.status(200).send(data[email]);
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get("/", getData);
export default router;
