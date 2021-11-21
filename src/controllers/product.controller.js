const express = require("express");
const Product=require("../module/product.model");

const router = express.Router();

const authenticate = require("../middleware/authenticate")

router.get("",authenticate, async(req,res)=>{
    const products = await Product.find().lean().exec();

    return res.status(200).send(products);
})

router.post("",async(req,res)=>{
    const products = await Product.create(req.body);

    return res.status(200).send(products);
})


module.exports=router;