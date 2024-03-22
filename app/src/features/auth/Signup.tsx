import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { get, post } from '../../api/ApiUtils';
import { useNavigate } from 'react-router';

interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    organizationId: string;
    role: 'user' | 'admin';
    gender: 'male' | 'female' | 'other';
}

const SignUpPage = () => {
    const initialValues: SignUpData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        organizationId: '',
        role: 'user',
        gender: 'male',
    };
    const navigate = useNavigate();
    const [organizations, setOrganizations] = useState([]);

    const validationSchema: Yup.Schema<SignUpData> = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
        organizationId: Yup.string().required('Organization ID is required'),
        role: Yup.string().oneOf(['admin', 'user']).required('Role is required'),
        gender: Yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
    });

    const handleSubmit = async (userDetails: SignUpData) => {
        console.log()
        const user = await post('auth/register', { ...userDetails });
        if (user && user.token) {
            navigate('/redirect')
        }
    };

    const fetchOrganizations = async () => {
        const data = await get('organizations');
        setOrganizations(data);
    };

    useEffect(() => {
        fetchOrganizations();
    }, [])

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange }) => (
                        <Form>
                            <TextField
                                label="Name"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="error"
                            />
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="error"
                            />
                            <TextField
                                type="password"
                                label="Password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="error"
                            />
                            <TextField
                                type="password"
                                label="Confirm Password"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="error"
                            />
                            <FormControl fullWidth variant="outlined" margin="normal" required>
                                <InputLabel id="organizationId-label">Organization</InputLabel>
                                <Select
                                    id="organizationId"
                                    name="organizationId"
                                    onChange={handleChange}
                                    label="Organization"
                                >
                                    {organizations && organizations.length > 0 && organizations.map((org, i) => (
                                        <MenuItem key={`org_${i}`} value={org['_id']}>{org['name']}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <ErrorMessage
                                name="organizationId"
                                component="div"
                                className="error"
                            />
                            <FormControl fullWidth variant="outlined" margin="normal" required>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    id="role"
                                    name="role"
                                    onChange={handleChange}
                                    label="Role"
                                >
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <ErrorMessage
                                name="role"
                                component="div"
                                className="error"
                            />
                            <FormControl fullWidth variant="outlined" margin="normal" required>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    id="gender"
                                    name="gender"
                                    onChange={handleChange}
                                    label="Gender"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <ErrorMessage
                                name="gender"
                                component="div"
                                className="error"
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        <Button variant='text' onClick={() => navigate('/login')}>Login</Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpPage;
