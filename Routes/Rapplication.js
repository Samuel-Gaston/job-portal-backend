import express from 'express'
import { getApplications, addApplication, deleteApplication } from '../Controllers/Capplication.js';

const Route = express.Router();

Route.get("/", getApplications)
Route.post("/", addApplication);
Route.delete("/:id", deleteApplication);


export default Route;