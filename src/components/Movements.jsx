import React from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';

import { movements } from '../test';

function Movements() {
    const [movementList, setMovementList] = useState(movements);

    return (
        <div>
            <h1>movements</h1>

             <Table className='mb-5' bordered  hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de Movimiento</th>
                            <th>Descripcion</th>
                            <th>Referencia</th>
                            <th>Monto</th>
                            <th>Nuevo Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movementList.map(function (movementList, index) {
                                return (
                                    <tr key={index} >
                                        <td>{movementList.Date}</td>
                                        <td>{movementList.MovementType}</td>
                                        <td>{movementList.Description}</td>
                                        <td>{movementList.Reference}</td>
                                        <td>{movementList.Amount}</td>
                                        <td>{movementList.NewBalance}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
        </div>
    )
}

export default Movements;