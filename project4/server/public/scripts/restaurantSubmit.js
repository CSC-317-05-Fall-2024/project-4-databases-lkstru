document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            photo: formData.get('photo'),
        };

        try {
            const response = await fetch('/newRestaurant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                window.location.href = '/restaurants'; // re direct to restarurant
            } else {
                console.error('Failed to create a new restaurant');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
