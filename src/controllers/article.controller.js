import Article from "../models/article.model.js"

export const getArticles = async (req, res) => {
    try {
        const article = await Article.find()
        res.json(article)

    } catch (error) {
        return res.status(500).json({ message: "error al buscar el articulo" })
    }
}

export const getArticle = async (req, res) => {
    try {
        const { id } = req.params
        const article = await Article.findById(id)

        if (!article) {
            return res.status(404).json({
                message: "Articulo no encontrado"
            })
        }

        res.json(article)


    } catch (error) {
        console.error("Error al obtener el articulo: ", error)
        res.status(500).json({
            message: "Error al obtener el articulo"
        })
    }

}
export const addArticle = async (req, res) => {
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    try {
        const { title,
            subtitle,
            content,
            tags,
        } = req.body
        
        
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const images = req.files.map((file) => {
            // Procesa las imágenes según tus necesidades
            return file.buffer.toString("base64"); // Ejemplo: almacenar en base64
          });

        const newArticle = new Article({
            title,
            subtitle,
            content,

            images,
            tags,
        })

        await newArticle.save()

        res.status(201).json({
            message: "Articulo creado exitosamente",
            newArticle
        })

    } catch (error) {
        console.error("Error al crear el articulo: ", error)
        res.status(500).json({
            message: "Error al crear el articulo"
        })
    }
}
export const deleteArticle = async (req, res) => {
    try {
        const deleteArticle = await Article.findByIdAndDelete(req.params.id)
        if (!deleteArticle) return res.status(404).json({
            message: "Articulo no encontrado"
        })

        res.json({
            message: "Articulo eliminado exitosamente",
            deleteArticle
        })

    } catch (error) {
        console.error("Error al eliminar el articulo: ", error)
        res.status(500).json({
            message: "Error al elimar el articulo"
        })
    }
}
export const updatedArticle = async (req, res) => {
    try {

        const { id } = req.params
        const { title,
            subtitle,
            content,

            images,
            tags
        } = req.body

        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            {
                title,
                subtitle,
                content,

                images,
                tags,

            },
            { new: true }
        )

        if (!updatedArticle) {
            return res.status(404).json({
                message: "Articulo no encontrado"
            })
        }
        res.json({
            message: "Articulo actualizado exitosamente",
            updatedArticle
        })
    } catch (error) {
        console.error("Error al actualizar el articulo: ", error)
        res.status(500).json({
            message: "Error al actulizar el articulo"
        })
    }

}

