// inactivity.js

// === Модалка "Вы здесь?" ===
let inactivityTimer = null;
const INACTIVITY_TIME = 120000; // 2 минуты

const inactivityModal = document.getElementById('modal-inactivity');
const inactivityYesBtn = document.getElementById('inactivity-yes');

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if (inactivityModal) {
        inactivityModal.classList.add('none');
        inactivityModal.classList.remove('div_temno');
    }
    inactivityTimer = setTimeout(showInactivityModal, INACTIVITY_TIME);
}

function showInactivityModal() {
    if (!inactivityModal) return;
    inactivityModal.classList.remove('none');
    inactivityModal.classList.add('div_temno');
}

if (inactivityYesBtn) {
    inactivityYesBtn.addEventListener('click', resetInactivityTimer);
}
if (inactivityModal) {
    inactivityModal.addEventListener('click', function(e) {
        if (e.target === inactivityModal) resetInactivityTimer();
    });
}

['click', 'mousemove', 'scroll', 'keydown', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer);
});

document.addEventListener('DOMContentLoaded', resetInactivityTimer);

// === Модалка "Нет интернета" (проверка через fetch) ===
const offlineModal = document.getElementById('modal-offline');
const offlineRetryBtn = document.getElementById('offline-retry');

let isOnline = true; // флаг нашего состояния

function showOfflineModal() {
    if (!offlineModal) return;
    offlineModal.classList.remove('none');
    offlineModal.classList.add('div_temno');
}

function hideOfflineModal() {
    if (!offlineModal) return;
    offlineModal.classList.add('none');
    offlineModal.classList.remove('div_temno');
}

// Проверка интернета через fetch
function checkInternet() {
    // Пытаемся загрузить маленький файл с быстрым таймаутом
    // Можно использовать https://www.google.com/favicon.ico или другой быстрый ресурс
    fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors', // чтобы не было CORS-ошибок
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
    .then(() => {
        // Если fetch успешен – интернет есть
        if (!isOnline) {
            isOnline = true;
            hideOfflineModal();
        }
    })
    .catch(() => {
        // Если ошибка – интернета нет
        if (isOnline) {
            isOnline = false;
            showOfflineModal();
        }
    });
}

// Проверяем каждые 5 секунд
setInterval(checkInternet, 5000);

// Проверяем сразу при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkInternet, 500);
});

// Кнопка "Да" – принудительно проверяет интернет и закрывает, если есть
if (offlineRetryBtn) {
    offlineRetryBtn.addEventListener('click', function() {
        // Сначала проверим интернет заново
        checkInternet();
        // Если после проверки isOnline === true, модалка закроется автоматически в checkInternet
        // Но если всё ещё офлайн, покажем предупреждение
        if (!isOnline) {
            alert('Интернет всё ещё отсутствует. Проверьте подключение.');
        }
    });
}

// Закрытие по клику на фон (только если онлайн)
if (offlineModal) {
    offlineModal.addEventListener('click', function(e) {
        if (e.target === offlineModal && isOnline) {
            hideOfflineModal();
        }
    });
}