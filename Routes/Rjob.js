import express from 'express'
import { addJob,getJobs, deleteJob } from '../Controllers/Cjob.js'

const Route = express.Router();

Route.get("/", getJobs);
Route.post("/", addJob);
Route.delete("/:id", deleteJob)

export default Route