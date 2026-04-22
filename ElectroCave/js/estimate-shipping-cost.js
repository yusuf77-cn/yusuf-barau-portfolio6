document.querySelector('#estimate-shipping').addEventListener('click', function () {
    const zipCode = document.querySelector('#shipping-zip').value;
    fetch('/estimate-shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode })
    }).then(response => response.json())
        .then(data => {
            // Update shipping cost display
            document.querySelector('.shipping-cost').textContent = data.shippingCost;
        });
});
