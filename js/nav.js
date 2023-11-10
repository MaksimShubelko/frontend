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
            product.style.display = 'flex';
        });
    } else {
        productsGroup.forEach((product) => {
            if (isArrayContainsObject(invisibleProducts, product)) {
                product.style.display = 'none';
            } else {
                product.style.display = 'flex';
            }
        });
    }
    products.forEach((product) => {
        if (!isArrayContainsObject(productsGroup, product)) {
            product.style.display = 'none';
        }
    });
}

function handleCheckBoxCheck(event) {
    if (!checkBox.checked) {
        resolveGroupProductsToDisplay().forEach((product) => {
            if (isArrayContainsObject(invisibleProducts, product)) {
                product.style.display = 'none';
            } else {
                product.style.display = 'flex';
            }
        });
    } else {
        resolveGroupProductsToDisplay().forEach((product) => {
            product.style.display = 'flex';
        });
    }
}

function isArrayContainsObject(arr, obj) {
    return arr.includes(obj);
}

function isCheckboxChecked() {
    return checkBox.checked;
}