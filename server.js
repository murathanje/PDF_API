const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = 8045;

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        
        const dataBuffer = req.file.buffer;

        
        const form = new FormData();
        form.append('file', dataBuffer, req.file.originalname);

        // Send the form-data to another API
        const response = await axios.post('http://localhost:8055/upload', form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': 'Bearer ornek_test_auth_token' 
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the PDF.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
