## PDF API

#### In server.js file:

```javascript
const response = await axios.post('http://localhost:8055/upload', form, {
    headers: {
        ...form.getHeaders(),
        'Authorization': 'Bearer ornek_test_auth_token' 
    }
});
```

You must configure ``http://localhost:8055/upload`` and ``ornek_test_auth_token`` accordingly

## Then 

run the command:  ``npm i``
