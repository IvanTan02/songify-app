const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('HELLO');
});

app.get('/login', (req, res) => {

    const { code } = req.query;
    const clientRedirect = 'http://localhost:3000/login';

    const spotifyApi = new SpotifyWebApi({
        clientId: 'eafcddb12107467390a765e15f4e9e71',
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: 'http://localhost:3001/login',
    });

    console.log('Hello2');
    spotifyApi.authorizationCodeGrant(code).then(
        (data) => {
            console.log(data.body);
            // res.json({
            //     accessToken: data.body.access_token,
            //     refreshToken: data.body.refresh_token,
            //     expiresIn: data.body.expires_in,
            // });
            res.redirect(`${clientRedirect}?accessToken=${data.body.access_token}&refreshToken=${data.body.refresh_token}&expiresIn=${data.body.expires_in}`);

        }).catch((error) => {
            console.error('LOGIN ERROR', error);
            res.sendStatus(500);
        })
});

app.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;

    const spotifyApi = new SpotifyWebApi({
        clientId: 'eafcddb12107467390a765e15f4e9e71',
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: 'http://localhost:3000',
        refreshToken
    });

    spotifyApi.refreshAccessToken().then(
        (data) => {
            console.log('The access token has been refreshed.');
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            });
        }
    ).catch((error) => {
        console.error('REFRESH ERROR', error);
        res.sendStatus(500);
    });
});

app.get('/lyrics', async (req, res) => {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${req.query.artist}/${req.query.track}`);
    if (response.status === 200) {
        const data = response.data.lyrics;
        let lines = data.split('\n');
        lines.splice(0, 1);
        const lyrics = lines.join('\n');
        res.json({ lyrics: lyrics });
    } else {
        res.json({ lyrics: 'No Lyrics Found.' });
    }
})

app.listen(3001, () => console.log('App listening on port 3001.'));