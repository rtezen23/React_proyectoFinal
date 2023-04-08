import axios from 'axios';
import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const submit = data => {
        axios.post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.data.token)
                navigate('/')
                alert('Succesfully logged in');
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status === 404 || error.response.status === 401) {
                    alert('Wrong credentials');
                }
            })
        console.log(data);
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Test data (Only for testing)</Popover.Header>
            <Popover.Body>
                <p><b>Email:</b> mason@gmail.com</p>
                <p> <strong>Password:</strong> mason1234</p>
            </Popover.Body>
        </Popover>
    );

    const Example = () => (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="success">Check test data</Button>
        </OverlayTrigger>
    );

    return (
        <>
            <Container>
                <Example />
            </Container>
            <div className='mt-5'>
                <Form onSubmit={handleSubmit(submit)} className='ec-email-form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control {...register('email')} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register('password')} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Login;