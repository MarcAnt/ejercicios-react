
import React, { useState, useEffect } from 'react'
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader  from './Loader';
import Message from './Message';


const CrudApi = () => {
    // Manejo del error 
    const [error, setError] = useState(null);

    // Manejo del loader 
    const [loading, setLoading] = useState(false);

    const [db, setDb] = useState(null); 

    // cuando el valor este null, es que se hará un inserción, true cuando hará un actualización
    const [dataToEdit, setDataToEdit] = useState(null);
    
    //Helper para las funciones que contectan con la api
    const api = helpHttp();
    const url = "http://localhost:5000/santos";

    useEffect(() => {
      setLoading(true);
      helpHttp().get(url).then(res => {
          // Cuando no venga con error, actualizar la variable para enviarlos a la tabla
          if (!res.err) {
              setDb(res);
              setError(null);
            }else {
                setDb(null);
                setError();
          }

          setLoading(false);
      });
    }, [url])

    const createData = (data) => {

        data.id = Date.now(); 
        let options =  {body: data, headers:{"content-type":"applicaction/json"}};

        api.post(url,options).then((res) => {

            console.log(res);
            if(!res.err) {
                setDb([...db, res]);
            }else {
                setError(res);
            }
        })


    };

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`;

        let options =  {body: data, headers:{"content-type":"applicaction/json"}};

        api.put(endpoint, options).then((res) => {

            console.log(res);

            if(!res.err) {
                let newData = db.map(el => el.id === data.id ? data: el ); 
                setDb(newData);
            }else {
                //se manda el error en la respuesta
                setError(res);
            }
        })
    };

    const deleteData = (id) => {
        let isDelete = window.confirm(`¿Está seguro de eliminar el registro con el id '${id}'?`); 

        if(isDelete) {

            let endpoint = `${url}/${id}`;

            let options =  {headers:{"content-type":"applicaction/json"}};

            api.del(endpoint, options).then((res) => {

                console.log(res);

                if(!res.err) {
                    // solo almacena los elementos que son disntintos 
                    let newData = db.filter(el => el.id !== id); 
                    setDb(newData); 
                    
                }else {
                    //se manda el error en la respuesta
                    setError(res);
                }
            })

           
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

                {loading && <Loader /> }
                {error &&  <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" /> }
                
                {/* deleteData se envia porque es donde estará el botón de eliminar (enCrudTableRow) */}
                
                
                { db && <CrudTable 
                data={db} 
                setDataToEdit={setDataToEdit} 
                deleteData={deleteData} /> }

                
               

            </article>

        </div>
    ); 
}; 

export default CrudApi; 