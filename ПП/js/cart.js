function getCart() {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

let isCooking = false;
let cookingTimerInterval = null;
let cookingRemainingSeconds = 0;
let cookingTotalPrice = 0;

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
}

function addToCart(product) {
    if (isCooking) {
        alert('Идёт приготовление заказа, дождитесь окончания.');
        return false;
    }
    if (!isAuthenticated()) {
        alert('Для добавления товаров в корзину необходимо войти в аккаунт.');
        window.location.href = 'profil.html';
        return false;
    }
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCartCounter();
    showModal('Товар добавлен в корзину');
    return true;
}

function removeFromCart(index) {
    if (!isAuthenticated()) return;
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    updateCartCounter();
}

function clearCart() {
    if (!isAuthenticated()) return;
    saveCart([]);
    renderCart();
    updateCartCounter();
}

function updateCartCounter() {
    const counter = document.querySelector('.cart-counter');
    if (counter) {
        const cart = isAuthenticated() ? getCart() : [];
        counter.textContent = cart.length;
    }
}

function renderCart() {
    const container = document.querySelector('.basket_products-div');
    if (!container) return;

    if (!isAuthenticated()) {
        container.innerHTML = `<p class="empty-cart">Войдите, чтобы увидеть корзину</p>`;
        const priceSpan = document.querySelector('.price_basket');
        if (priceSpan) priceSpan.textContent = '0';
        return;
    }

    const cart = getCart();
    const priceSpan = document.querySelector('.price_basket');
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-cart">Корзина пуста</p>`;
        if (priceSpan) priceSpan.textContent = '0';
        return;
    }

    let html = `<div class="cart-products-grid">`;
    cart.forEach((item, index) => {
        total += Number(item.price);
        html += `
            <div class="product" filt="${item.filt || ''}" price="${item.price}">
                <div></div>
                <p class="title_product">${item.title}</p>
                <div></div>
                <p class="price_product">${item.price} р.</p>
                <img class="img_product" src="${item.img}" alt="${item.title}">
                <button class="cart-remove" data-index="${index}">✕</button>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
    if (priceSpan) priceSpan.textContent = total;

    container.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index);
            removeFromCart(idx);
        });
    });

    const currentTheme = localStorage.getItem('tema') || 'white';
    if (typeof applyTheme === 'function') {
        applyTheme(currentTheme);
    }
}

function startCooking() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    if (isCooking) {
        showCookingModal(cookingTotalPrice, cookingRemainingSeconds, cookingRemainingSeconds);
        return;
    }

    const totalPrice = getCartTotal();
    const baseTime = 5;
    const perItemTime = 5;
    const totalSeconds = baseTime + cart.length * perItemTime;

    cookingTotalPrice = totalPrice;
    cookingRemainingSeconds = totalSeconds;
    isCooking = true;

    showCookingModal(cookingTotalPrice, cookingRemainingSeconds, totalSeconds);

    if (cookingTimerInterval) clearInterval(cookingTimerInterval);
    cookingTimerInterval = setInterval(function() {
        cookingRemainingSeconds--;
        updateCookingTimer(cookingRemainingSeconds);

        if (cookingRemainingSeconds <= 0) {
            clearInterval(cookingTimerInterval);
            cookingTimerInterval = null;
            isCooking = false;
            showCookingComplete(cookingTotalPrice);
            clearCart();
            updateCartCounter();
            if (document.querySelector('.basket_products-div')) {
                renderCart();
            }
            cookingTotalPrice = 0;
            cookingRemainingSeconds = 0;
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    if (document.querySelector('.basket_products-div')) {
        renderCart();
    }
});