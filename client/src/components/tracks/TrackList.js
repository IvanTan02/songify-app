import * as React from 'react';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Typography } from '@mui/material';
import Track from './Track';

export default function TrackList({ searchResults, chooseTrack }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TableContainer sx={{
                width: '100%', overflow: 'auto', mt: 3, maxHeight: '70vh',
                "&::-webkit-scrollbar": {
                    width: 8,
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "white"
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "lightgray",
                }
            }}>
                <Table stickyHeader sx={{ minWidth: '650' }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'lightblue' }}>
                            <TableCell align="center" sx={{ width: '5%' }}>
                                <Typography sx={{ fontSize: '1.2em', fontWeight: 'bold' }}>#</Typography>
                            </TableCell>
                            <TableCell align="left" sx={{ width: '60%' }}>
                                <Typography sx={{ fontSize: '1.2em', fontWeight: 'bold' }}>Title</Typography>
                            </TableCell>
                            <TableCell align="left" sx={{ width: '35%' }}>
                                <Typography sx={{ fontSize: '1.2em', fontWeight: 'bold' }}>Album</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((track, index) => (
                            <Track key={track.uri} index={index} track={track} chooseTrack={chooseTrack} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}