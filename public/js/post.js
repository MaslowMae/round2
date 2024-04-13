const newPostHandler = async (event) => {
event.preventDefault();
    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#post_content').value.trim();
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  }


document
  .querySelector('.post-form')
  .addEventListener('submit', newPostHandler);