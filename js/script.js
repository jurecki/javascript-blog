const titleClickHandler = function(event) {
	event.preventDefault();
	const clickedElement = this;

	/* remove class 'active' form all article links */
	const activeLinks = document.querySelectorAll('.titles a.active');

	for (let activeLink of activeLinks) {
		activeLink.classList.remove('active');
	}

	/* add class 'active' to the clicked link */
	clickedElement.classList.add('active');

	/* remove class 'active' form all article */
	const activeArticles = document.querySelectorAll('.post');

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove('active');
	}

	/* get href attribut form the clicked link */
	const articleSelector = clickedElement.getAttribute('href');

	/* find the correct article using the selector  (value of 'href' attribute) */
	const targetArticle = document.querySelector(articleSelector);

	/* add class 'active' to the correct article */
	targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';


function generateTitleLinks(customSelector = '') {
	/* Remove links of titlelist */
	document.querySelector(optTitleListSelector).innerHTML = '';
	
	/* For each Article: */
	const articles = document.querySelectorAll(optArticleSelector + customSelector);

	let html = "";
	for (let article of articles) {

    /* get the Article ID */
	const articleId = article.getAttribute('id');
    
	/* find the title element */
	/* get the title form title element */
	const articleTitle = article.querySelector(optTitleSelector).innerHTML;
	
    /* create HTML of the link  */
	const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
	
    /* insert link into titleList */
	html = html + linkHTML;
	
	}

	document.querySelector(optTitleListSelector).innerHTML = html;

}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
	link.addEventListener('click', titleClickHandler);
}

function getDivHeight() {
	let maxHeightDiv = 0;

	for (let i = 1; i <= 10; i++) {
		let heightDiv = document.getElementById('article-' + i).clientHeight;

		if (maxHeightDiv < heightDiv) {
			maxHeightDiv = heightDiv;
		}
	}


	document.getElementById('maxHeightDiv').style.height = maxHeightDiv + 100 + 'px';
}

getDivHeight();

function generateTags(){
	const optArticleTagsSelector = '.post-tags .list'

	/* find all articles */
	const articles = document.querySelectorAll('.post');
	
	/* START LOOP: for every article: */
  
	for (let article of articles) {
		
	  /* find tags wrapper */
		const tagWrapper = article.querySelector('.post-inner .post-tags')
	
	
	  /* make html variable with empty string */
	  	const html = "";
  
	  /* get tags from data-tags attribute */
	  	const articleTags = article.getAttribute('data-tags');

	  /* split tags into array */
		const articleTagsArray = articleTags.split(' ');
		
	
	  /* START LOOP: for each tag */
		let tagsList = "";
		  
		for (let articleTag of articleTagsArray) {
		/* generate HTML of the link */
		const tagHTML = '<li><a href="#tag-'+articleTag+'"><span>'+articleTag+'</span></a></li>'
		/* add generated code to html variable */
		tagsList = tagsList + tagHTML;
		
	  /* END LOOP: for each tag */
		}
		
	  /* insert HTML of all the links into the tags wrapper */

	  article.querySelector(optArticleTagsSelector).innerHTML = tagsList;
  
	/* END LOOP: for every article: */
	}
  }
  
  generateTags();

  function tagClickHandler(event){
	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;

	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = this.getAttribute('href');
	
	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace('#tag-','');

	/* find all tag links with class active */
	const activeLinksTag = document.querySelectorAll('.active a[href^="#tag"]')
	

	/* START LOOP: for each active tag link */
	for (let activeLinkTag of activeLinksTag) {
	  /* remove class active */
		activeLinkTag.classList.remove('.active');
	/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const tagLinks = document.querySelectorAll('a[href="' + href + '"]')
	
	/* START LOOP: for each found tag link */
	for (let tagLink of tagLinks) {
	  /* add class active */
		tagLink.classList.add('active')
	/* END LOOP: for each found tag link */
	}
	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
	
  }
  
  function addClickListenersToTags(){
	/* find all links to tags */

	const linksTag = document.querySelectorAll('a[href^="#tag"]')
  
	/* START LOOP: for each link */
	for ( let linkTag of linksTag) {
	  /* add tagClickHandler as event listener for that link */
			linkTag.addEventListener('click', tagClickHandler)

	/* END LOOP: for each link */
	}
  }
  
  addClickListenersToTags();

  const optiAuthorSelector = '.post-inner .post-author'
  
  function generateAuthors() {
	
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);

	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find authors wrapper */
		const authorsWrapper = article.querySelector(optiAuthorSelector);
		
		/* get author name form data-author attribute */
		const authorName = article.getAttribute('data-author');
		
		/* insert author name into authors wrapper */
		authorsWrapper.innerHTML = 'by '+'<a href="#'+authorName+'"><span>'+authorName+'</span></a>' ;
	/* END LOOP: for every article */
	}
  }

  generateAuthors();

  function authorClickHandler( event ) {
	/* prevent default action for this event */
	event.preventDefault();  

	/* make a new constance named 'clickedElement" and give it the vaule of "this" */
	const clickedElement = this;
	
	/* make constance author and read the attribute 'href' form the clicked element */
	const author = this.getAttribute('href').replace('#','');
	
	/* execute function 'generateTitleLinks" with author selector as argument */
		generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
	  /* find all links to author */
		const linksToAuthor = document.querySelectorAll('.post-author a')
		
	  /* START LOOP: for every author */
		for (let linkToAuthor of linksToAuthor) {
		/* add authorClickHandler as event listener for that link */
		
			linkToAuthor.addEventListener('click', authorClickHandler);
		/* END LOOP: for every author */
		}

}
addClickListenersToAuthors();