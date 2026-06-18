const div_modal = document.querySelector("#modal");
const close_modal = document.querySelector(".close_modal");
const modalContent = document.querySelector(".modal-content");

function showModal(message) {
    if (!div_modal) return;
    modalContent.innerHTML = `<p class="text_modal">${message}</p>`;
    div_modal.classList.remove('none');
    div_modal.classList.add('div_temno');
}

function showCookingModal(sum, remaining, total) {
    if (!div_modal) return;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    modalContent.innerHTML = `
        <div class="cooking-modal">
            <p class="cooking-sum">Сумма заказа: ${sum} р.</p>
            <p class="cooking-timer">Осталось времени: <span id="cooking-timer-display">${timeStr}</span></p>
            <p class="cooking-status">Идёт приготовление...</p>
        </div>
    `;
    div_modal.classList.remove('none');
    div_modal.classList.add('div_temno');
}

function updateCookingTimer(remaining) {
    const timerDisplay = document.getElementById('cooking-timer-display');
    if (timerDisplay) {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function showCookingComplete(sum) {
    modalContent.innerHTML = `
        <div class="cooking-modal">
            <p class="cooking-complete">Заказ готов! Приятного аппетита!</p>
            <p class="cooking-sum">Сумма заказа: ${sum} р.</p>
        </div>
    `;
}

function closeModal() {
    if (div_modal) {
        div_modal.classList.remove('div_temno');
        div_modal.classList.add('none');
    }
}

if (div_modal) {
    div_modal.addEventListener("click", (event) => {
        if (event.target === div_modal) closeModal();
    });
}
if (close_modal) {
    close_modal.addEventListener("click", closeModal);
}
document.addEventListener('click', function(e) {
    const basketIcon = e.target.closest('.icon_basket');
    if (!basketIcon) return;

    const productCard = basketIcon.closest('.product');
    if (!productCard) return;

    const title = productCard.querySelector('.title_product')?.textContent || 'Без названия';
    const price = productCard.getAttribute('price') || '0';
    const img = productCard.querySelector('.img_product')?.getAttribute('src') || '';
    const filt = productCard.getAttribute('filt') || '';

    addToCart({ title, price, img, filt });
});