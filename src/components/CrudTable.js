import React from 'react'; 
import { CrudTableRow } from './CrudTableRow';

// La variable data viene destructurada desde el CrudApp, quien envía la lista de datos
const CrudTable = ({data, setDataToEdit, deleteData}) => {
    return (
        <div>
            <h3>Tabla de Datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Constellación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Realizar un renderizado condicional de los datos y que por cada elmento se cree su fila */}
                    {data.length === 0 ? ( <tr> <td colSpan="3"> Sin Datos</td> </tr> ) : ( data.map( el => <CrudTableRow key={el.id} el={el} setDataToEdit={setDataToEdit} deleteData={deleteData} />) ) }
                </tbody>
            </table>
        </div>
    );
}; 


export default CrudTable;
