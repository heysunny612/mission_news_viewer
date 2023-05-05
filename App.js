// do something!

import { NewsList, Nav } from './components/index.js';

window.onload = async function () {
  const $newsListContainer = document.querySelector('.news-list-container');
  const $root = document.querySelector('#root');

  const proxyTargetObj = {
    category: 'all',
  };
  const proxyData = new Proxy(proxyTargetObj, {
    set: async function (target, property, value) {
      const newsListDOM = await NewsList(value);
      $newsListContainer.innerHTML = '';
      $newsListContainer.appendChild(newsListDOM);
    },
  });

  const $nav = Nav(proxyData);
  $root.insertBefore($nav, $newsListContainer);

  const newsListDOM = await NewsList(proxyData.category);
  $newsListContainer.appendChild(newsListDOM);
};
