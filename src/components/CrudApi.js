
import React, { useState, useEffect } from 'react'
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';


const CrudApi = () => {

    const [db, setDb] = useState([]); 

    // cuando el valor este null, es que se hará un inserción, true cuando hará un actualización
    const [dataToEdit, setDataToEdit] = useState(null);
    
    //Helper para las funciones que contectan con la api
    const api = helpHttp();
    const url = "http://localhost:5000/santos";

    useEffect(() => {
      api.get(url).then(res => {
          // Cuando no venga con error, actualizar la variable para enviarlos a la tabla
          if (!res.err) {
              setDb(res)
          }else {
              setDb(null)
          }

      });
    }, [])

    const createData = (data) => {

        data.id = Date.now(); 

        setDb([...db, data]);


    };

    const updateData = (data) => {

        let newData = db.map(el => el.id === data.id ? data: el ); 
        setDb(newData);
    };

    const deleteData = (id) => {
        let isDelete = window.confirm(`¿Está seguro de eliminar el registro con eñ id '${id}'?`); 

        if(isDelete) {
            // solo almacena los elementos que son disntintos 
            let newData = db.filter(el => el.id !== id); 
            setDb(newData); 
        }else { 
            return; 
        }
    };

    return (
        <div>
            <h2>CRUD APP</h2>

            <article className="grid-1-2">
                {/* Se le pasan las funciones y el valor de dataToEdit al form para que decida si insertar o editar y la función que lo maneja setDataToEdit */}
                <CrudForm 
                createData={createData} 
                updateData={updateData} 
                dataToEdit={dataToEdit} 
                setDataToEdit={setDataToEdit}/>
                
                {/* deleteData se envia porque es donde estará el botón de eliminar (enCrudTableRow) */}
                <CrudTable 
                data={db} 
                setDataToEdit={setDataToEdit} 
                deleteData={deleteData} />

            </article>

        </div>
    ); 
}; 

export default CrudApi; 