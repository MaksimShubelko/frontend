window.addEventListener('load', restoreStateFromLocalStorage)
document.querySelectorAll('.product-icon').forEach(icon => icon.addEventListener('click', saveStateToLocalStorage))
navSection = document.querySelector('.filter-area')

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
                if (!navSection.querySelector('.checkbox-show-hidden').checked) {
                    product.classList.add('product-hidden');
                }
                product.querySelector(".visible-icon").setAttribute('data-value', 'on');
                invisibleProducts.push(product);
                product.classList.add('product-transparent')

            }
        });

        state.liked.forEach(productId => {
            const product = document.getElementById(productId);
            if (product) {
                product.querySelector(".like-icon").setAttribute('data-value', 'on');
                favoriteProducts.push(product);
            }
        });

        state.comparative.forEach(productId => {
            const product = document.getElementById(productId);
            if (product) {
                product.querySelector(".compare-icon").setAttribute('data-value', 'on');
                compareProducts.push(product);
            }
        });
    }
}