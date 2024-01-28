'use strict';

{
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(optTitleListSelector + ' a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleHref = clickedElement.getAttribute('href').substr(1);
    console.log(articleHref);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.getElementById(articleHref);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const generateTitleLinks = () => {

    /* [DONE] remove contents of titleList */
    const liLinks = document.querySelectorAll(optTitleListSelector + ` li`);
    for (let liLink of liLinks) {
      liLink.remove();
    }

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleId:', articleId);

      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector);
      console.log('articleTitle:', articleTitle);

      /* [DONE] get the title from the title element */
      const articleTitleText = articleTitle.innerHTML;
      console.log('articleTitleText:', articleTitleText);

      /* [DONE] create HTML of the link */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitleText}</span></a></li>`;
      console.log('linkHTML:', linkHTML);

      /* [DONE] insert link into titleList */
      const titleList = document.querySelector(optTitleListSelector);    //DECLARATE HIGHER??
      titleList.insertAdjacentHTML(`beforeend`, linkHTML);
    }
  };

  const activateListeners = () => {
    const links = document.querySelectorAll(optTitleListSelector + ' a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  const removeTags = (id) => {
    const articleByID = document.getElementById(id);
    const tagList = articleByID.querySelectorAll(optArticleTagsSelector+' li');
    
    for (let tag of tagList) {
      tag.remove();
    }
    
  };
  
  const generateTags = () => {
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
      console.log(article.id);

      /* [DONE] find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      let articleTagsArray = [];
      if (articleTags) {
        console.log(articleTags);
        articleTagsArray = articleTags.split(' ');
      }

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log(tag);

        /* [DONE] generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
        html += linkHTML;

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }
  }; 
    
  generateTitleLinks();
  activateListeners();
  generateTags();

}