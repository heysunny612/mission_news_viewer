const Nav = (proxyData) => {
  const $nav = document.createElement('nav');
  $nav.className = 'category-list';

  $nav.innerHTML = `
    <ul>
       <li id="all" class="category-item active">전체보기</li>
       <li id="business" class="category-item">비즈니스</li>
       <li id="entertainment" class="category-item">엔터테인먼트</li>
       <li id="health" class="category-item">건강</li>
       <li id="science" class="category-item">과학</li>
       <li id="sports" class="category-item">스포츠</li>
       <li id="technology" class="category-item">기술</li>
    </ul>  
  `;
  $nav.addEventListener('click', (event) => {
    if (!(event.target.tagName === 'LI')) return;
    const $categoryItems = [...event.currentTarget.children[0].children];
    $categoryItems.forEach((item) => item.classList?.remove('active'));
    event.target.classList.add('active');
    proxyData.category = event.target.id;
  });

  return $nav;
};

export default Nav;
