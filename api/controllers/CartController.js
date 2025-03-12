import { CartModel } from "../models/CartModel.js";

export const AddCart= async (req, res) => {
    try {
       
        //validar que los datos existen
        const user_id = req.body.user_id
        const product_id = req.body.product_id
        const quantity = req.body.quantity

        if (!user_id || !product_id || !quantity){
            return res.status(400).json({
                msg: "faltan datos para agreagr un producto al carrito"
            })
        }

        const cart= await CartModel.create({
            user_id,
            product_id,
            quantity    
        })

        return res.status(200).json({
            msg: "producto agreagdo con exito",

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al agregar el producto"
        })
    }
}

export const ShowCartProducts = async (req, res) => {
    //correo y contraseña
    //verificar que el usuario existe
    try{
        const cart = await CartModel.find({user_id: req.body.user_id })

        if(!cart){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existen productos"
            })
        }

        return res.status(200).json({
            msg: "productos existen",
            cart
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al buscar productos"
        })
    }
}


export const deleteOne = async (req, res) => {
    try {
      const product = await CartModel.findByIdAndDelete({_id: req.params.id});
      if (!product) {
        return res.status(404).json({
          msg: "Producto no encontrado"
        });
      }
      return res.status(200).json({
        msg: "Producto eliminado con éxito"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Hubo un error al eliminar el producto"
      });
    }
  };
  

export const deleteAll = async (req, res) => {
    try {
        await CartModel.deleteMany({user_id: req.params.id})

        return res.status(200).json({
            msg: "Carro vacio" 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al vaciar el carrito"
        })
    }
}

export const updateProduct = async (req, res) => {
    //correo y contraseña
    //verificar que el usuario existe
    try{
        const user_id = req.body.user_id
        const product_id = req.body.product_id
        const quantity = req.body.quantity

        const cart = await CartModel.findOneAndUpdate(
            {user_id: user_id, product_id: product_id },{
                $inc: { quantity: quantity }
            },{
                returnOriginal: false
            })

        if(!cart){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existe producto"
            })
        }

        return res.status(200).json({
            msg: "producto Actualizado",
            cart
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al buscar productos"
        })
    }
}