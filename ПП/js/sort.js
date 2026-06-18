const options = document.querySelector('.choice_sort');
const tovars = document.querySelectorAll('.product');
const shop_div = document.querySelector('.shop');
const tovar_img = document.querySelectorAll('.img_product');
const tovar_title = document.querySelectorAll('.title_product')

let array_normal = [];
let array_normal_zen = [];
let tovars_array = [];
let array_up = [];
let array_down = [];
let array_img = [];
let array_filt = [];
let array_normal_super = [];
let array_title = [];

tovars.forEach(tovar => {
    array_normal.push(tovar.textContent);
});

tovar_title.forEach(tovar => {
    array_title.push(tovar.textContent);
})

tovars.forEach(tovar => {
    array_normal_zen.push(tovar.getAttribute('price'));
});

tovars.forEach(tovar => {
    array_filt.push(tovar.getAttribute('filt'));
});

tovar_img.forEach(tovar =>{
    array_img.push(tovar.getAttribute('src'));
})

for (let i = 0; i < array_normal.length; i++) {
    tovars_array.push({text: array_title[i], zena: array_normal_zen[i], img: array_img[i], filt_sort: array_filt[i]},);
}

tovars_array.forEach(div => {
    array_normal_super.push(div);
});

tovars_array.sort((a, b) => a.zena - b.zena);
tovars_array.forEach(div => {
    array_up.push(div);
});

tovars_array.sort((a, b) => b.zena - a.zena);
tovars_array.forEach(div => {
    array_down.push(div);
});

options.addEventListener("change", () =>{
    if(options.value === "normal"){
        shop_div.innerHTML = ``;
        array_normal_super.forEach(p => {
            shop_div.innerHTML += `<div class="product" filt="${p.filt_sort}" price="${p.zena}">
                                        <div></div>
                                        <p class="title_product">${p.text}</p>
                                        <div></div>
                                        <p class="price_product">${p.zena} р.</p>
                                        <img class="img_product" src="${p.img}" alt="аппетитная корзинка с ветчиной и сыром">
                                        <img class="icon_basket" src="./img/basket.svg" alt="кнопка корзины">
                                    </div>`;
        });
    }
    else if(options.value === "up_price"){
        shop_div.innerHTML = ``;
        array_up.forEach(p => {
            shop_div.innerHTML += `<div class="product" filt="${p.filt_sort}" price="${p.zena}">
                                        <div></div>
                                        <p class="title_product">${p.text}</p>
                                        <div></div>
                                        <p class="price_product">${p.zena} р.</p>
                                        <img class="img_product" src="${p.img}" alt="аппетитная корзинка с ветчиной и сыром">
                                        <img class="icon_basket" src="./img/basket.svg" alt="кнопка корзины">
                                    </div>`;
        });
    }
    else if(options.value === "down_price"){
        shop_div.innerHTML = ``;
        array_down.forEach(p => {
            shop_div.innerHTML += `<div class="product" filt="${p.filt_sort}" price="${p.zena}">
                                        <div></div>
                                        <p class="title_product">${p.text}</p>
                                        <div></div>
                                        <p class="price_product">${p.zena} р.</p>
                                        <img class="img_product" src="${p.img}" alt="аппетитная корзинка с ветчиной и сыром">
                                        <img class="icon_basket" src="./img/basket.svg" alt="кнопка корзины">
                                    </div>`;
        });
    }
    filter();
    const currentTheme = localStorage.getItem('tema') ?? 'white';
    applyTheme(currentTheme);
});