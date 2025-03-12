import { UserModel } from "../models/UserModel.js";
import { ShoesModel } from "../models/ShoesModel.js";
export const registerUsers= async (req, res) => {
    try {
       
        //validar que los datos existen
        const name= req.body.name
        const email = req.body.email
        const lastName= req.body.lastName
        const password= req.body.password
        const rol= req.body.rol

         //Administradores no pueden crear clientes
         if(req.user?.rol === "administrador" && rol == "client"){
            return res.status(400).json({
                msg: "Los administradores no pueden crear clientes"
            })
         }
        if (!name || !email || !lastName || !password || !rol){
            return res.status(400).json({
                msg: "faltan datos para crear un usuario"
            })
        }
        
        //validar que el usuario sea administrador si el usuario a crear es administrador
        if(rol == "administrador" && req.user?.rol != "administrador"){
            return res.status(400).json({
                msg: "No puedes crear administradores si no eres uno"
            })
        }

        const user= await UserModel.create({
            name,
            email,
            lastName,
            password,
            rol
        })

        return res.status(200).json({
            msg: "Usuario registrado con exito",

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear el usuario"
        })
    }
}

export const singin = async (req, res) => {
    //correo y contraseña
    //verificar que el usuario existe
    try{
        const user = await UserModel.findOne({email:req.body.email, password:req.body.password} )

        if(!user){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existe usuario"
            })
        }

        return res.status(200).json({
            msg: "Usuario existe",
            user
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error ingresar el usuario"
        })
    }
}

export const getMetrics = async (req, res) => {
    try {
        const numberUsers = await UserModel.find({rol:"client"}).countDocuments()
        const numberShoes = await ShoesModel.find().countDocuments()

        return res.status(200).json({
            msg: "Datos obtenidos con exito", numberUsers, numberShoes
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Hubo un error al obtener las metricas de la aplicacion"
        })
        return
    }
}
