import { Box, Card, CardContent, CardMedia, Container, Typography, capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import { get } from "../../api/ApiUtils";

interface User {
    name: string,
    gender: string,
    email: string,
    image: string,
    role: string,
};

export default function Profile() {

    const [user, setUser] = useState({
        name: 'User',
        gender: 'Male',
        email: 'example@example.com',
        image: '',
        role: ''
    } as User);

    const fetchUserDetails = async () => {
        const isAdmin = localStorage.getItem('role') === 'admin';
        const userId = localStorage.getItem('userId');
        let url = '/users/user';
        if (isAdmin) url += `/${userId}`
        const data = await get(url, true);
        if (data){
            setUser(data as User);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 30, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Profile
                </Typography>
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {user.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {user.email}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {capitalize(user.gender)}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {capitalize(user.role)}
                            </Typography>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 220 }}
                        image={user.image || "https://dummyimage.com/300"}
                        alt="Live from space album cover"
                    />
                </Card>
            </Box>
        </Container>
    );
}
