import React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { fetchHeaders } from '../constants';

function Accounts() {
    // Account list
    const[accountList, setAccountList] = useState([]);
    const navigate = useNavigate();

    const getAccountList = (data) => {
        //setAccountList(data);
    }

    const handleAccountSelection = (cardCode, accountType ) => {
        if (accountType === 'Cuenta Maestra') {   
            navigate(`/account-statements/${cardCode}`);
        } else  {
            navigate(`/subaccount-statements/${cardCode}`)
        }
    }
       // load full account or subaccount statements 
    useEffect(() => {
        fetch('http://localhost:8080/physicalCard', {
            method: "POST",
            body: JSON.stringify({
                "inName": localStorage.getItem("inUser"),
                "inPostIp": localStorage.getItem("ip") 
            }),
            headers: fetchHeaders 
        })
            .then((res) => res.json())
            .then((data) => {
                setAccountList(data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (   
        <div>
            <h1>Juanito mora del castillo</h1>
            <div className='border rounded bg-light mx-5 px-2 mt-2'>
                <Table className='mb-5' bordered  hover>
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                    <tr key={index} onClick={() =>
                                                    handleAccountSelection(accountList.CardCode,
                                                    accountList.AccountType)}>
                                        <td>{accountList.Id}</td>
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