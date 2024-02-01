'use strict';

{
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';

  const titleClickHandler = function (event) {  
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!',clickedElement);

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

  const generateTitleLinks = (customSelector = '') => {

    /* [DONE] remove contents of titleList */
    const liLinks = document.querySelectorAll(optTitleListSelector + ` li`);
    for (let liLink of liLinks) {
      liLink.remove();
    }

    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector+customSelector);
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

  const tagClickHandler = (event) => {

    /* [DONE] prevent default action for this event */
    event.preventDefault();
    //event.stopPropagation();
    console.log('target: ', event.target);

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = event.target;
    console.log('clicked: ', clickedElement);

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag: ', tag);

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('handler tagow');

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {

      /* remove class active */
      activeTagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~=${tag}]`);
    activateListeners();
  };

  const addClickListenersToTags = () => {

    /* find all links to tags */
    const tagLinks = document.querySelectorAll(`${optArticleTagsSelector} a`);

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      console.log('tagLink: ', tagLink);

      /* END LOOP: for each link */
    }
  };
    
  generateTitleLinks();
  activateListeners();
  generateTags();
  addClickListenersToTags();

}