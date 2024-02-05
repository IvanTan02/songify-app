import React, { useState, useEffect } from "react";
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

import { Container, Box } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import Player from "../components/Player";
import TrackList from "../components/tracks/TrackList";
import Lyrics from "../components/tracks/Lyrics";

const spotifyApi = new SpotifyWebApi({
    clientId: 'eafcddb12107467390a765e15f4e9e71',
});

export default function Dashboard() {

    // const accessToken = useAuth(code);
    const accessToken = localStorage.getItem('accessToken');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [lyrics, setLyrics] = useState('');

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!searchQuery) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;

        spotifyApi.searchTracks(searchQuery)
            .then(response => {
                if (cancel) return;

                const results = response.body.tracks.items.map(track => {

                    const largestAlbumImg = track.album.images.reduce((largest, image) => {
                        if (image.height > largest.height) return image;
                        return largest;
                    }, track.album.images[0]);

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        album: track.album.name,
                        albumImage: largestAlbumImg.url,
                    }
                });

                setSearchResults(results);
            })

        return () => cancel = true;
    }, [searchQuery, accessToken]);

    useEffect(() => {
        if (!selectedTrack) return;
        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: selectedTrack.title,
                artist: selectedTrack.artist,
            }
        }).then(response => {
            const formattedLyrics = response.data.lyrics.replace(/\n/g, '<br>');
            setLyrics(formattedLyrics);
        })
    }, [selectedTrack])

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const chooseTrack = (track) => {
        setSelectedTrack(track);
        setSearchQuery('');
    }

    return (
        <Box height='80vh'>
            <Container maxWidth='xl'>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <FormControl sx={{ mt: 5, width: '90%' }} variant='outlined'>
                        <InputLabel htmlFor='outlined-adornment-password'>Search for Tracks</InputLabel>
                        <OutlinedInput
                            id='outlined-adornment-password'
                            type='text'
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.2, fontSize: '1.5em' }} />
                                </InputAdornment>
                            }
                            label='Search for Tracks'
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </div>
                <div>
                    {searchResults.length > 0 && <TrackList searchResults={searchResults} chooseTrack={chooseTrack} />}
                    {searchResults.length === 0 && <Lyrics lyrics={lyrics} />}
                </div>
            </Container>
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}>
                <Player accessToken={accessToken} trackUri={selectedTrack?.uri} />
            </Box>
        </Box >
    );
}
