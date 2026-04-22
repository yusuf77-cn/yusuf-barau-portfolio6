document.querySelectorAll('.save-for-later').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.dataset.productId;
        fetch('/save-for-later', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        }).then(response => response.json())
            .then(data => {
                // Update the UI to reflect the saved status
                this.textContent = 'Saved';
            });
    });
});
