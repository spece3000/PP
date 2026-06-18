const all_inp = document.querySelectorAll(".input_shop");
const numbers_label = document.querySelectorAll('.numbers_list-item');
const searchInput = document.querySelector('.search_input');
const searchButton = document.querySelector('.navigation__list-item img[src="img/search.svg"]');

function filter() {
    const all_p = document.querySelectorAll(".product");
    const arr_inp = [];
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

    all_inp.forEach(inp => {
        if (inp.checked) {
            arr_inp.push(inp.getAttribute("filter"));
        }
    });

    all_p.forEach(p => p.style.display = "none");

    all_p.forEach(p => {
        const categoryMatch = arr_inp.length === 0 || arr_inp.includes(p.getAttribute('filt'));
        const titleElem = p.querySelector('.title_product');
        const title = titleElem ? titleElem.textContent.toLowerCase() : '';
        const searchMatch = title.includes(searchText);

        if (categoryMatch && searchMatch) {
            p.style.display = "grid";
        }
    });

    const firstRadio = document.querySelector('input[type="radio"][value="one"]');
    if (firstRadio) {
        firstRadio.checked = true;
    }
    pag();

    const all_p_grid = document.querySelectorAll('.product[style*="display: grid"]');
    const count = all_p_grid.length;

    numbers_label.forEach(label => {
        const forAttr = label.getAttribute('for');
        if (count < 10) {
            label.style.display = (forAttr === 'one') ? 'flex' : 'none';
        } else if (count < 19) {
            label.style.display = (forAttr === 'three') ? 'none' : 'flex';
        } else {
            label.style.display = 'flex';
        }
    });

    console.log('Найдено товаров:', count);
}

all_inp.forEach(inp => {
    inp.addEventListener("change", filter);
});

if (searchButton) {
    searchButton.addEventListener('click', filter);
}
