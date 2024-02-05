
import React, { useState, useEffect } from 'react';

export default function AuthCallback() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        const expiresIn = urlParams.get('expiresIn');

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('expiresIn', expiresIn);

        window.location.href = '/';

    }, []);

    return <div>Authenticating...</div>;
}