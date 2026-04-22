function login() {
    'use strict';

    // Toggle between Login and Signup forms
    function toggleForms() {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        loginBtn.addEventListener('click', () => {
            loginBtn.classList.add('active');
            signupBtn.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });

        signupBtn.addEventListener('click', () => {
            signupBtn.classList.add('active');
            loginBtn.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }

    // Handle Forgot Password modal
    function handleForgotPassword() {
        var forgotPasswordModal = document.getElementById('forgot-password-modal');
        var forgotPasswordLink = document.getElementById('forgot-password-link');
        var closeModal = forgotPasswordModal.querySelector('.close');

        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            forgotPasswordModal.style.display = 'block';
        });

        closeModal.addEventListener('click', function () {
            forgotPasswordModal.style.display = 'none';
        });
    }

    // Validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Display message
    function displayMessage(message, elementId) {
        document.getElementById(elementId).textContent = message;
    }

    // Handle login form submission
    function handleLoginForm() {
        document.getElementById('login').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!validateEmail(email)) {
                displayMessage('Invalid email address', 'login-message');
                return;
            }

            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
                .then(response => response.json())
                .then(data => {
                    displayMessage(data.message, 'login-message');
                    if (data.success) {
                        window.location.href = '/dashboard';
                    }
                });
        });
    }

    // Handle signup form submission
    function handleSignupForm() {
        document.getElementById('signup').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            // Validate email
            if (!validateEmail(email)) {
                displayMessage('Invalid email address', 'signup-message');
                return;
            }

            // Validate passwords
            if (password !== confirmPassword) {
                displayMessage('Passwords do not match', 'signup-message');
                return;
            }
            if (password.length > 12) {
                displayMessage('Password must not be more than 12 characters', 'signup-message');
                return;
            }

            // Check username uniqueness
            fetch('/check-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.unique) {
                        displayMessage('Username already exists', 'signup-message');
                        return;
                    }

                    // Proceed with signup
                    fetch('/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, email, password })
                    })
                        .then(response => response.json())
                        .then(data => {
                            displayMessage(data.message, 'signup-message');
                            if (data.success) {
                                window.location.href = '/login.html';
                            }
                        });
                });
        });
    }

    // Handle Forgot Password form submission
    function handleForgotPasswordForm() {
        document.getElementById('forgot-password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-password-email').value;

            if (!validateEmail(email)) {
                displayMessage('Invalid email address', 'forgot-password-message');
                return;
            }

            // Submit forgot password request
            fetch('/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
                .then(response => response.json())
                .then(data => {
                    displayMessage(data.message, 'forgot-password-message');
                });
        });
    }

    // Initialize all functionalities
    document.addEventListener('DOMContentLoaded', () => {
        toggleForms();
        handleForgotPassword();
        handleLoginForm();
        handleSignupForm();
        handleForgotPasswordForm();
    });
};
