import React, { FormEvent } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { post } from '../../api/ApiUtils';
import { useNavigate } from 'react-router';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values: LoginFormValues) => {
        const data = await post('auth/login', { ...values });
        if (data) {
            navigate('/redirect');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ handleChange }) => (
                        <Form>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                label='Email'
                                    type="email"
                                    id="email"
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="error"
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <TextField
                                label='Password'
                                    type="password"
                                    id="password"
                                    name="password"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error"
                                />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Login
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        <Button variant='text' onClick={() => navigate('/signup')}>Sign Up</Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
