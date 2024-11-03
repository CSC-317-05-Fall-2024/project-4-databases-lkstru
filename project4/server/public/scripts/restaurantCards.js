document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', function() {
      const card = this.closest('.restaurant-card');
      const restaurantId = card.dataset.id;  // use data-id

      fetch(`/api/restaurants/${restaurantId}`, {
          method: 'DELETE'
      }).then(response => {
          if (response.status === 204) {
              card.remove(); // delete cards
          } else {
              console.error('delete fail');
          }
      }).catch(error => {
          console.error('error:', error);
      });
  });
});

  function deleteRestaurantCard(event) {
    // get the card
    const card = event.target.closest('.restaurant-card');
  
    // DOM delet
    card.remove();
  }
  