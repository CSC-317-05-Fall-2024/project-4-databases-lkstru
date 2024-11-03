import { pool } from '../../config/database.js';

// got all restaurant information
export async function getRestaurants() {
  try {
    const result = await pool.query('SELECT * FROM restaurants');
    return result.rows;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}

// get special id restaurant information
export async function getRestaurant(id) {
  try {
    const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching restaurant with id ${id}:`, error);
    throw error;
  }
}

// build new restaurant card
export async function createRestaurant(newRestaurant) {
  const { name, phone, address, photo } = newRestaurant;
  try {
    const result = await pool.query(
      'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, phone, address, photo]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
}

// deled id
export async function deleteRestaurant(id) {
  try {
    await pool.query('DELETE FROM restaurants WHERE id = $1', [id]);
    console.log(`Restaurant with id ${id} deleted successfully`);
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
}

// get review!!
export async function getReviewsForRestaurant(id) {
  try {
    const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id]);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching reviews for restaurant with id ${id}:`, error);
    throw error;
  }
}

