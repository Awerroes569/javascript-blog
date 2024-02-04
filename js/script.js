'use strict';

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };
  
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorListSelector = '.authors.list';

  const titleClickHandler = function (event) {  
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!',clickedElement);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(optTitleListSelector + ' a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleHref = clickedElement.getAttribute('href').substr(1);
    console.log(articleHref);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.getElementById(articleHref);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const generateTitleLinks = (customSelector = '') => {

    /* remove contents of titleList */
    const liLinks = document.querySelectorAll(optTitleListSelector + ` li`);
    for (let liLink of liLinks) {
      liLink.remove();
    }

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector+customSelector);
    for (let article of articles) {
        
      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleId:', articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector);
      console.log('articleTitle:', articleTitle);

      /* get the title from the title element */
      const articleTitleText = articleTitle.innerHTML;
      console.log('articleTitleText:', articleTitleText);

      /* create HTML of the link */
      //const linkHTML = `<li><a href="#${articleId}"><span>${articleTitleText}</span></a></li>`;
      const linkHTMLData = { id: articleId, title: articleTitleText };
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTML:', linkHTML);

      /* insert link into titleList */
      const titleList = document.querySelector(optTitleListSelector);
      titleList.insertAdjacentHTML(`beforeend`, linkHTML);
    }
  };

  const activateListeners = () => {
    const links = document.querySelectorAll(optTitleListSelector + ' a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  /* NOT USED */
  const removeTags = (id) => {
    const articleByID = document.getElementById(id);
    const tagList = articleByID.querySelectorAll(optArticleTagsSelector+' li');
    
    for (let tag of tagList) {
      tag.remove();
    }
    
  };
  
  const calculateTagsParams = (tags) => {
    let mini = Math.min(...Object.values(tags));
    console.log('mini:', mini);
    let maxi = Math.max(...Object.values(tags));
    console.log('maxi:', maxi);
    const params = { min: mini, max: maxi };
    return params;
  };
  
  const calculateTagClass = (count, params, maxNum = optCloudClassCount) => {
    let interval = (params.max - params.min) / maxNum;
    for (let i = 1; i <= maxNum; i++) {
      if (count <= params.min + (interval * i)) {
        return i;
      }
    }
  };

  /* NOT USED PREVIOUS VERSION OF generateTags FUNCTION*/
  const generateTags2 = () => {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    
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
        const linkHTMLData = { tag: tag };//, title: articleTitle };
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
        html += linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [DONE] clearing current list of tags */
    tagList.innerHTML = '';

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagSize = calculateTagClass(allTags[tag], tagsParams);
      allTagsHTML += `<li><a href="#tag-${tag}" class="` + optCloudClassPrefix + `${tagSize}">${tag}</a></li>`;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    console.log('allTagsHTML: ', allTagsHTML);
    tagList.innerHTML = allTagsHTML;

  };

  const generateTags = () => {

    /* create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      console.log('articleId: ',article.id);

      /* find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      console.log('tagWrapper: ', tagWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      let articleTagsArray = [];
      if (articleTags) {
        console.log('articleTags: ', articleTags);
        articleTagsArray = articleTags.split(' ');
      }

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag:',tag);

        /* [DONE] generate HTML of the link */
        const linkHTMLData = { tag: tag };
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log('linkHTM: ',linkHTML);

        /* add generated code to html variable */
        html += linkHTML;

        /* check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }

    /* find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* clearing current list of tags */
    tagList.innerHTML = '';

    /* create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    const allTagsData = { tags: [] };
    console.log('tagsParams:', tagsParams);

    /* START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    }
    /* END LOOP: for each tag in allTags: */

    /* adding tags from allTagsData to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

  };

  const tagClickHandler = (event) => {

    /* prevent default action for this event */
    event.preventDefault();
    console.log('target: ', event.target);

    /* make new constant named "clickedElement" */
    const clickedElement = event.target;
    console.log('clicked: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
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

  const authorClickHandler = (event) => {
    /* prevent default action for this event */
    event.preventDefault();
    console.log('AUTHOR target: ', event.target);

    /* make new constant named "clickedElement" */
    const clickedElement = event.target;
    console.log('AUTHOR clicked: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('AUTHOR href: ', href);

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '').replace('-', ' ');
    console.log('AUTHOR author: ', author);

    /* find all author links with class active*/
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log('AUTHOR handler authors');

    /* START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');
      console.log('AUTHOR activeAuthorLink: ', activeAuthorLink);

      /* END LOOP: for each active tag link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('AUTHOR authorLinks: ', authorLinks);

    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');
      console.log('AUTHOR authorLink now active: ', authorLink);

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-author="${author}"]`);
    activateListeners();
  };

  const destroyAuthors = () => {
    
    /* REMOVE AUTHORS FROM ARTICLES */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      authorWrapper.innerHTML = '';
    }

    /* REMOVE AUTHORS FROM RIGHT COLUMN */
    const authorList = document.querySelector(optAuthorListSelector);
    authorList.innerHTML = '';

  };

  /* NOT USED PREVIOUS VERSION OF generateAuthors FUNCTION*/
  const generateAuthors2 = () => {
    
    destroyAuthors();

    /* Create object to collect all authors */  
    const allAuthorLinks = {};
    
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
      console.log('GEN AUTHORS article',article.id);

      /* [DONE] find tags wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('GEN AUTH wrapper', authorWrapper);

      /* [DONE] make html variable with empty string */
      let html = 'by ';

      /* [DONE] get tags from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');
      const articleAuthorFormatted = articleAuthor.replace(' ', '-');

      /* [DONE] generate HTML of the link */
      const linkHTMLData = { formattedAuthor: articleAuthorFormatted, plainAuthor: articleAuthor };
      const linkHTML = templates.authorLink(linkHTMLData);
      console.log('GEN AUTH linkHTML: ', linkHTML);
      
      /* [NEW] check if this link is NOT already in allAuthorLinks */
      if (!allAuthorLinks[linkHTML]) {
        /* [NEW] add link to allAuthorLinks object */
        allAuthorLinks[linkHTML] = 1;
      } else {
        allAuthorLinks[linkHTML]++;
      }

      /* [DONE] add generated code to html variable */
      html += linkHTML;
      
      /* [DONE] insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;

      /* [DONE] END LOOP: for each tag */
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(optAuthorListSelector);

    //authorList.innerHTML = templates.authorCloudLink(allAuthorLinks);
    for (let author in allAuthorLinks) {
      let howmany = allAuthorLinks[author];
      authorList.innerHTML += `<li>${author} (${howmany})</li>`;
    }

  };

  const generateAuthors = () => {

    destroyAuthors();

    /* Create object to collect all authors */
    const allAuthorLinks = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      console.log('GEN AUTHORS article', article.id);

      /* find tags wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('GEN AUTH wrapper', authorWrapper);

      /* make html variable with empty string */
      let html = 'by ';

      /* get tags from data-tags attribute */
      const articleAuthor = article.getAttribute('data-author');
      const articleAuthorFormatted = articleAuthor.replace(' ', '-');

      /* generate HTML of the link */
      const linkHTMLData = { formattedAuthor: articleAuthorFormatted, plainAuthor: articleAuthor };
      const linkHTML = templates.authorLink(linkHTMLData);
      console.log('GEN AUTH linkHTML: ', linkHTML);

      /* check if this link is NOT already in allAuthorLinks */
      if (!allAuthorLinks[linkHTML]) { 
        /* add link to allAuthorLinks object */
        allAuthorLinks[linkHTML] = { name: articleAuthor, count: 1 };
      } else {
        allAuthorLinks[linkHTML].count++;
      }

      /* add generated code to html variable */
      html += linkHTML;

      /* insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;

      /* END LOOP: for each tag */
    }

    /* find list of authors in right column */
    const authorList = document.querySelector(optAuthorListSelector);

    /* new array for template */
    const authors = { authors: [] };
    console.log('allAuthorLinks: ', allAuthorLinks);
    for(let author in allAuthorLinks) {
      console.log('pushed  ', author);
      authors.authors.push(
        {
          author: author,
          name: allAuthorLinks[author].name,
          count: allAuthorLinks[author].count,
        });
    }

    authorList.innerHTML = templates.authorCloudLink(authors);

  };

  const addClickListenersToTags = () => {

    /* find all links to tags */
    const tagLinks = document.querySelectorAll(`${optArticleTagsSelector} a, ${optTagsListSelector} a`);

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      console.log('tagLink: ', tagLink);

      /* END LOOP: for each link */
    }
  };

  const addClickListenersToAuthors = () => {

    /* find all links to authors */
    const authorLinks = document.querySelectorAll(`${optArticleAuthorSelector} a, ${optAuthorListSelector} a`);

    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {

      /* add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      console.log('authorLink: ', authorLink);

      /* END LOOP: for each link */
    }
  };
    
  generateTitleLinks();
  activateListeners();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();

}