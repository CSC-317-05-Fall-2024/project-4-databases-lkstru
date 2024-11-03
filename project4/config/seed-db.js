/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    console.log('Dropping tables...');
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
        console.log('Tables dropped successfully');
    } catch (error) {
        console.error('Error dropping tables:', error);
    }
};

const createTables = async () => {
    try {
        const createTableQuery = `
          CREATE TABLE restaurants (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            address VARCHAR(255) NOT NULL,
            photo VARCHAR(255) NOT NULL
          );

          CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            rating INTEGER NOT NULL,
            content TEXT NOT NULL,
            restaurant_id INTEGER NOT NULL,
            FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
          );
        `;
        await pool.query(createTableQuery);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

const insertData = async () => {
    try {
        const insertRestaurantsQuery = `
          INSERT INTO restaurants (name, phone, address, photo)
          VALUES 
          ('Mama', '(161) 392 7294', '42 Blossom Street, Ancoats, Manchester, M4 6BF', '/images/restaurant2.jpg'),
          ('Hawksmoor Manchester', '(161) 836 6980', '184-186 Deansgate, Manchester, M3 3WB', '/images/restaurant3.jpg'),
          ('The French by Simon Rogan', '(161) 235 4780', 'The Midland Hotel, Peter Street, Manchester, M60 2DS', '/images/restaurant4.jpg'),
          ('Dishoom Manchester', '(161) 537 3737', '32 Bridge Street, Manchester, M3 3BT', '/images/restaurant5.jpg'),
          ('El Gato Negro', '(161) 694 8585', '52 King Street, Manchester, M2 4LY', '/images/restaurant6.jpeg'),
          ('Rudy Neapolitan Pizza', '(161) 820 7920', '9 Cotton Street, Ancoats, Manchester, M4 5BF', '/images/restaurant1.jpg');
        `;
        await pool.query(insertRestaurantsQuery);

        const insertReviewsQuery = `
          INSERT INTO reviews (rating, content, restaurant_id)
          VALUES
          (5, 'Fantastic food and great service!', 1),
          (4, 'Delicious, but a bit pricey.', 1),
          (3, 'Good, but could be better.', 2),
          (5, 'Best steak I’ve had in ages!', 2),
          (4, 'Authentic and tasty pizza.', 6),
          (5, 'An experience worth having!', 3);
        `;
        await pool.query(insertReviewsQuery);

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

const setup = async () => {
    try {
        console.log('Starting setup');
        await dropTables();
        console.log('Tables dropped');
        await createTables();
        console.log('Tables created');
        await insertData();
        console.log('Data inserted');
        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Error during setup:', error);
    }
};

setup().catch(err => console.error('Error during setup:', err));
