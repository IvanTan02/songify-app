
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

export default function useStats({ type = 'Artists', timeRange = 'short_term' }) {

    const accessToken = localStorage.getItem('accessToken');

    const [loading, setLoading] = useState(true);

    const [topArtists, setTopArtists] = useState(null);
    const [topTracks, setTopTracks] = useState(null);

    const spotifyApi = new SpotifyWebApi({
        clientId: 'eafcddb12107467390a765e15f4e9e71',
        accessToken,
    });

    useEffect(() => {
        const fetchUserTopArtists = () => {
            if (accessToken) {
                spotifyApi.getMyTopArtists({ time_range: timeRange, limit: 50 })
                    .then(response => {
                        //console.log(response.body.items);
                        setTopArtists(response.body.items);
                    })
                    .catch(error => {
                        console.error('ERROR FETCHING USER\'S TOP ARTISTS', error);
                    })
            }
        }
        switch (type) {
            case 'Artists':
                fetchUserTopArtists();
                break;
        }
    }, [accessToken, timeRange]);

    return { topArtists, topTracks }
}