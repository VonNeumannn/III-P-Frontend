import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchHeaders } from '../constants';

function AccountStatements() {
    const navigate = useNavigate();
    const [accountStatmentList, setAccountStatementList] = useState([]);
    const { idStatement, cardCode } = useParams();

    const handleStatementSelection = (idStatement) => {
        navigate(`/master-account-movements/${idStatement}/${cardCode}`);
    }

    useEffect(() => {
        fetch('http://localhost:8080/masterAccountStatement', {
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
            <h1> Account Statements</h1>
             <Table className='mb-5' bordered  hover>
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                    <tr key={index} onClick={() => handleStatementSelection(accountStatementList.Id)}>
                                        <td>{accountStatementList.Id}</td>
                                        <td>{accountStatementList.BillingPeriod}</td>
                                        <td>{accountStatementList.MinPayment}</td>
                                        <td>{accountStatementList.StatementBalance}</td>
                                        <td>{accountStatementList.CurrentInterest}</td>
                                        <td>{accountStatementList.PenaltyInterest}</td>
                                        <td>{accountStatementList.QATMOperations}</td>
                                        <td>{accountStatementList.QBrandOperations}</td>
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