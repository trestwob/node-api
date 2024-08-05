document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = './index.html';
})

document.addEventListener('DOMContentLoaded', async () => {
    //stop access to this page unless a token is valid
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = './index.html'
    } else {
        const res = await fetch('/api/auth/verify', {
            headers: {'authorization': `${token}`}
        });
        if (res.false) {
            window.location.href = './index.html';
            localStorage.removeItem('token');
        }
    }
});
