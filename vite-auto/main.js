import getPbImageURL from '@/api/getPbImageURL';
import pb from '@/api/pocketbase';
import gsap from 'gsap';
import { getNode, getStorage, insertLast, setStorage } from 'kind-tiger';
import '/src/styles/global.css';
import defaultAuthData from './src/api/defaultAuthData';

const tl = gsap.timeline({
  defaults: {
    opacity: 0,
  },
});

tl.from('.visual', { delay: 0.3, opacity: 0, y: 30 });
tl.from('h2 > span', { opacity: 0, x: -30 });

async function logout() {
  if (localStorage.getItem('auth')) {
    const { isAuth, user } = await getStorage('auth');

    console.log(isAuth);

    if (isAuth) {
      const template = `
        <div class="thumbnail">
          <img src="${getPbImageURL(user, 'avatar')}" alt="" />
        </div>
        <div class="username">${user.name}님 반갑습니다!</div>
        <button type="button" class="logout">로그아웃</button>
      `;

      insertLast('.container', template);

      const logout = getNode('.logout');

      function handleLogout() {
        if (confirm('정말 로그아웃 하실겁니까?')) {
          pb.authStore.clear();
          // deleteStorage('auth');
          setStorage('auth', defaultAuthData);
          location.reload();
        }
      }

      logout.addEventListener('click', handleLogout);
    }
  }
}

logout();
