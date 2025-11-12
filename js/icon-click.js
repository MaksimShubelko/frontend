let products = document.querySelectorAll('.product'),
    navSection = document.querySelector('.filter-area');
let invisibleProducts = [], favoriteProducts = [], compareProducts = [];
const on = 'on'
const off = 'off'

products.forEach((productSection) => {
    const icons = productSection.querySelector('.product-icons');
    let visibleProductIcon = icons.querySelector('.visible-icon'),
        favoriteProductIcon = icons.querySelector('.like-icon'),
        compareProductIcon = icons.querySelector('.compare-icon');

    visibleProductIcon.addEventListener('click', handleClickVisibleProductIcon);
    favoriteProductIcon.addEventListener('click', handleClickFavoriteProductIcon);
    compareProductIcon.addEventListener('click', handleClickComparativeProduct);
});

function handleClickVisibleProductIcon(event) {
    const targetElement = event.target, productNode = targetElement.parentNode.parentNode
    if (targetElement.getAttribute('data-value') === off) {
        productNode.style.opacity = '0.5'
        invisibleProducts = removeFromArray(invisibleProducts, productNode);
    } else {
        if (!navSection.querySelector('.checkbox-show-hidden').checked) {
            productNode.style.opacity = '0'
        }
        productNode.style.opacity = '0.5'
        invisibleProducts.push(productNode);
    }
}

function handleClickFavoriteProductIcon(event) {
    const targetElement = event.target, productNode = targetElement.parentNode.parentNode
    if (targetElement.getAttribute('data-value') === off) {
        favoriteProducts = removeFromArray(favoriteProducts, productNode);
    } else {
        favoriteProducts.push(productNode);
    }
}

function handleClickComparativeProduct(event) {
    const targetElement = event.target, productNode = targetElement.parentNode.parentNode
    if (targetElement.getAttribute('data-value') === off) {
        compareProducts = removeFromArray(compareProducts, productNode);
    } else {
        compareProducts.push(productNode);
    }
}

function removeFromArray(array, obj) {
    return array.filter((product) => product !== obj);
}

function toggleIcon(icon) {
    if (icon.getAttribute('data-value') === off) {
        icon.setAttribute('data-value', on);
    } else {
        icon.setAttribute('data-value', off);
    }
}


