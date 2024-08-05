document.addEventListener('DOMContentLoaded', async () => {
    
    //verify user
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const res = await fetch('/api/auth/verify', {
                headers: {'authorization': `${token}`}
            });
            if (res.ok) {
                window.location.href = './home.html';
            } else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error verifying token: ', error);
            localStorage.removeItem('token');
        }
    }


    //registration
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (event)  => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('/api/auth/registration', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            })
            if (res.ok) {
                alert('Regsitration Successfull');
            } else {
                alert('Registration failed in index');
            }

        } catch (error) {
            console.error(`Error: ${error}`)
        }
    });

    //login 
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });
            if (res.ok) {
                const {token} = await res.json();
                localStorage.setItem('token', token);
                alert('Login SuccessFull');
                window.location.href = '/home.html';
            } else {
                alert('Login unsuccessfull');
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    });
});
