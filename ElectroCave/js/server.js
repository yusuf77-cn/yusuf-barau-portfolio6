const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Mock user data
const users = [];

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.json({ success: false, message: 'Invalid email or password.' });
    }
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(user => user.email === email)) {
        res.json({ success: false, message: 'Email already exists.' });
    } else {
        users.push({ name, email, password });
        res.json({ success: true, message: 'Signup successful!' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
