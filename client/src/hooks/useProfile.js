
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

export default function useProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('accessToken');

    const spotifyApi = new SpotifyWebApi({
        clientId: 'eafcddb12107467390a765e15f4e9e71',
        accessToken,
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (accessToken) {
                spotifyApi.getMe()
                    .then(response => {
                        setProfile(response.body);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('ERROR FETCHING PROFILE', error);
                    })
            }
        }

        fetchUserProfile();
    }, [accessToken]);

    return { profile, loading };
}