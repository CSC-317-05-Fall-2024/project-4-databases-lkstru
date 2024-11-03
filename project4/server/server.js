import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant } from './data/restaurants.js'; // 加入 getReviewsForRestaurant 函數

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // detail JSON information

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
  res.render('attractions');
});

app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await getRestaurants();
    console.log(restaurants); // make sure is there corrct information
    res.render('restaurants', { restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).send('Error fetching restaurants');
  }
});

app.get('/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await getRestaurant(req.params.id);
    const reviews = await getReviewsForRestaurant(req.params.id); // add this to get reviews
    console.log(reviews); // make sure is there corrct reviews

    if (restaurant) {
      res.render('restaurant-details', { restaurant, reviews }); // pass information to platform
    } else {
      res.status(404).send('Restaurant not found');
    }
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).send('Error fetching restaurant');
  }
});



app.get('/newRestaurant', (req, res) => {
  res.render('newRestaurant'); // colar newRestaurant.ejs file
});

app.post('/newRestaurant', async (req, res) => {
  const { name, phone, address, photo } = req.body;
  if (!name || !phone || !address || !photo) {
    return res.status(400).send('All fields are required.');
  }
  
  try {
    const newRestaurant = await createRestaurant({ name, phone, address, photo });
    res.redirect('/restaurants');
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).send('Error creating restaurant');
  }
});

import apiRoutes from '../routes/api.js';
app.use('/api', apiRoutes); // setting '/api' pass API

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});