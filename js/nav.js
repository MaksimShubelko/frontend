const buttons = document.querySelectorAll('.filter-buttons button'),
    checkBox = document.querySelector('.checkbox-show-hidden');

buttons.forEach(button => {
    button.addEventListener('click', handleNavButtonClick);
});

checkBox.addEventListener('click', handleCheckBoxCheck);

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

function isArrayContainsObject(arr, obj) {
    return arr.map(product => product.id).some(id => id === obj.id);
}

function isCheckboxChecked() {
    return checkBox.checked;
}