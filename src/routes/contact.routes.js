import { Router } from "express";
import { getContacts,
    getContact,
    addContact,
    updatedMessageStatus,
    deleteContact,
getBasicContact,
deleteBasicContact } from "../controllers/contact.controller.js";
import { authRequired } from "../middleware/validator.token.js";

const router = Router()

router.get("/basiccontacts",authRequired,getBasicContact)
router.delete("/contact/:id",authRequired, deleteBasicContact)
router.get("/contacts",authRequired,getContacts)
router.get("/contact",authRequired, getContact)
router.post("/addcontacts", addContact)
router.put("/contact/:id",authRequired, updatedMessageStatus)
router.delete("/contact/:id",authRequired, deleteContact)


export default router