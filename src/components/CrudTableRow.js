import React from 'react'
// El valor de el viene desde el CrudTable, donde trae todos los valores correspondientes
export const CrudTableRow = ({el, setDataToEdit, deleteData}) => {

    //En el, vienen todo los datos para llenar en la fila de la tabla
    let {name, constellation, id} = el;

    return (
    
            <tr>
                <td>{name}</td>
                <td>{constellation}</td>
                <td>
                    <button onClick={() => setDataToEdit(el)}>Editar</button>
                    <button onClick={() => deleteData(id)}>Eliminar</button>
                </td>
            </tr>
        
    );
}; 
