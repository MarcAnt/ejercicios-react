
import React, { useState, useEffect } from 'react'; 

// Va por fuer porque no forma parte del componente y son los valores iniciales para ir rellenando
const initialForm = {
    name: "",
    constellation: "",
    id: null
}

// Desctructurando los valor que viene desde CrudApp que son prasados como props
const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {

    const [form, setForm] = useState(initialForm); 

    //Con el useeffect es donde se va hacer el cambio de los datos en los inputs del formulario
    useEffect(() => {
        //Recordar que data to edit ya trae los valores de la fila que se desea editar 
        if (dataToEdit) {
            //Aqui pasan los datos al fotmulario
            setForm(dataToEdit);
        }else {
            setForm(initialForm);

        }

    }, [dataToEdit]); 

    const handleChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value 
        }); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!form.name || !form.constellation) {
            alert('Datos incompletos');
            return;  
        }

        if (form.id === null) {
            //Quiere hacer una inserción si e valor de la id viene vacio
            // La variable de estado form ya tiene todo los datos 
            createData(form); 
        }else {
            updateData(form); 
        }


        //Luego de todo se limpia el formulario
        handleReset(); 
    }

    const handleReset = (e) => {
        // usamos la funcion que actualiza la variable para reestablecer los datos vacios con el objeto inicial initialForm
        setForm(initialForm); 

        //Set data to edita actualiza la variable de estado de DataToEdit dejandolo en null para que no haya nada que editar
        setDataToEdit(null); 
    }

    return (
        <div>
            <h3>{(dataToEdit) ? 'Editar' : 'Agregar' }</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={form.name} />
                <input type="text" name="constellation" placeholder="Constelación" onChange={handleChange} value={form.constellation} />
                <input type="submit" value="Enviar" />
                <input type="reset" value="Limpiar" onClick={handleReset} />
            </form>
        </div>
    )
}

export default CrudForm;
