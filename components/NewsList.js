const $newsListContainer = document.querySelector('.news-list-container');
let PAGE = 1;
let category = '';

// 데이터 통신하여 가져오기
const getNews = async (PAGE = 1, category) => {
  const API_KEY = '8975597d75ee4372b1329320c59dc51a';
  let pageSize = 5;
  const URL = `https://newsapi.org/v2/top-headlines?country=kr&category=${
    category === 'all' ? '' : category
  }&page=${PAGE}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(URL);
    const articles = response.data.articles;
    return await articles;
  } catch (error) {
    console.log(error);
  }
};

//스크롤 이벤트 셋
const setScrollObserver = ($scrollObserver) => {
  const callback = async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const newsList = await getNews(++PAGE, category);
        if (newsList.length > 0) {
          const newsListDOM = createNewsListDOM(newsList);
          $newsListContainer.appendChild(newsListDOM);
        }
        observer.unobserve(entry.target);
        entry.target.remove();
      }
    }
  };

  const observer = new IntersectionObserver(callback, { threshold: 1.0 });
  observer.observe($scrollObserver);
};

//옵저버 동적으로  생성
const createObserverDOM = () => {
  const $scrollObserver = document.createElement('div');
  $scrollObserver.className = 'scroll-observer';
  const $observerImg = document.createElement('img');
  $observerImg.src = './img/ball-triangle.svg';
  $observerImg.alt = 'Loading...';
  $scrollObserver.appendChild($observerImg);
  return $scrollObserver;
};

// DOM에 뉴스리스트 생성
const createNewsListDOM = (newsList) => {
  const $newsList = document.createElement('article');
  $newsList.className = 'news-list';
  $newsListContainer.appendChild($newsList);
  newsList.forEach((news) => {
    const { title, description, url, urlToImage } = news;
    const $newsItem = document.createElement('section');
    $newsItem.className = 'news-item';
    $newsItem.innerHTML = `
      <div class="thumbnail">
        <a href="${url}" target="_blank" rel="noopener noreferrer"><img src="${
      urlToImage
        ? urlToImage
        : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
    }" alt="thumbnail" /></a>
      </div>
      <div class="contents">
        <h2><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></h2>
        <p>${description ? description : ''}</p>
      </div>
      `;
    $newsList.appendChild($newsItem);
  });
  const $scrollObserver = createObserverDOM();
  $newsList.appendChild($scrollObserver);
  setScrollObserver($scrollObserver);

  return $newsList;
};

//로드 뉴스
const NewsList = async (category) => {
  const newsList = await getNews(PAGE, category);
  const newsListDOM = createNewsListDOM(newsList);
  return newsListDOM;
};

export default NewsList;
