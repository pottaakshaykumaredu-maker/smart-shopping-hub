const express = require('express');
const path = require('path');

const app = express();
const portArg = process.argv.indexOf('--port');
const port = portArg !== -1 ? process.argv[portArg + 1] : (process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', (req, res) => res.json({ success: true, message: 'Products retrieved' }));
app.post('/api/contact', (req, res) => res.json({ success: true, message: 'Inquiry received' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
