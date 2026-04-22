(function () {
	'use strict';

	var tinyslider = function () {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();




	// 	var sitePlusMinus = function() {

	// 		var value,
	//     		quantity = document.getElementsByClassName('quantity-container');

	// 		function createBindings(quantityContainer) {
	// 	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	// 	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	// 	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	// 	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	// 	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	// 	    }

	// 	    function init() {
	// 	        for (var i = 0; i < quantity.length; i++ ) {
	// 						createBindings(quantity[i]);
	// 	        }
	// 	    };

	// 	    function increaseValue(event, quantityAmount) {
	// 	        value = parseInt(quantityAmount.value, 10);

	// 	        console.log(quantityAmount, quantityAmount.value);

	// 	        value = isNaN(value) ? 0 : value;
	// 	        value++;
	// 	        quantityAmount.value = value;
	// 	    }

	// 	    function decreaseValue(event, quantityAmount) {
	// 	        value = parseInt(quantityAmount.value, 10);

	// 	        value = isNaN(value) ? 0 : value;
	// 	        if (value > 0) value--;

	// 	        quantityAmount.value = value;
	// 	    }

	// 	    init();

	// 	};
	// 	sitePlusMinus();


	// })()






	var sitePlusMinus = function () {

		var value,
			quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
			var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
			var increase = quantityContainer.getElementsByClassName('increase')[0];
			var decrease = quantityContainer.getElementsByClassName('decrease')[0];
			var price = quantityContainer.closest('tr').querySelector('.product-price').textContent.replace('$', '');
			var totalCell = quantityContainer.closest('tr').querySelector('.product-total');

			increase.addEventListener('click', function (e) {
				increaseValue(e, quantityAmount, price, totalCell);
			});
			decrease.addEventListener('click', function (e) {
				decreaseValue(e, quantityAmount, price, totalCell);
			});
			quantityAmount.addEventListener('input', function (e) {
				updateTotal(quantityAmount.value, price, totalCell);
			});
		}

		function init() {
			for (var i = 0; i < quantity.length; i++) {
				createBindings(quantity[i]);
			}
			updateCartTotal();
		};

		function increaseValue(event, quantityAmount, price, totalCell) {
			value = parseInt(quantityAmount.value, 10);
			value = isNaN(value) ? 0 : value;
			value++;
			quantityAmount.value = value;
			updateTotal(value, price, totalCell);
		}

		function decreaseValue(event, quantityAmount, price, totalCell) {
			value = parseInt(quantityAmount.value, 10);
			value = isNaN(value) ? 0 : value;
			if (value > 1) value--;  // Prevent negative values
			quantityAmount.value = value;
			updateTotal(value, price, totalCell);
		}

		function updateTotal(quantity, price, totalCell) {
			let total = (quantity * parseFloat(price)).toFixed(2);
			totalCell.textContent = '$' + total;
			updateCartTotal();
		}

		function updateCartTotal() {
			let cartRows = document.querySelectorAll('.site-blocks-table tbody tr');
			let subtotal = 0;

			cartRows.forEach(function (row) {
				let totalCell = row.querySelector('.product-total').textContent.replace('$', '');
				subtotal += parseFloat(totalCell);
			});

			document.querySelector('.cart-subtotal').textContent = '$' + subtotal.toFixed(2);
			document.querySelector('.cart-total').textContent = '$' + subtotal.toFixed(2);
		}

		init();
	};
	sitePlusMinus();

	// Remove item functionality
	document.querySelectorAll('.product-remove a').forEach(function (button) {
		button.addEventListener('click', function (e) {
			e.preventDefault();
			if (confirm('Are you sure you want to remove this item?')) {
				button.closest('tr').remove();
				sitePlusMinus();  // Recalculate totals
			}
		});
	});

})();

document.querySelector('#coupon').addEventListener('input', function () {
	// Placeholder for coupon code validation
	// If valid, apply discount logic here
	// For example:
	let coupon = this.value;
	if (coupon === "DISCOUNT10") {
		// Apply a 10% discount
		let subtotal = parseFloat(document.querySelector('.cart-subtotal').textContent.replace('$', ''));
		let discount = subtotal * 0.10;
		let total = subtotal - discount;
		document.querySelector('.cart-total').textContent = '$' + total.toFixed(2);
	}
});

// Example of form validation for the support form
document.querySelector('.support-form').addEventListener('submit', function (e) {
	e.preventDefault();
	alert('Form submitted successfully!');
});
