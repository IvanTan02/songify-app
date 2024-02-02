
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TableRow, TableCell } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export default function Track({ index, track, chooseTrack }) {

    const [hovered, setHovered] = useState(false);

    const playTrack = () => {
        chooseTrack(track);
    }

    return (
        <TableRow
            key={track.uri}
            hover
            onClick={playTrack}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row" align="center" sx={{ width: '5%' }}>
                {hovered ? <PlayCircleIcon sx={{ fontSize: '2em' }} /> : <Typography sx={{ fontSize: '1.2em' }}>{index + 1}</Typography>}
            </TableCell>
            <TableCell align="left" sx={{ width: '60%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 60, height: 60, borderRadius: 1.5 }}
                        image={track.albumImage}
                        alt={track.title}
                    />
                    <Box sx={{ ml: 2 }}>
                        <Typography component="div" variant="h5" sx={{ fontSize: '1.4em' }}>
                            {track.title}
                        </Typography>
                        <Typography component="div" variant="subtitle1" sx={{ fontSize: '1em' }}>
                            {track.artist}
                        </Typography>
                    </Box>
                </Box>
            </TableCell>
            <TableCell align="left" sx={{ width: '35%' }}>
                <Typography component="div" variant="subtitle1" sx={{ fontSize: '1.2em' }}>
                    {track.album}
                </Typography>
            </TableCell>
        </TableRow>
    );
}