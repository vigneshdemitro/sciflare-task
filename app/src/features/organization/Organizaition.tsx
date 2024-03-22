import { Box, Card, CardContent, CardMedia, Container, Grid, IconButton, Typography, capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import { get } from "../../api/ApiUtils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";

interface Organization {
    name: string,
    location: string,
    users: Array<any>,
};

export default function Organization() {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
        },
        {
            field: 'gender',
            headerName: 'Gender',
        },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'role',
            headerName: 'Role',
        }
    ];
    const navigate = useNavigate();
    const [organizations, setOrganization] = useState<Array<Organization>>([]);

    const fetchOrganizationDetails = async () => {
        const data = await get('/organizations', true);
        if (data) {
            setOrganization(data as Array<Organization>);
        }
    }

    useEffect(() => {
        const isAdmin = localStorage.getItem('role') === 'admin';
        if (!isAdmin) navigate('/login');
        if (isAdmin) fetchOrganizationDetails();
    }, []);

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 30, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Organization
                </Typography>
                {organizations && organizations.length > 0 && organizations.map(((organization, i) => (
                    <Card sx={{ display: 'flex', mb: 3 }} key={`org_${i}`}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {++i}. {organization.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {organization.location}
                                </Typography>
                            </CardContent>
                            <Typography variant="h6" component="div">
                                Users
                            </Typography>
                            {organization.users &&
                                organization.users.length > 0 &&
                                <Box sx={{ height: 300, width: '100%', p: 2 }}>
                                    <DataGrid
                                        columns={columns}
                                        rows={organization.users}
                                        getRowId={(row) => row.email}
                                        disableRowSelectionOnClick
                                        autoHeight
                                        autoPageSize
                                        columnBuffer={10}
                                        scrollbarSize={10}
                                    />
                                </Box>
                            }
                        </Box>
                    </Card>
                )))}
            </Box>
        </Container>

    );
}
