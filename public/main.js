document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        const productCode = form.querySelector('input[name="ProductCode"]').value.trim();
        const productName = form.querySelector('input[name="ProductName"]').value.trim();
        const productDate = form.querySelector('input[name="ProductDate"]').value;
        const productPrice = form.querySelector('input[name="ProductOriginPrice"]').value.trim();
        const quantity = form.querySelector('input[name="Quantity"]').value;
        const storeCode = form.querySelector('input[name="ProductStoreCode"]').value.trim();

        if (!productCode || !productName || !productDate || !productPrice || !quantity || !storeCode) {
            alert('All fields are required.');
            event.preventDefault(); // Prevent the form from submitting
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.btn-danger');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const confirmed = confirm('Are you sure you want to delete this product?');
            if (!confirmed) {
                event.preventDefault(); // Prevent the form submission if not confirmed
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.btn-danger');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const confirmed = confirm('Are you sure you want to delete this product?');
            if (!confirmed) return;

            const form = button.closest('form');
            const productId = form.action.split('/').slice(-2, -1)[0]; // Extract product ID from form action URL

            fetch(`/product/${productId}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    form.closest('tr').remove(); // Remove the row from the table
                } else {
                    alert('Failed to delete the product.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (!isValid) {
            event.preventDefault(); // Prevent the form submission
            alert('Please fill out all fields.');
        }
    });
});

