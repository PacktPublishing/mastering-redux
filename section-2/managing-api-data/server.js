const connect = require('connect');
const serveStatic = require('serve-static');
const http = require('http');
const cors = require('cors');

const app = connect();

app.use(cors());
app.use(serveStatic('.'));

app.use('/score', (req, res) => {
  const score = parseInt(Math.random() * 10, 10);
  setTimeout(() => res.end(JSON.stringify(score)), 250);
});

app.use('/result', (req, res) => {
  const result = {
    home: parseInt(Math.random() * 10, 10),
    away: parseInt(Math.random() * 10, 10)
  };
  setTimeout(() => res.end(JSON.stringify(result)), 1000);
});

http.createServer(app).listen(3000);
