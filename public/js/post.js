const newPostHandler = async (event) => {
  event.preventDefault();
  const postTitle = document.querySelector("#postTitle").value.trim();
  const postContent = document.querySelector("#postContent").value.trim();

  if (postTitle && postContent) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        postTitle,
        postContent,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".post-form").addEventListener("submit", newPostHandler);

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/posts/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to delete project");
//     }
//   }
// };

// document
//   .querySelector("#delete-btn")
//   .addEventListener("click", delButtonHandler);