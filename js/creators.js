// 出店者カードを data/creators.json から生成する
(() => {
  const JSON_PATH = 'data/creators.json';
  const grid = document.querySelector('.creator-grid');
  if (!grid) return;

  // ビジュアル部分:画像があれば画像、なければ頭文字
  const createVisual = (item) => {
    const visual = document.createElement('div');
    visual.className = `creator-visual visual-${item.visual || 'art'}`;

    const showInitial = () => {
      visual.classList.remove('has-image');
      visual.setAttribute('aria-hidden', 'true');
      visual.textContent = item.initial || '';
    };

    if (!item.image) {
      showInitial();
      return visual;
    }

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.imageAlt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', showInitial); // 画像が見つからなければ頭文字に戻す

    visual.classList.add('has-image');
    visual.append(img);
    return visual;
  };

  // カード1枚分のHTML要素を作る
  const createCard = (item, index) => {
    const article = document.createElement('article');
    article.className = 'creator-card reveal';

    const num = document.createElement('span');
    num.className = 'card-number';
    num.textContent = String(index + 1).padStart(2, '0'); // 1 → "01"

    const category = document.createElement('p');
    category.className = 'category';
    category.textContent = item.category || '';

    const h3 = document.createElement('h3');
    h3.append(item.role || '', document.createElement('br'), item.name || '');

    const desc = document.createElement('p');
    desc.textContent = item.description || '';

    const link = document.createElement('a');
    link.href = item.link || '#entry';
    link.innerHTML = '詳しく見る <span>→</span>';

    article.append(num, createVisual(item), category, h3, desc, link);
    return article;
  };

  // script.js の準備ができていればすぐ、まだなら完了を待ってアニメーション対象に登録
  const applyReveal = (cards) => {
    if (window.observeReveal) {
      window.observeReveal(cards);
    } else {
      document.addEventListener('reveal:ready', () => window.observeReveal(cards), { once: true });
    }
  };

  fetch(JSON_PATH, { cache: 'no-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const cards = data
        .filter((item) => item.published !== false)
        .map(createCard);
      grid.replaceChildren(...cards); // 成功したときだけ置き換える
      applyReveal(cards);
    })
    .catch((err) => {
      // 失敗時はHTMLに書かれた既存カードをそのまま表示する
      console.error('creators.json の読み込みに失敗しました:', err);
    });
})();