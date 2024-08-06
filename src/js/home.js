
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
     
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = './index.html';
    });
    
    const deleteButton = document.getElementById('delete');
    deleteButton.addEventListener('click', async () => {
        try {
            const res = await fetch('/api/auth/delete', {
                method: 'DELETE',
                headers: {'authorization': `${token}`}
            })
            if (res.ok) {
                alert('User has been deleted');
                localStorage.removeItem('token');
                setTimeout(() => window.location.href = './index.html', 3000);
            } else {
                alert("User doesn't exist or session invalid, please login again.")
            }
        } catch (error) {
            alert('Internal server error, please check backend.');
        }
    })
});


