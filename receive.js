const express = require('express');
const pdfParse = require('pdf-parse');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const port = 8055;


app.post('/upload', upload.single('file'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const dataBuffer = req.file.buffer;

        const pdfData = await pdfParse(dataBuffer);
        const foundMerhaba = pdfData.text.includes("merhaba");

        const result = foundMerhaba ? 100 : 101;

        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the PDF.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
