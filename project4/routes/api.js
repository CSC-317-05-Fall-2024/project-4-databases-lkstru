import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../server/data/restaurants.js';

const router = express.Router();

// get all restaurant
router.get('/restaurants', (req, res) => {
  res.json(getRestaurants());
});

// get special restaurant
router.get('/restaurants/:id', (req, res) => {
  const restaurant = getRestaurant(req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send('Restaurant not found');
  }
});

// add new restaurent
router.post('/restaurants', (req, res) => {
  const newRestaurant = createRestaurant(req.body);
  res.status(201).json(newRestaurant);
});

// delete restaurt
router.delete('/restaurants/:id', (req, res) => {
  deleteRestaurant(req.params.id);
  res.status(204).send();
});

export default router;
