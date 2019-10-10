const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

	/* remove class 'active' form all article links */
	const activeLinks = document.querySelectorAll('.titles a.active');

	for (let activeLink of activeLinks) {
		activeLink.classList.remove('active');
	}

    /* add class 'active' to the clicked link */
    
    clickedElement.classList.add('active')

    /* remove class 'active' form all article */
    const activeArticles = document.querySelectorAll('.post');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get href attribut form the clicked link */
    const articleSelector = clickedElement.getAttribute('href')

	/* find the correct article using the selector  (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);


    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
};




function generateTitleLinks() {
    const   optArticleSelector = ".post",
            optTitleSelector = ".post-title",
            optTitleListSelector = ".titles";

    /* Remove links of titlelist */

    document.querySelector(optTitleListSelector).innerHTML="";

    /* For each Article:
    - get the Article ID
    - find the title element
    - get the title form title element
    - create HTML of the link 
    - insert link into titleList
    */

    const articles = document.querySelectorAll(optArticleSelector)

    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        let li = document.createElement('li');
        li.innerHTML = "<a href='#"+articleId+"'><span>"+articleTitle+"</span></a>";
	    document.querySelector('.titles').appendChild(li);
    }

    const links = document.querySelectorAll('.titles a');
  
    
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

