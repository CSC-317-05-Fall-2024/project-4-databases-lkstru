// pick HTML  header, nav and footer element
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');

// header include cotent
header.innerHTML = `
  <h1>Manchester</h1>
`;

// NAV  direction
nav.innerHTML = `
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/attractions">Attractions</a></li>
    <li><a href="/restaurants">Restaurants</a></li>
    <li><a href="/newRestaurant">New Restaurant</a></li>
  </ul>
`;

// for footer
footer.innerHTML = `
  <p>&copy; 2024 My Website | All rights reserved.</p>
`;
