async function newPostHandler (event) {
event.preventDefault();
    const postTitle = document.querySelector('#postTitle').value.trim();
    const postContent = document.querySelector('#postContent').value.trim();

    if (postTitle && postContent) {
      const response = await fetch('/posts', {
        method: 'POST',
        body: JSON.stringify({ 
          postTitle, 
          postContent 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/profile');
        console.log(postTitle, postContent);
      } else {
        alert(response.statusText);
      }
    }
  }
console.log("Post.js");

document
  .querySelector('.post-form')
  .addEventListener('submit', newPostHandler);