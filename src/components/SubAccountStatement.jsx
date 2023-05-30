import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchHeaders } from '../constants';

function SubAccountStatement() {
    const navigate = useNavigate();
    const [accountStatmentList, setAccountStatementList] = useState([]);
    const {cardCode} = useParams();

    const handleStatementSelection = (idStatement) => {
        navigate(`/additional-account-movements/${idStatement}/${cardCode}`);
    }

    useEffect(() => {
        fetch('http://localhost:8080/SubAccountStatement', {
            method: "POST",
            body: JSON.stringify({
                "inCardCode": cardCode,
                "inUsername": localStorage.getItem("inUser"),
                "inPostIp": localStorage.getItem("ip") 
            }),
            headers: fetchHeaders 
        })
            .then((res) => res.json())
            .then((data) => {
                setAccountStatementList(data);
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <h1>Subaccount Statements</h1>
             <Table className='mb-5' bordered  hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Cantidad de Operaciones ATM</th>
                            <th>Cantidad de Operaciones en Ventanilla</th>
                            <th>Cantidad de Compras</th>
                            <th>Suma de las Compras</th>
                            <th>Cantidad de Retiros</th>
                            <th>Suma de Los Retiros</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountStatmentList.map(function (accountStatementList, index) {
                                return (
                                    <tr key={index} onClick={() => handleStatementSelection(accountStatementList.Id)}>
                                        <td>{accountStatementList.Id}</td>
                                        <td>{accountStatementList.BillingPeriod}</td>
                                        <td>{accountStatementList.QATMOperations}</td>
                                        <td>{accountStatementList.QBrandOperations}</td>
                                        <td>{accountStatementList.QPurchases}</td>
                                        <td>{accountStatementList.TotalPurchases}</td>
                                        <td>{accountStatementList.QWithdrawals}</td>
                                        <td>{accountStatementList.TotalWithdrawals}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
        </div>
    )
}
export default SubAccountStatement;