const orderModel = require("../models/orderModel");
const mongoose = require("mongoose");

// CREATE ORDER
const createOrder = async (req, res) => {
    const newOrder = new orderModel(req.body)
    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }
    catch(err){
        res.status(500).json(err)
    }
};

//GET ONE ORDER



module.exports = { createOrder };
