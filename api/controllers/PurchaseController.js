import { PurchaseModel } from "../models/PurchaseModel.js";

export const AddPurchase= async (req, res) => {
    try {
       
        //validar que los datos existen
        const user_id  = req.body.user_id
        const products  = req.body.products
        const date  = req.body.date
        const price  = req.body.price

        if (!user_id || !products || !date || !price){
            return res.status(400).json({
                msg: "faltan datos para realizar la compra"
            })
        }

        const purchase= await PurchaseModel.create({
            user_id,
            products,
            date,
            price    
        })

        return res.status(200).json({
            msg: "productos comprados con exito",

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al comprar los productos"
        })
    }
}

export const ShowPurchases = async (req, res) => {
    //correo y contraseña
    //verificar que el usuario existe
    try{
        const purchases = await PurchaseModel.find({user_id: res.params.product_id})

        if(!purchases){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existen compras"
            })
        }

        return res.status(200).json({
            msg: "compras existen",
            purchases
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al buscar las compras"
        })
    }
}

