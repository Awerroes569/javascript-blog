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

    const articleHref = clickedElement.getAttribute('href');
    console.log(articleHref);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(`[href="${articleHref}"]`);
    console.log(targetArticle);


    /* add class 'active' to the correct article */

}
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

    function myFunction() {
        console.log("whats this", this);
    }


