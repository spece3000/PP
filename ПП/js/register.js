const form = document.getElementById('register-form');
const errorEl = document.getElementById('reg-error');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const login = document.getElementById('reg-login').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const address = document.getElementById('reg-address').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-password-confirm').value;

    errorEl.textContent = '';

    if (!login) { errorEl.textContent = 'Введите логин'; return; }
    if (!email) { errorEl.textContent = 'Введите email'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = 'Введите корректный email';
        return;
    }
    if (!address) { errorEl.textContent = 'Введите адрес'; return; }
    if (password.length < 6) {
        errorEl.textContent = 'Пароль должен быть не менее 6 символов';
        return;
    }
    if (password !== confirm) {
        errorEl.textContent = 'Пароли не совпадают';
        return;
    }

    const user = { login, email, address, password };
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'profil.html';
});