/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links)
})
*/

const titleClickHandler = function() {
    console.log('Link was clicked!', event);
}

/* remove class 'active' form all article links */

/* add class 'active' to the clicked link */

/* remove class 'active' form all article */

/* get href attribut form the clicked link */

/* find the correct article using the selector  (value of 'href' attribute) */

/* add class 'active' to the correct article */

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}