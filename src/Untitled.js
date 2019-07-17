const fs = require('fs');
const path = require('path');
const request = require('request');
const qs = require('querystring');
const homeHandler = (req, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>server Error</h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

const publicHandler = (req, response, url) => {
  const extension = url.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    jpg: 'image/jpg',
    png: 'image/png',
    ico: 'image/x-icon'
  };
  const filePath = path.join(__dirname, '..', url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>this is error message should be</h1>');
    } else {
      response.writeHead(200, { 'Content-Type': extensionType[extension] });
      response.end(file);
    }
  });
};
const searchHandler = (req, response, url) => {
  const artistName = url.split('?')[1];

  if (artistName == ' ') {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>this is error message should be</h1>');
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });

    request(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artistName}`,
      (error, res, body) => {
        const data = JSON.parse(body);
        if (!data.artists) {
          response.end('no data');
          return;
        }
        let idArtist = data.artists[0].idArtist;
        let strArtistBanner = data.artists[0].strArtistBanner;
        let strStyle = data.artists[0].strStyle;

        request(
          `https://www.theaudiodb.com/api/v1/json/195003/mvid.php?i=${idArtist}`,
          (error, res, body) => {
            const apiData = JSON.parse(body);
            const VideosArray = apiData.mvids;

            const arrayOfSongs = VideosArray.map(song => song.strMusicVid);
            const strTrack = VideosArray.map(song => song.strTrack);
            const obj = {
              bannerImg: strArtistBanner,
              strStyle: strStyle,
              arrayOfSongs: arrayOfSongs,
              strTrack: strTrack
            };
            response.end(JSON.stringify(obj));
          }
        );
      }
    );
  }
};

module.exports = { homeHandler, publicHandler, searchHandler };