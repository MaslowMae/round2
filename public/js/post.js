async function newPostHandler (event) {
event.preventDefault();
    const postTitle = document.querySelector('#postTitle').value.trim();
    console.log(postTitle);
    const postContent = document.querySelector('#postContent').value.trim();
    console.log(postContent);


    if (postTitle && postContent) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ 
          postTitle, 
          postContent 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  }
console.log("Post.js");

document
  .querySelector('.post-form')
  .addEventListener('submit', newPostHandler);