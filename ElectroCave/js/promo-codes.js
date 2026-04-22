// document.querySelector('#apply-coupon').addEventListener('click', function () {
//     const couponCode = document.querySelector('#coupon').value;
//     fetch('/apply-coupon', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ couponCode })
//     }).then(response => response.json())
//         .then(data => {
//             // Update the cart with the discount
//             document.querySelector('.discount').textContent = data.discountAmount;
//             document.querySelector('.cart-total').textContent = data.newTotal;
//         });
// });






document.querySelector('.btn-black').addEventListener('click', function() {
    const couponCode = document.querySelector('#coupon').value;
    
    // Example coupon validation
    if (couponCode === 'DISCOUNT10') {
      // Apply discount
      alert('Coupon applied!');
    } else {
      alert('Invalid coupon code.');
    }
  });
  