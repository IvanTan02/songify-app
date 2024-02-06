
import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Grid } from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import SpotifyIcon from "../../assets/spotify-icon-black.png";
import useStats from "../../hooks/useStats";

// STYLES
const selectButtonStyle = {
    px: 4,
    py: 1,
};

export default function TopArtists() {

    const [timeRange, setTimeRange] = useState('short_term');
    const { topArtists } = useStats({ type: 'Artists', timeRange: timeRange });

    // RE-RENDER WHEN TIME RANGE CHANGES
    useEffect(() => { }, [timeRange]);

    const viewArtistOnSpotify = (artistUrl) => {
        if (artistUrl) window.open(artistUrl, '_blank');
    }

    const handleTimeRangeSelection = (event, timeRange) => {
        setTimeRange(timeRange);
    };

    return (
        <Box height='80vh' sx={{ mt: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    variant="h5"
                >
                    Top Artists
                </Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={timeRange}
                    exclusive
                    onChange={handleTimeRangeSelection}
                    aria-label="Select Time Range"
                    sx={{ my: 2 }}
                >
                    <ToggleButton value="short_term" sx={selectButtonStyle}>Last 4 Weeks</ToggleButton>
                    <ToggleButton value="medium_term" sx={selectButtonStyle}>Last 6 Months</ToggleButton>
                    <ToggleButton value="long_term" sx={selectButtonStyle}>All Time</ToggleButton>
                </ToggleButtonGroup>
                <Grid container columnSpacing={1} rowSpacing={2} width='90%' justifyContent='center'>
                    {topArtists?.map(artist => {
                        return (
                            <Grid item key={artist.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Card sx={{ width: 250 }}>
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image={artist?.images[0].url}
                                        title={artist?.name}
                                    />
                                    <CardContent sx={{ height: 100 }}>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                                            {artist?.name}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center', mt: -0.5 }}>
                                            Top Genre: {artist?.genres[0]?.charAt(0).toUpperCase() + artist?.genres[0]?.slice(1)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'center', mt: -3 }}>
                                        <IconButton
                                            onClick={() => { viewArtistOnSpotify(artist.external_urls.spotify) }}>
                                            <img src={SpotifyIcon} alt="Spotify Icon" sx={{ width: '50px', height: '50px' }} />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </Box>
    );
}