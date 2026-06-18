const USER_KEY = 'user';

function getUser() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
}

function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function showProfile() {
    const user = getUser();
    const loginSpan = document.querySelector('.login');
    const emailSpan = document.querySelector('.email');
    const addressSpan = document.querySelector('.adress');
    const inviteBlock = document.querySelector('.auth-invite');
    const loginForm = document.querySelector('.login-form');
    const info = document.querySelector('.personal_information');
    const basket = document.querySelector('.basket');

    if (user) {
        if (loginSpan) loginSpan.textContent = user.login;
        if (emailSpan) emailSpan.textContent = user.email;
        if (addressSpan) addressSpan.textContent = user.address;
        if (info) info.style.display = 'flex';
        if (inviteBlock) inviteBlock.style.display = 'none';
        if (loginForm) loginForm.style.display = 'none';
        if (basket) basket.style.display = 'flex';
        if (typeof renderCart === 'function') renderCart();
    } else {
        if (info) info.style.display = 'none';
        if (loginForm) loginForm.style.display = 'none';
        if (basket) basket.style.display = 'none';
        if (!inviteBlock) {
            createAuthInvite();
        } else {
            inviteBlock.style.display = 'block';
        }
    }
}

function createAuthInvite() {
    const main = document.querySelector('.main_profil');
    const old = document.querySelector('.auth-invite');
    if (old) old.remove();

    const invite = document.createElement('section');
    invite.className = 'auth-invite';
    invite.innerHTML = `
        <p class="invite-text">Вы не авторизованы</p>
        <div class="invite-buttons">
            <a href="register.html" class="invite-btn register-btn">Зарегистрироваться</a>
            <button class="invite-btn login-btn" id="show-login">Войти</button>
        </div>
        <div class="login-form" style="display:none;">
            <h3>Вход</h3>
            <input type="text" id="login-username" placeholder="Логин">
            <input type="password" id="login-password" placeholder="Пароль">
            <button id="login-submit">Войти</button>
            <p id="login-error" class="error-message"></p>
            <button id="login-cancel" class="cancel-btn">Отмена</button>
        </div>
    `;
    const title = document.querySelector('.title_name');
    if (title) {
        title.after(invite);
    } else {
        main.prepend(invite);
    }

    document.getElementById('show-login').addEventListener('click', function() {
        document.querySelector('.invite-buttons').style.display = 'none';
        document.querySelector('.login-form').style.display = 'block';
    });

    document.getElementById('login-cancel').addEventListener('click', function() {
        document.querySelector('.login-form').style.display = 'none';
        document.querySelector('.invite-buttons').style.display = 'flex';
        document.getElementById('login-error').textContent = '';
    });

    document.getElementById('login-submit').addEventListener('click', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const error = document.getElementById('login-error');
        error.textContent = '';

        const user = getUser();
        if (!user) {
            error.textContent = 'Пользователь не найден. Зарегистрируйтесь.';
            return;
        }
        if (user.login !== username || user.password !== password) {
            error.textContent = 'Неверный логин или пароль';
            return;
        }
        showProfile();
    });
}

function setupCartButtons() {
    const resetBtn = document.querySelector('.reset');
    const submitBtn = document.querySelector('.submit');
    if (!isAuthenticated()) {
        if (resetBtn) resetBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'none';
        return;
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Очистить корзину?')) clearCart();
        });
    }
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            startCooking();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showProfile();
    setupCartButtons();
});