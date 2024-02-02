import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {

    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri]);

    if (!accessToken) return null;

    return (
        // <Container fixed>
        //     <Box sx={{ backgroundColor: 'black' }}>
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon={true}
            callback={state => {
                if (!state.isPlaying) setPlay(false);
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
            styles={{
                bgColor: '#000000',
                trackNameColor: 'white',
                trackArtistColor: 'white',
                color: 'white',
                sliderColor: 'blue',
                sliderHandleColor: 'white',
            }}
        />
        //     </Box>
        // </Container>
    );

}