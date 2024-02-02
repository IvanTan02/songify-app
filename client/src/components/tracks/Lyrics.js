
import { Box, Typography } from "@mui/material";

export default function Lyrics({ lyrics }) {
    return (
        <Box sx={{
            maxHeight: '70vh', overflow: 'auto', mt: 3,
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
            <Typography sx={{ textAlign: 'center' }}>
                <div dangerouslySetInnerHTML={{ __html: lyrics }} />
            </Typography>
        </Box>
    );
}
