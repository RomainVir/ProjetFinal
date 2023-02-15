import express from "express";
import donationController from "../controllers/donations_controller.js";

const donationRouter = express.Router();

//modify a Donation
donationRouter.patch("/:id", donationController.updateDonation);

//add a Donation
donationRouter.post("/add_donation", donationController.addDonation);

//obtener un Donation
donationRouter.get("/donations", donationController.getDonation);

export default donationRouter;
