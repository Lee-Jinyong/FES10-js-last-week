import '@/pages/login/login.css';
import { getNode, setDocumentTitle, getStorage, setStorage } from 'kind-tiger';
import pb from '@/api/pocketbase';
import gsap from 'gsap';

setDocumentTitle('29CM / 로그인');

const tl = gsap.timeline({
  defaults: {
    opacity: 0,
  },
});

tl.from('.container h1', { delay: 0.2, y: 30 })
  .from('.container hr', { scaleX: 0 })
  .from('form > *', { y: 30, stagger: 0.1 })
  .from('.register', { y: -30 }, '-=0.2');

const loginButton = getNode('.login');

function handleLogin(e) {
  e.preventDefault();
  console.log('clicked!');

  // const id = 'yjy1480@gmail.com';
  // const pw = 'qwertyui';

  const id = getNode('#idField').value;
  const pw = getNode('#pwField').value;

  pb.collection('users')
    .authWithPassword(id, pw)
    .then(
      async () => {
        const { model, token } = await getStorage('pocketbase_auth');

        setStorage('auth', {
          isAuth: !!model,
          user: model,
          token: token,
        });

        alert('로그인 완료! 메인페이지로 이동합니다.');
        location.href = '/index.html';
      },
      () => {
        alert('인증된 사용자가 아닙니다.');
      }
    );
}

loginButton.addEventListener('click', handleLogin);
