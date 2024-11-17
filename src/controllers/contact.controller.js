import Contact from "../models/contact.model.js";

export const getContacts = async(req, res) => {
    try {
        const contact = await Contact.find()
        res.json(contact)
    } catch (error) {
        return res.status(500).json({message:"Error al buscar el contacto"})
    }
}

export const getContact = async(req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findById(id)

        if(!contact) {
            return res.status(404).json({
                message:  "Articulo no encontrado"
            })
        }
        res.json(contact)
    } catch (error) {
        console.error("Error al obtener el contacto: ", error)
        res.status(500).json({
            message:"Error al obtener el contacto"
        })
    }
}

export const addContact = async(req, res) => {
    const { name, email, message } = req.body

    if(!name || !email ) {
        return res.status(400).json({
            error: "El nombre y el email son obligatorios"
        })
    }

    try {
        const newContact = new Contact({name, email, message})

        await newContact.save()

        return res.status(201).json({
            message: "El contacto se ha guardado correctamente",
            contact: newContact
        })

    } catch (error) {
        console.error("Error al guardar el contacto: ", error)
        return res.status(500).json({
            error: "Hubo un error al guardar el contacto. Intentalo nuevamente"
        })
    }
}

export const updatedMessageStatus = async(req, res) => {
    const { id } = req.params 

    try {
        const contact = await Contact.findById(id)

        if(!contact){
            return res.status(404).json({error:"No se encontro el contacto."})
        }

        contact.status = !contact.status
        await contact.save()

        return res.status(200).json({
            message: "El estado del contacto se ha actualizado correctamente",
            contact
        })
    } catch (error) {
        console.error("Error al actualizar el estado del contacto: ", error)
        return res.status(500).json({
            error:"Hubo un error al actualizar el estado. Intentalo nuevamente"
        })
    }
    
}

export const deleteContact = async(req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params)
        if(!contact) return res.status(404).json({
            message: "Contacto no encontrado"
        })

        res.json({
            message: "Contacto eliminado exitosamente",
            contact
        })

    } catch (error) {
        console.error("Error al eliminar el contacto", error)
        res.status(500).json({
            message: "Error al eliminar el contacto"
        })
    }
}
