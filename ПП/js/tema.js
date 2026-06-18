const button_tema = document.querySelector(".button_sun");
const header = document.querySelector("header");
const main = document.querySelector("main");
const inp_header = document.querySelector('.search_input');
const select = document.querySelector('select');
const timer = document.querySelector("#custom-timer");
const pers_sect = document.querySelector(".personal_information");
const basket = document.querySelector('.basket');
const modal = document.querySelector('.modal_window');
const modal_button = document.querySelector('.close_modal');

let tema = localStorage.getItem('tema') ?? 'white';

function applyTheme(theme) {
    const isBlack = (theme === 'black');

    header.classList.toggle('header_dark', isBlack);
    main.classList.toggle('main_dark', isBlack);
    inp_header?.classList.toggle('header_li_dark', isBlack);
    select?.classList.toggle('select_dark', isBlack);
    timer?.classList.toggle('text_dark', isBlack);
    pers_sect?.classList.toggle('personal_information_dark', isBlack);
    basket?.classList.toggle('basket_dark', isBlack);
    modal?.classList.toggle('modal_dark', isBlack);
    modal_button?.classList.toggle('close_modal_dark', isBlack);

    document.querySelectorAll('.navigation__list-item').forEach(li => 
        li.classList.toggle('header_li_dark', isBlack)
    );
    document.querySelectorAll('p').forEach(p => 
        p.classList.toggle('text_dark', isBlack)
    );
    document.querySelectorAll('h1').forEach(h1 => 
        h1.classList.toggle('text_dark', isBlack)
    );
    document.querySelectorAll('.product').forEach(div => 
        div.classList.toggle('shop_dark', isBlack)
    );
    document.querySelectorAll('.numbers_list-item').forEach(num => 
        num.classList.toggle('numbers_list-item_dark', isBlack)
    );
    document.querySelectorAll('.numbers_list-item p').forEach(num => 
        num.classList.toggle('numbers_list-p_dark', isBlack)
    );
    document.querySelectorAll('.button').forEach(but => 
        but.classList.toggle('button_dark', isBlack)
    );
    document.querySelectorAll('.label__filter').forEach(label => 
        label.classList.toggle('label_dark', isBlack)
    );

    document.querySelectorAll('.icon_basket').forEach(icon => {
        icon.src = isBlack ? './img/basket_dark.svg' : './img/basket.svg';
    });
}

if (tema === 'black') {
    applyTheme('black');
}

button_tema.addEventListener("click", () => {
    const newTheme = (tema === 'white') ? 'black' : 'white';
    applyTheme(newTheme);
    tema = newTheme;
    localStorage.setItem('tema', tema);
});