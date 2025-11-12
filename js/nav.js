const buttons = document.querySelectorAll('.filter-buttons button'),
    checkBox = document.querySelector('.checkbox-show-hidden');

const DISPLAY_BLOCK = 'block';
const DISPLAY_NONE = 'none';
const VISIBLE_PRODUCT_OPACITY = '1';
const TRANSPARENT_PRODUCT_OPACITY = '0.5';

buttons.forEach(button => {
    button.addEventListener('click', handleNavButtonClick);
});

checkBox.addEventListener('click', handleCheckBoxCheck);

function showAll() {
    products.forEach(product => {
        checkVisibility(product)
    })
}

function showFavorite() {
    products.forEach(product => {
        if (isArrayContainsObject(favoriteProducts, product)) {
            checkVisibility(product)
        } else {
            setHidden(product)
        }
    })
}

function showCompared() {
    products.forEach(product => {
        if (isArrayContainsObject(compareProducts, product)) {
            checkVisibility(product)
        } else {
            setHidden(product)
        }
    })
}

function checkVisibility(product) {
    if (isCheckboxChecked()) {
        if (isArrayContainsObject(invisibleProducts, product)) {
            setTransparent(product)
        } else {
            setVisible(product)
        }
    } else {
        if (isArrayContainsObject(invisibleProducts, product)) {
            setHidden(product)
        } else {
            setVisible(product)
        }
    }
}

// function resolveGroupProductsToDisplay() {
//     let selectedButton;
//     buttons.forEach((button) => {
//         if (button.classList.contains('active')) {
//             selectedButton = button;
//         }
//     });
//     console.log(favoriteProducts)
//     console.log(invisibleProducts)
//     console.log(compareProducts)
//
//     if (selectedButton.classList.contains('show-favorites')) {
//         return products;
//     }
//
//     if (selectedButton.classList.contains('show-comparison')) {
//         return compareProducts;
//     }
//
//     return products;
// }
//
function handleNavButtonClick(event) {

}

function setVisible(product) {
    product.style.opacity = VISIBLE_PRODUCT_OPACITY;
    product.style.display = DISPLAY_BLOCK;
}

function setTransparent(product) {
    product.style.opacity = TRANSPARENT_PRODUCT_OPACITY;
    product.style.display = DISPLAY_BLOCK;
}

function setHidden(product) {
    product.style.display = DISPLAY_NONE;
}

function handleCheckBoxCheck() {
    // if (!checkBox.checked) {
    //     resolveGroupProductsToDisplay().forEach((product) => {
    //         if (isArrayContainsObject(invisibleProducts, product)) {
    //             product.classList.add('product-hidden');
    //         } else {
    //             product.classList.remove('product-hidden');
    //         }
    //     });
    // } else {
    //     resolveGroupProductsToDisplay().forEach((product) => {
    //         product.classList.remove('product-hidden');
    //     });
    // }
}

function isArrayContainsObject(arr, obj) {
    return arr.map(product => product.id).some(id => id === obj.id);
}

function isCheckboxChecked() {
    return checkBox.checked;
}