import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';
import '@/pages/product/product.css';
import gsap from 'gsap';
import {
  comma,
  getStorage,
  insertLast,
  setDocumentTitle,
  setStorage,
} from 'kind-tiger';
import defaultAuthData from '../../api/defaultAuthData';

setDocumentTitle('29CM / 상품목록');

if (!localStorage.getItem('auth')) {
  setStorage('auth', defaultAuthData);
}

async function renderProductItem() {
  const productData = await pb.collection('products').getFullList({
    sort: '-created',
  }); // SDK

  // const response = await tiger.get(
  //   `${import.meta.env.VITE_PB_API}/collections/products/records`
  // );
  // const productsData = response.data.items;

  const { isAuth } = await getStorage('auth');

  console.log(isAuth);

  productData.forEach((item) => {
    const discount = item.price * (item.ratio * 0.01);

    const template = `
      <li class="product-item">
        <div>
          <figure>
            <a href="${isAuth ? `/src/pages/detail/index.html?product=${item.id}` : '/src/pages/login/'}"></a>
            <img src="${getPbImageURL(item)}" alt="" />
          </figure>
          <span class="brand">${item.brand}</span>
          <span class="desc">${item.description}</span>
          <span class="price">${comma(item.price)}원</span>
          <div>
            <span class="discount">${comma(item.ratio)}%</span>
            <span class="real-price">${comma(item.price - discount)}원</span>
          </div>
        </div>
      </li>
    `;

    insertLast('.container > ul', template);
  });

  gsap.from('.product-item', { y: 30, opacity: 0, stagger: 0.1 });
}

renderProductItem();
