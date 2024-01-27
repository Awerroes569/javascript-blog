'use strict';

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

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
    const targetArticle = document.getElementById(articleHref);//querySelector(`[href="${articleHref}"]`);
    console.log(targetArticle);


    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

}

function generateTitleLinks() {

    /* [DONE] remove contents of titleList */

    const liLinks = document.querySelectorAll(`.titles li`);
    for (let liLink of liLinks) {
        liLink.remove();
    }

    /* for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

generateTitleLinks();



