import Books from "../models/books.model.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Books.find()
        res.json(books)
    }
    catch (error) {
        return res.status(500).json({ message: "error al buscar el articulo" })
    }
}


export const getBook = async (req, res) => {
    try {
        const { id } = req.params
        const books = await Books.findById(id)

        if (!books) {
            return res.status(404).json({
                message: "Articulo no encontrado"
            })
        }

        res.json(books)

    } catch (error) {
        console.error("Error al obtener el articulo: ", error)
        res.status(500).json({
            message: "Error al obtener el articulo"
        })
    }
}

export const addBooks = async (req, res) => {
    try {
        const { title,
            author,
            synopsis,
            publicationDate,
            coverImage,
            pages,
            createdAt } = req.params
            
        const newBook = new Books({
            title,
            author,
            synopsis,
            publicationDate,
            coverImage,
            pages,
            createdAt
        })

        await newBook.save()

        res.status(201).json({
            message: "Libro creado exitosamente",
            newBook
        })


    } catch (error) {
        console.error("Error al crear el articulo: ", error)
        res.status(500).json({
            message: "Error al crear el articulo"
        })
    }
}

export const deleteBooks = async (req, res) => {
    try{
        const deleteBook = await Books.findByIdAndDelete(req.params.id)
        if(!deleteBook) return res.status(404).json({
            message:"Libro no encontrado"
        })

        res.json({
            message:"Libro eliminado exitosamente",
            deleteBook

        })
    } catch(error){
        console.error("Error al elimar el libro: ", error)
        res.status(500).json({
            message: "Error al elimnar el libro"
        })
    }
 }
export const updatedBooks = async (req, res) => { 
    try {
        const { id } = req.params
        const {title,
            author,
            synopsis,
            publicationDate,
            coverImage,
            pages,
            createdAt
        } = req.body

        const updatedBooks = await Books.findByIdAndUpdate(
            id,
            {
                title,
                author,
                synopsis,
                publicationDate,
                coverImage,
                pages,
                createdAt
            },
            {new: true}
        )

        if(!updatedBooks){
            return res.status(404).json({
                message: "Libro no encontrado"
            })

        }

        res.json({
            message: "Libro actualizado exitosamente",
            updatedBooks
        })
    } catch (error) {
        console.error("Error al actualizar el articulo: ", error)
        res.status(500).json({
            message:"Error al actulizar el libro"
        })
    }
}
