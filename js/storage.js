window.addEventListener('load', restoreStateFromLocalStorage)
document.querySelectorAll('.product-icon').forEach(icon => icon.addEventListener('click', saveStateToLocalStorage))

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
                product.querySelector(".visible-icon").setAttribute('data-value', 'off');
                invisibleProducts.push(product);
                product.style.opacity = '0.5';
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