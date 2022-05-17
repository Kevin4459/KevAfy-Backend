const express = require('express');
const cors = require('cors');
const tracks = require("./src/db/tracks.json")
const playlist = require("./src/db/playlist.json")
const fs = require("fs");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors("*"))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send("Hello World!"))
app.get('/tracks', (req, res) => res.send(tracks))
app.get('/playlist/tracks', (req, res) => res.send(playlist))
app.post('/playlist/tracks', (req, res) => {
    const trackId = req.body.trackId;
    const track = tracks.find(track => track.id === trackId)
    const updatedPlaylist = [...playlist, track]
    fs.writeFileSync('./src/db/playlist.json', JSON.stringify(updatedPlaylist));
    res.send(updatedPlaylist)
})
app.delete(`/playlist/tracks/:id`, (req, res) => {
    const trackId = req.params.id;
    const result = playlist.filter(remove)
    function remove(track){
        return track.id !== trackId
    }
    fs.writeFileSync(`src/db/playlist.json`, JSON.stringify(updatedPlaylist));
    return res.status(204).send({});
  })
app.listen(PORT, () => console.log(`server now listening on port ${PORT}`))