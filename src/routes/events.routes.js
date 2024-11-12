import { Router } from "express";
import { authRequired } from "../middleware/validator.token.js";
import { getEvents,
getEvent, 
addEvent,
deleteEvent } from "../controllers/events.controller.js";

const router = Router()

router.get("/events", getEvents)
router.get("/event/:id", getEvent)
router.post("/addevents", authRequired, addEvent)
router.delete("/events/:id",authRequired, deleteEvent)




export default router