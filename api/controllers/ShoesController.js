import { ShoesModel } from "../models/ShoesModel.js";

export const AddProduct= async (req, res) => {
    try {
       
        //validar que los datos existen
        const image = req.body.image
        const brand = req.body.brand
        const model = req.body.model
        const price = req.body.price
        const stock = req.body.stock
        const color = req.body.color

         //clientes no pueden agregar productos
         /* if(req.user?.rol !== "administrador"){
            return res.status(400).json({
                msg: "No eres administrador"
            })
         } */
        if (!image || !brand || !model|| !price || !stock || !color){
            return res.status(400).json({
                msg: "faltan datos para crear un producto"
            })
        }

        const shoes= await ShoesModel.create({
            image,
            brand,
            model,
            price,
            stock,
            color
            
        })

        return res.status(200).json({
            msg: "producto registrado con exito",

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear el producto"
        })
    }
}

export const ShowProduct = async (req, res) => {
    //correo y contraseña
    //verificar que el usuario existe
    try{
        console.log(req.body.product_id)
        const shoes = await ShoesModel.find({ _id: { $in: req.body.product_id }})

        if(!shoes.length){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existen productos"
            })
        }

        return res.status(200).json({
            msg: "productos existen",
            shoes
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al buscar productos"
        })
    }
}

export const ShowProducts = async (req, res) => {
    //correo y contraseña
    //verificar que el usuario existe
    try{
        const shoes = await ShoesModel.find()

        if(!shoes){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existen productos"
            })
        }

        return res.status(200).json({
            msg: "productos existen",
            shoes
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al buscar productos"
        })
    }
}
