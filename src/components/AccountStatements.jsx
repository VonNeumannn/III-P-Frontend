import React from 'react';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';

import {statements} from '../test';

function AccountStatements() {
    const navigate = useNavigate();
    const [accountStatmentList, setAccountStatementList] = useState(statements);
    const {id} = useParams()

    const handleStatementSelection = (date) => {
        navigate(`/movements/${date}`);
    }

    return (
        <div>
            <h1> accountStatements</h1>
             <Table className='mb-5' bordered  hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Pago minímo</th>
                            <th>Pago de Contado</th>
                            <th>Intereses Corrientes</th>
                            <th>Intereses Moratorios</th>
                            <th>Cantidad de Operaciones ATM</th>
                            <th>Cantidad de Operaciones en Ventanilla</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountStatmentList.map(function (accountStatementList, index) {
                                return (
                                    <tr key={index} onClick={() => handleStatementSelection(accountStatementList.Date)}>
                                        <td>{accountStatementList.Date}</td>
                                        <td>{accountStatementList.MinPayment}</td>
                                        <td>{accountStatementList.StatementBalance}</td>
                                        <td>{accountStatementList.CurrentInterest}</td>
                                        <td>{accountStatementList.PenaltyInterest}</td>
                                        <td>{accountStatementList.ATMOperations}</td>
                                        <td>{accountStatementList.BrandOperations}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
        </div>
    )
}
export default AccountStatements;