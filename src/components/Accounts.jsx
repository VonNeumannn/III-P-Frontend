import React from 'react';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';

import {cards} from '../test';

function Accounts() {
    // Account list
    const[accountList, setAccountList] = useState(cards);
    const navigate = useNavigate();

    const handleAccountSelection = (cardCode) => {
        navigate(`/account-statements/${cardCode}`);
    }

    return (
        <div>
            <h1>Juanito mora del castillo</h1>
            <div className='border rounded bg-light mx-5 px-2 mt-2'>
                <Table className='mb-5' bordered  hover>
                    <thead>
                        <tr>
                            <th>Numero de Tarjeta</th>
                            <th>Estado</th>
                            <th>Tipo de Cuenta</th>
                            <th>Fecha de Vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountList.map(function (accountList, index) {
                                return (
                                    <tr key={index} onClick={() => handleAccountSelection(accountList.CardCode)}>
                                        <td>{accountList.CardCode}</td>
                                        <td>{accountList.AccountStatus}</td>
                                        <td>{accountList.AccountType}</td>
                                        <td>{accountList.ExpirationDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Accounts;