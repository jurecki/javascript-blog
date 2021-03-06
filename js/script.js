const templates = {
	articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
	tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
	authors: Handlebars.compile(document.querySelector('#template-authors').innerHTML),
	tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
	authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloudLink').innerHTML)
};

const opt = { 
	articleSelector:'.post',
	titleSelector: '.post-title',
	titleListSelector: '.titles',
	tagListSelector: '.tags.list',
	articleTagsSelector: '.post-tags .list',
	authorSelector: '.post-inner .post-author',
	authorsListSelector: '.authors',
	tagSizes: {
		classCount: 5,
		classPrefix: 'tag-size-',
	},
};

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

function generateTitleLinks(customSelector = '') {
	/* Remove links of titlelist */
	document.querySelector(opt.titleListSelector).innerHTML = '';
	
	/* For each Article: */
	const articles = document.querySelectorAll(opt.articleSelector + customSelector);

	let html = "";
	for (let article of articles) {

    /* get the Article ID */
	const articleId = article.getAttribute('id');
    
	/* find the title element */
	/* get the title form title element */
	const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
	
    /* create HTML of the link used Handlebars template  */
	const linkHTMLData = {
		id: articleId,
		title: articleTitle
	};

	const linkHTML = templates.articleLink(linkHTMLData);
	
    /* insert link into titleList */
	html = html + linkHTML;
	}

	document.querySelector(opt.titleListSelector).innerHTML = html;

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

function calculateTagsParams(tags) {
	/* create a new varaible params with an empty object */
	let params = {
		min: 9999,
		max: 0,
	};


	for (let tag in tags) {	
		if (tags[tag] > params.max) params.max = tags[tag];
		if (tags[tag] < params.min) params.min = tags[tag];
	}
	
	return params
}

function calculateTagClass(count, params) {
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor(percentage*(opt.tagSizes.classCount-1) +1);

	return opt.tagSizes.classPrefix + classNumber;
}

function generateTags(){
	/* create a new variable allTas with an empty object */
	let allTags = {};

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
		const tagLinkData = {
			articleTag: articleTag
		}

		const tagLink = templates.tagLink(tagLinkData);
	
		/* add generated code to html variable */
		tagsList = tagsList + tagLink;

		/* check if this link is NOT alread in allTags */
		if (!allTags.hasOwnProperty(articleTag)) {
			
			/* add tag to allTags object */
			allTags[articleTag]=1;
		} else { 
			allTags[articleTag]++;
		}
	  /* END LOOP: for each tag */
	  	
		}

	  /* insert HTML of all the links into the tags wrapper */
	  article.querySelector(opt.articleTagsSelector).innerHTML = tagsList;
  
	/* END LOOP: for every article: */
	}

	/*find list of tags in right column */
	const tagList = document.querySelector('.tags');

	/* calculate tags */

	const tagParams = calculateTagsParams(allTags);
	

	/* add html form allTags to tagList */
	/* create variable for all links HTML code */
	const allTagsData = {
		tags: []
	};

	/* START LOOP: for each tag in allTags: */
	for (let tag in allTags) {

		const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagParams)+'" href="#tag-'+tag+'">'+tag+' '+'</a></li>'
		

		/* generate code of a link and add it to allTagsHTML*/
		allTagsData.tags.push( {
			tag: tag,
			count: allTags[tag],
			className: calculateTagClass(allTags[tag], tagParams)
		});
	}

	tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
	console.log(linksTag)
	/* START LOOP: for each link */
	for ( let linkTag of linksTag) {
	  /* add tagClickHandler as event listener for that link */
			linkTag.addEventListener('click', tagClickHandler)

	/* END LOOP: for each link */
	}
  }
  
  addClickListenersToTags();
  
  function generateAuthors() {
	let allAuthors = {};

	const articles = document.querySelectorAll(opt.articleSelector);

	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find authors wrapper */
		const authorsWrapper = article.querySelector(opt.authorSelector);
		
		/* get author name form data-author attribute */
		const authorName = article.getAttribute('data-author');
		
		/* insert author name into authors wrapper */
		const authorsData = {
			authorName: authorName
		}
		authorsWrapper.innerHTML = templates.authors(authorsData);

		/* check if this author is NOT already in allAuthors */
		if(!allAuthors.hasOwnProperty(authorName)) {
			allAuthors[authorName] = 1;
		} else {
			allAuthors[authorName]++;
		}

	/* END LOOP: for every article */
	}


	/* find list of authors in right column */
	const authorList = document.querySelector(opt.authorsListSelector);

	const allAuthorsData = {
		authors: []
	};

	for (let author in allAuthors) {
		//allAuthorsHTML+= '<li><a href="#'+author+'">'+ author + ' (' + allAuthors[author] + ') </li></a>';
		allAuthorsData.authors.push({
			author: author,
			count: allAuthors[author]
		});
	}

	authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  }

  generateAuthors();

  function authorClickHandler( event ) {
	/* prevent default action for this event */
	event.preventDefault();  

	/* make a new constance named 'clickedElement" and give it the vaule of "this" */
	const clickedElement = this;
	
	/* make constance author and read the attribute 'href' form the clicked element */
	const author = this.getAttribute('href').replace('#authors-','');
	
	/* execute function 'generateTitleLinks" with author selector as argument */
		generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
	  /* find all links to author */
		const linksToAuthor = document.querySelectorAll('a[href^="#authors"]')
		
		console.log(linksToAuthor);
	  /* START LOOP: for every author */
		for (let linkToAuthor of linksToAuthor) {
		/* add authorClickHandler as event listener for that link */
		
			linkToAuthor.addEventListener('click', authorClickHandler);
		/* END LOOP: for every author */
		}

}
addClickListenersToAuthors();
