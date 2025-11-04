import express from 'express'
import { getInterviews, addInterview, deleteInterview } from '../Controllers/Cinterview.js'

const Route = express.Router();

Route.get("/", getInterviews)
Route.post("/", addInterview)
Route.delete("/:id", deleteInterview);


export default Route;