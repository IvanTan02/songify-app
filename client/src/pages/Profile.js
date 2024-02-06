
import React from "react";
import useProfile from "../hooks/useProfile";

// COMPONENTS
import Player from "../components/Player";

// MATERIAL UI
import { Avatar, Badge, Tooltip } from '@mui/material';
import { Box, Paper, Typography, Button } from "@mui/material";
import StarsIcon from '@mui/icons-material/Stars';

export default function Profile() {
    const { profile, loading } = useProfile();
    const isPremiumUser = profile?.product;

    const navigateToSpotifyProfile = () => {
        const profileUrl = profile?.external_urls.spotify;
        if (profileUrl) window.open(profileUrl, '_blank');
    }

    if (loading) return <div>Loading...</div>;

    return (
        <Box height='80vh' sx={{ mt: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Paper sx={{ width: '80%', p: 5, display: 'flex', alignItems: 'center' }}>

                    {/* PROFILE AVATAR */}
                    <Box>
                        {isPremiumUser ? (
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <Tooltip
                                        title="Premium User"
                                        slotProps={{
                                            popper: {
                                                modifiers: [
                                                    {
                                                        name: 'offset',
                                                        options: {
                                                            offset: [0, -8],
                                                        },
                                                    },
                                                ],
                                            },
                                        }}>
                                        <StarsIcon sx={{ color: 'yellow', backgroundColor: 'green', borderRadius: 3 }} />
                                    </Tooltip>
                                }
                            >
                                <Avatar src={profile.images[1].url} alt={profile.display_name} sx={{ height: 150, width: 150 }} />
                            </Badge>
                        ) : (
                            <Avatar src={profile.images[1].url} alt={profile.display_name} sx={{ height: 150, width: 150 }} />
                        )}
                    </Box>

                    {/* PROFILE DETAILS */}
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 4
                    }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {profile.display_name}
                        </Typography>
                        <Typography variant="h6">Email: {profile.email}</Typography>
                        <Typography variant="h6">Country: {profile.country}</Typography>
                        <Button color="success" variant="contained" onClick={navigateToSpotifyProfile} sx={{ width: 'fit-content', mt: 1, px: 2 }}>View Profile on Spotify</Button>
                    </Box>
                </Paper >
            </div >
        </Box >
    );
}