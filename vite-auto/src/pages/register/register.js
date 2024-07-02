import '@/pages/register/register.css';
import { getNode as $ } from 'kind-tiger';
import pb from '@/api/pocketbase';
import gsap from 'gsap';

function register() {
  const idField = $('#idField');
  const pwField = $('#pwField');
  const next1 = $('.next-1');
  const next2 = $('.next-2');

  function validation(e) {
    const target = e.currentTarget;

    if (target.value.length > 5) {
      target.nextElementSibling.disabled = false;
    } else {
      target.nextElementSibling.disabled = true;
    }
  }

  idField.addEventListener('input', validation);
  pwField.addEventListener('input', validation);

  next1.addEventListener('click', () => {
    gsap.to('.wrapper', { x: -500 });
    gsap.to('.line > div', { width: '50%' });
  });

  next2.addEventListener('click', () => {
    const email = idField.value;
    const password = pwField.value;
    const passwordConfirm = password;

    pb.collection('users')
      .create({ email, password, passwordConfirm })
      .then(() => {
        alert('회원 가입이 완료됐습니다! 로그인 페이지로 이동합니다!');
        location.href = '/src/pages/login/';
      })
      .catch(() => {
        alert('동일한 이메일이 존재합니다.');
        gsap.to('.wrapper', { x: 0 });
        gsap.to('.line > div', { width: '0' });
        idField.value = '';
        pwField.value = '';
      });
  });
}

register();
