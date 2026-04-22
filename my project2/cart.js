document.addEventListener('DOMContentLoaded', function () {
    // Function to update cart count
    function updateCartCount() {
        let cartCount = 0;
        // Retrieve cart items from localStorage or an API
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartCount = cartItems.length;

        // Update cart count in the DOM
        document.getElementById('cart-count').textContent = cartCount;
    }

    // Call this function on page load to initialize the cart count
    updateCartCount();

    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            // Retrieve existing cart items
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Get product details (can be based on button data attributes or form inputs)
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productPrice = this.dataset.productPrice;

            // Add product to cart
            cartItems.push({
                id: productId,
                name: productName,
                price: productPrice
            });

            // Save updated cart items
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update cart count
            updateCartCount();
        });
    });
});