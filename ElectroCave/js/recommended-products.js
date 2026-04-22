fetch('/recommended-products')
    .then(response => response.json())
    .then(data => {
        // Display recommended products
        const recommendationsContainer = document.querySelector('.recommendations');
        data.products.forEach(product => {
            recommendationsContainer.innerHTML += `<div class="product">${product.name}</div>`;
        });
    });
