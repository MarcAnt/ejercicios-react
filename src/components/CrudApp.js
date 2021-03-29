import React, { useState } from 'react'
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

// CRUD APP pero simulada con datos estáticos
const initialDB = [

    {
        id: 1, 
        name: 'Seiya',
        constellation: 'Pegaso'
    },

    {
        id: 2, 
        name: 'Shiryu',
        constellation: 'Dragón'
    },

    {
        id: 3, 
        name: 'Hyoga',
        constellation: 'Cisne'
    },

    {
        id: 4, 
        name: 'Shun',
        constellation: 'Andrómeda'
    },

    {
        id: 5, 
        name: 'Ikki',
        constellation: 'Fénix'
    }

]; 

const CrudApp = () => {

    const [db, setDb] = useState(initialDB); 

    // cuando el valor este null, es que se hará un inserción, true cuando hará un actualización
    const [dataToEdit, setDataToEdit] = useState(null); 


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

export default CrudApp; 