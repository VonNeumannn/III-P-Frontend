import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { fetchHeaders } from '../constants';

function MasterAccountMovements() {
    const [movementList, setMovementList] = useState([]);
   const { idStatement, cardCode } = useParams(); 
    useEffect(() => {
        fetch('http://localhost:8080/masterMovements', {
            method: "POST",
            body: JSON.stringify({
                "inIdAccountState": idStatement,
                "inCardCode": cardCode,
                "inUsername": localStorage.getItem("inUser"),
                "inPostIp": localStorage.getItem("ip") 
            }),
            headers: fetchHeaders 
        })
            .then((res) => res.json())
            .then((data) => {
                setMovementList(data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    return (
        <div>
            <h1>Movements</h1>

             <Table className='mb-5' bordered  hover>
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                        <td>{movementList.Id}</td>
                                        <td>{movementList.BillingPeriod}</td>
                                        <td>{movementList.MovementTypeName}</td>
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

export default MasterAccountMovements;