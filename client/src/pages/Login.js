import React from 'react';
import { Container, Box, Button } from '@mui/material';

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=eafcddb12107467390a765e15f4e9e71&response_type=code&redirect_uri=http://localhost:3001/login&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

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
