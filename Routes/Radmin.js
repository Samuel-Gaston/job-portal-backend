import express from 'express';
import {addAdmin, authAdmin, getAdmin} from '../Controllers/Cadmin.js';

const Route = express.Router();

Route.post("/", addAdmin);
Route.post("/auth", authAdmin)
Route.get("/", getAdmin);

export default Route;