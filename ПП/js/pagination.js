const numbers = document.querySelectorAll('input[type="radio"]');
const shop = document.querySelector('.shop');

function pag(){
    let check = 'one';

    numbers.forEach(num => {
        if(num.checked){
            check = num.value;
        }
    });

    if(check === 'one'){
        shop.style.bottom = '0px';
    }
    else if(check === 'two'){
        shop.style.bottom = '760px';
    }
    else if(check === 'three'){
        shop.style.bottom = '1520px';
    }
}

numbers.forEach(num => {
    num.addEventListener("change", pag);
});