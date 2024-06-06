import { API_URL } from "./api";

const dataOrder = () => {
  const orderDate = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  };
  let days = 1;
  return orderDate(days).toLocaleDateString();
};

export const createOrderMessage = (id) => {
  const orderMessageElement = document.createElement('div');
  orderMessageElement.classList.add('order-message');

  const orderMessageText = document.createElement('p');
  orderMessageText.classList.add('order-message__text');
  orderMessageText.textContent = `Ваш заказ оформлен, номер ${id}. Вы можете его забрать завтра(${dataOrder()}) после 12:00 `;

  const orderMessageCloseButton = document.createElement('button');
  orderMessageCloseButton.classList.add('order-message__close-button');
  orderMessageCloseButton.textContent = 'Закрыть';

  orderMessageElement.append(orderMessageText, orderMessageCloseButton);

  orderMessageCloseButton.addEventListener('click', () => {
    orderMessageElement.remove();
  });
  return orderMessageElement;
};

const createProductCart = ({ id, photoUrl, name, price }) => {
  const productCart = document.createElement("li");
  productCart.classList.add("store__item");
  productCart.innerHTML = `
      <article class="store__product product">
        <img class="product__image" src="${API_URL}${photoUrl}" alt="${name}" width="388" height="261">
  
        <h3 class="product__title">${name}</h3>
  
        <p class="product__price">${price}&nbsp;₽</p>
  
        <button class="product_btn-add-cart btn btn_purple" data-id="${id}">Заказать</button>
      </article>
    `;

  return productCart;
};

export const renderProducts = (products, productList) => {
  productList.textContent = "";
  products.forEach((product) => {
    const productCart = createProductCart(product);

    productList.append(productCart);
  });
};

export const renderCartItems = (cartItemsList, cartItems, products) => {
  cartItemsList.textContent = '';

  products.forEach(({ id, photoUrl, name, price }) => {
    const cartItem = cartItems.find(item => item.id === id)
    if (!cartItem) {
      return;
    }

    const listItem = document.createElement('li');
    listItem.classList.add('modal__cart-item');
    listItem.innerHTML = `
      <img class="modal__cart-item-image" src="${API_URL}${photoUrl}" alt="${name}">

      <h3 class="modal__cart-item-title">${name}</h3>
      
      <div class="modal__cart-item-count">
        <button class="modal__btn modal__minus" data-id=${id}>-</button>
        <span class="modal__count">${cartItem.count}</span>
        <button class="modal__btn modal__plus" data-id=${id}>+</button>
      </div>

      <p class="modal__cart-item-price">${price * cartItem.count}&nbsp;₽</p>
    `;
    cartItemsList.append(listItem);
  });
};


