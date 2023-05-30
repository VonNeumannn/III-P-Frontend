import React from 'react';
import { useState } from 'react';
import { Button, Container, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// manages login views and logic
function Login() {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    // on submit
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            fetch('http://localhost:8080/login', {
                method: "POST",
                body: JSON.stringify({
                    "inUser": event.target.userName.value,
                    "inPassword": event.target.password.value,
                    "inPostUser": event.target.userName.value,
                    "inPostIp": localStorage.getItem("ip")
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
               .then((res) => res.json())
                .then((data) => {
                    if (data.access === 'Login Exitoso') {
                        localStorage.setItem("inPostUser", event.target.userName.value);
                        navigate('/accounts');
                    } else {
                        setShow(true);
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
               
            setValidated(false);
        } 
    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Alert className='text-center'
                            show={show}
                            variant='danger'
                            onClose={() => { setShow(false) }}
                            dismissible
                        >
                            Incorrect user or password.
                        </Alert>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold text-center mt-3 mb-5" >LOGIN</h2>
                                    <div className="mb-3">
                                        <Form
                                            noValidate
                                            validated={validated}
                                            onSubmit={handleSubmit}
                                        >
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Username
                                                </Form.Label>
                                                <Form.Control
                                                    name='userName'
                                                    type="text"
                                                    pattern='[a-zA-Z0-9]+'
                                                    placeholder="Enter username"
                                                    required
                                                />

                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    name='password'
                                                    type="password"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                >Login</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;