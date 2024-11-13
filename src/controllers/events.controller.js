import Events from "../models/events.model.js"

export const getEvents = async(req, res) => {
    try {
        const event = await Events.find()
        res.json(event)

    } catch (error) {
       return res.status(500).json({message: "error al buscar el evento"}) 
    }
}

export const getEvent = async(req, res) => {
    try {
        const { id }= req.params
        const event = await Events.findById(id)

        if(!event){
            return res.status(404).json({
                message:"Evento no encontrado"
            })
        }

        res.json(event)


    } catch (error) {
        console.error("Error al obtener el Evento: ", error)
        res.status(500).json({
            message: "Error al obtener el Evento"
        })
    }

}

export const addEvent = async (req, res) => {
    console.log(req.body);
    try {
        const { title, description, date } = req.body;

        const eventDate = new Date(date);
        const currentDate = new Date();

        currentDate.setHours(0, 0, 0, 0);
        if (eventDate < currentDate) {
            return res.status(400).json({
                message: "No se pueden crear eventos en fechas anteriores a la actual",
            });
        }
        const newEvent = new Events({
            title,
            description,
            date
        });
        await newEvent.save();
        res.status(201).json({
            message: "Evento creado exitosamente",
            newEvent
        });
    } catch (error) {
        console.error("Error al crear el evento: ", error);
        res.status(500).json({
            message: "Error al crear el evento"
        });
    }
};

export const deleteEvent = async(req, res) => {
    try{
        const deleteEvent = await Events.findByIdAndDelete(req.params.id)
        if(!deleteEvent) return res.status(404).json({
            message:"Evento no encontrado"
        })

        res.json({
            message:"Evento eliminado exitosamente",
            deleteBook

        })
    } catch(error){
        console.error("Error al elimar el Evento: ", error)
        res.status(500).json({
            message: "Error al elimnar el evento"
        })
    }
}

export const deleteOldEvents = async () => {
    const currentDate = new Date()

    const twoDaysAgo = new Date(currentDate.setDate(currentDate.getDate() -1))

    try {
        const result = await Events.deleteMany({date: {$lt:twoDaysAgo}})
        console.log(`Eventos eliminados: ${result.deletedCount}`)

    } catch (error) {
        console.error("Error al eliminar eventos antiguos: ", error)
    }
}