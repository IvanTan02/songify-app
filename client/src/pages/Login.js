import React from 'react';
import { Container, Box, Button } from '@mui/material';
import { AUTH_URL } from '../config/authUrl';

export default function Login() {
    return (
        <Container maxWidth='lg'>
            <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '80vh' }}
            >
                <h1>Login With Spotify</h1>
                <Button variant="contained" color='success' href={AUTH_URL} sx={{ px: 4, py: 1, fontSize: '1.2em' }}>Login</Button>
            </Box>
        </Container>
    );
}
