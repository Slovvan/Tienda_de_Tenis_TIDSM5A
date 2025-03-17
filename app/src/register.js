import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

function Register(){
    const [data, setData] = useState({})
    const navigate = useNavigate();

    const onChangeRegister = (e)=>{
        e.preventDefault()
        const nData = data
        nData[e.target.name] = e.target.value
            setData(nData)
            console.log(nData)
    }

    const onSubmit = async ()=>{
        try {
            if(data["password"] != data["password2"] ){
                alert("Contraseña Distinta")
            } else{
            data.rol = "client"
            await axios.post("http://localhost:4000/users/register", data)
            console.log("Usuario registrado con exito")
            navigate("/")
            }

        } catch (error) {
            alert("Ocurrio un error")
        }
        
    }

    return (
        <div className="Loginbody">
            <div className="Logincontainer">
        <div className="form-container" id="register">
            <h2 className="Loginh2">Registrarse</h2>
            <form className="Loginform">
                <label className="Loginlabel">Nombre:</label>
                <input className="Logininput"type="text" required onChange={onChangeRegister} name="name" placeholder="Ingresa tu Nombre"/>

                <label className="Loginlabel">Apellido:</label>
                <input className="Logininput"type="text" required onChange={onChangeRegister} name="lastName" placeholder="Ingresa un Apellido"/>

                <label className="Loginlabel">Correo:</label>
                <input className="Logininput" type="email" required onChange={onChangeRegister} name="email" placeholder="Ingresa tu Correo"/>
                
                <label className="Loginlabel">Contraseña:</label>
                <input className="Logininput"type="password" required onChange={onChangeRegister} name="password" placeholder="Ingresa tu Contraseña"/>

                <label className="Loginlabel">Confirmar Contraseña:</label>
                <input className="Logininput"type="password" required onChange={onChangeRegister} name="password2" placeholder="COnfirma tu Contraseña"/>

                <Button className="Loginbutton Hoverbutton" onClick={onSubmit} >Registrarse</Button>
            </form>
            <p className="Loginp">¿Ya tienes cuenta? <a href="/" >Inicia sesión</a></p>
        </div>
    </div>
        </div>
        
    
    )
}


export default Register;