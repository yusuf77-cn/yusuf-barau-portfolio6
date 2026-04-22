function updateCartSummary() {
    fetch('/cart-summary')
        .then(response => response.json())
        .then(data => {
            document.querySelector('.cart-icon .badge').textContent = data.itemCount;
        });
}
// Call this function on page load and whenever the cart is updated
updateCartSummary();
