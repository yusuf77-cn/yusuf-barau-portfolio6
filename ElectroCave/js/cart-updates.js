// document.querySelectorAll('.quantity-container input').forEach(input => {
//     input.addEventListener('change', function () {
//         const quantity = this.value;
//         const productId = this.dataset.productId;
//         fetch('/update-cart', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ productId, quantity })
//         }).then(response => response.json())
//             .then(data => {
//                 // Update the cart totals on the page
//                 document.querySelector('.cart-total').textContent = data.newTotal;
//             });
//     });
// });




document.addEventListener('click', function(event) {
    if (event.target.classList.contains('increase') || event.target.classList.contains('decrease')) {
      const input = event.target.closest('div.input-group').querySelector('input');
      let quantity = parseInt(input.value, 10);
      
      if (event.target.classList.contains('increase')) {
        quantity++;
      } else if (event.target.classList.contains('decrease')) {
        quantity = Math.max(1, quantity - 1);
      }
      
      input.value = quantity;
      
      // Update cart total
      updateCartTotal();
    }
  });
  
  function updateCartTotal() {
    // Function to update cart totals
  }
  