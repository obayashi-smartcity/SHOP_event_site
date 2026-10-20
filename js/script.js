'use strict';

// DOM読み込み後に各インタラクションを初期化
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.global-nav');
  const pageTop = document.querySelector('.page-top');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // スマートフォン用メニュー開閉
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', willOpen);
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'メニューを閉じる' : 'メニューを開く');
    document.body.classList.toggle('menu-open', willOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  // ページ内リンクのスムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

    // ページ内リンクのスムーズスクロール（後から追加されたリンクにも効くよう document で受ける）
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });

  // セクションの控えめな表示アニメーション
  let revealObserver = null;
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  }

  // 監視対象を追加する関数（creators.js からも使う）
  const observeReveal = (items) => {
    items.forEach((item) => {
      if (revealObserver) revealObserver.observe(item);
      else item.classList.add('is-visible');
    });
  };
  observeReveal(document.querySelectorAll('.reveal'));

  window.observeReveal = observeReveal;
  document.dispatchEvent(new Event('reveal:ready')); // 準備完了を知らせる
});
