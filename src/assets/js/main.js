let products
let invisibleProducts = []
let favoriteProducts = []
let compareProducts = []
let buttons = document.querySelectorAll('.filters__buttons button'),
    checkBox = document.querySelector('.filters__checkbox-input'),
    navSection = document.querySelector('.filters')
const favouriteProductIconClass = '.like-icon', comparativeProductIconClass = '.compare-icon'
document.querySelectorAll('.product__icon').forEach(icon => icon.addEventListener('click', saveStateToLocalStorage))

const on = 'on'
const off = 'off'

function loadProductStates() {
    products = document.querySelectorAll('.product')
    navSection = document.querySelector('.filters')

    products.forEach((productSection) => {
        const icons = productSection.querySelector('.product__icons');
        let visibleProductIcon = icons.querySelector('.visible-icon'),
            favoriteProductIcon = icons.querySelector('.like-icon'),
            compareProductIcon = icons.querySelector('.compare-icon');

        visibleProductIcon.addEventListener('click', handleClickVisibleProductIcon);
        favoriteProductIcon.addEventListener('click', event => {
            favoriteProducts = handleClickFavoriteOrComparativeProductIcon(event, favoriteProducts)
        });
        compareProductIcon.addEventListener('click', event => {
            compareProducts = handleClickFavoriteOrComparativeProductIcon(event, compareProducts)
        });
    });
}

function handleClickVisibleProductIcon(event) {
    const targetElement = event.target, productNode = targetElement.parentNode.parentNode
    if (targetElement.getAttribute('data-value') === off) {
        productNode.classList.remove('product-transparent')
        invisibleProducts = removeFromArray(invisibleProducts, productNode);
    } else {
        if (!navSection.querySelector('.filters__checkbox-input').checked) {
            productNode.classList.add('product-hidden');
        }
        productNode.classList.add('product-transparent')
        invisibleProducts.push(productNode);
    }
}

function handleClickFavoriteOrComparativeProductIcon(event, products) {
    const targetElement = event.target, productNode = targetElement.parentNode.parentNode
    if (targetElement.getAttribute('data-value') === off) {
        return removeFromArray(products, productNode);
    } else {
        products.push(productNode);
        return products;
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


function addEventListenersToNavComponents() {
    buttons = document.querySelectorAll('.filters__buttons button')
    checkBox = document.querySelector('.filters__checkbox-input')

    buttons.forEach(button => {
        button.addEventListener('click', handleNavButtonClick);
    });
    checkBox.addEventListener('click', handleCheckBoxCheck);
}

function handleNavButtonClick(event) {
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    let productsGroup = resolveGroupProductsToDisplay();
    if (isCheckboxChecked()) {
        productsGroup.forEach((product) => {
            product.classList.remove('product-hidden');
        });
    } else {
        productsGroup.forEach((product) => {
            if (isArrayContainsObject(invisibleProducts, product)) {
                product.classList.add('product-hidden');
            } else {
                product.classList.remove('product-hidden');
            }
        });
    }
    products.forEach((product) => {
        if (!isArrayContainsObject(Array.from(productsGroup), product)) {
            product.classList.add('product-hidden');
        }
    });
}

function handleCheckBoxCheck() {
    if (!checkBox.checked) {
        resolveGroupProductsToDisplay().forEach((product) => {
            if (isArrayContainsObject(invisibleProducts, product)) {
                product.classList.add('product-hidden');
            } else {
                product.classList.remove('product-hidden');
            }
        });
    } else {
        resolveGroupProductsToDisplay().forEach((product) => {
            product.classList.remove('product-hidden');
        });
    }
}

function resolveGroupProductsToDisplay() {
    let selectedButton;
    buttons.forEach((button) => {
        if (button.classList.contains('active')) {
            selectedButton = button;
        }
    });

    if (selectedButton.classList.contains('show-favorites')) {
        return favoriteProducts;
    }

    if (selectedButton.classList.contains('show-comparison')) {
        return compareProducts;
    }

    return products;
}

function isArrayContainsObject(arr, obj) {
    return arr.map(product => product.id).some(id => id === obj.id);
}

function isCheckboxChecked() {
    return checkBox.checked;
}

function saveStateToLocalStorage() {
    const state = {
        hidden: invisibleProducts.map(product => product.id),
        liked: favoriteProducts.map(product => product.id),
        comparative: compareProducts.map(product => product.id)
    };

    localStorage.setItem('productState', JSON.stringify(state));
}

function restoreStateFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem('productState'));

    if (state) {
        state.hidden.forEach(productId => {
            const product = document.getElementById(productId);
            if (product) {
                if (!navSection.querySelector('.filters__checkbox-input').checked) {
                    product.classList.add('product-hidden');
                }
                product.querySelector(".visible-icon").setAttribute('data-value', 'on');
                invisibleProducts.push(product);
                product.classList.add('product-transparent')

            }
        });

        favoriteProducts = restoreStateForProducts(state.liked, favouriteProductIconClass, favoriteProducts);
        compareProducts = restoreStateForProducts(state.comparative, comparativeProductIconClass, compareProducts);
    }
}

function restoreStateForProducts(productIds, iconClass, productsArray) {
    productIds.forEach(productId => {
        const product = document.getElementById(productId);
        if (product) {
            product.querySelector(iconClass).setAttribute('data-value', 'on');
            productsArray.push(product);
        }
    });
    return productsArray;
}

document.addEventListener("DOMContentLoaded", function () {
    restoreStateFromLocalStorage();
    loadProductStates();
    addEventListenersToNavComponents();
});