const express = require("express");

const router = express.Router();   

const {registerUser,loginUser}=require("../controllers/authcontroller")
router.get("/", (req, res) => {
  res.send("users route working");
});
router.post("/register",registerUser  );
 router.post("/login",loginUser)
module.exports = router;