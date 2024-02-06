
import React from "react";
import useStats from "../hooks/useStats";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box, Typography } from '@mui/material';

import TopArtists from '../components/stats/TopArtists';
import TopTracks from '../components/stats/TopTracks';

export default function Statistics() {

    //const { topArtists, topTracks } = useStats();
    const [alignment, setAlignment] = React.useState('Artists');

    const handleChange = (event, newAlignment) => {
        console.log(newAlignment);
        setAlignment(newAlignment);
    };

    const selectButtonStyle = {
        px: 4,
        py: 1,
    };

    let statsToRender;
    switch (alignment) {
        case 'Artists':
            statsToRender = <TopArtists />;
            break;
        case 'Tracks':
            statsToRender = <TopTracks />;
            break;
        case 'Genres':
            statsToRender = <h1>Genres</h1>;
            break;
        default:
            statsToRender = <></>;
    }

    return (
        <Box height='80vh' sx={{ mt: 7 }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography>Statistics</Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{ my: 2 }}
                >
                    <ToggleButton value="Artists" sx={selectButtonStyle}>Artists</ToggleButton>
                    <ToggleButton value="Tracks" sx={selectButtonStyle}>Tracks</ToggleButton>
                    <ToggleButton value="Genres" sx={selectButtonStyle}>Genres</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {statsToRender}
        </Box>
    );
}