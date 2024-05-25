const buttons = document.querySelectorAll(".store__category-button");

const  changeActiveBtn = (event) => {
  const target = event.target;

  buttons.forEach((button) => {
    button.classList.remove('store__category-button_active');
  });
  target.classList.add('store__category-button_active');
};

// const setCategory = (event) => {
//   const target = event.target;

//   buttons.forEach((button) => {
//     const category = '';
//     button.addEventListener('click', () => {
//       category = target.dataset.category;
//     });
//     return category;
//   });
// };

buttons.forEach((button) => {
  button.addEventListener('click', changeActiveBtn);
});

const API_URL = 'https://intriguing-diagnostic-skink.glitch.me';

const productList = document.querySelector('.store__list');

const createProductCart = (product) => {
  const productCart = document.createElement('li');
  productCart.classList.add('store__item');
  productCart.innerHTML = `
    <article class="store__product product">
      <img class="product__image" src="${API_URL}${product.photoUrl}" alt="${product.name}" width="388" height="261">

      <h3 class="product__title">${product.name}</h3>

      <p class="product__price">${product.price}&nbsp;₽</p>

      <button class="product_btn-add-cart btn btn_purple">Заказать</button>
    </article>
  `;

  return productCart;
};

const renderProducts = (products) => {
  productList.textContent = '';
  products.forEach((product) => {
    const productCart = createProductCart(product);

    productList.append(productCart);
  });
};

const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/category/${category}`,
    );
    
    if(!response.ok) {
      throw new Error(response.status);
    }

    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error(`Ошибка запроса товаров: ${error}`);
  }

};

fetchProductByCategory("Домики");
