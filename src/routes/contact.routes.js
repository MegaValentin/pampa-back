import { Router } from "express";
import { getContacts,
    getContact,
    addContact,
    updatedMessageStatus,
    deleteContact, } from "../controllers/contact.controller";
import { authRequired } from "../middleware/validator.token";

const router = Router()

router.get("/contacts",authRequired,getContacts)
router.get("/contact",authRequired, getContact)
router.post("/addcontacts", addContact)
router.put("/contact/:id/toggle",authRequired, updatedMessageStatus)
router.delete("/contact/:id",authRequired, deleteContact)


export default router