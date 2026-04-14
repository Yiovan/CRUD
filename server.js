const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); // For PUT and DELETE forms

// Routes
const topicRoutes = require('./routes/topicRoutes');
app.use('/', topicRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
