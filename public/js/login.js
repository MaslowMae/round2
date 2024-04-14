const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  //   const username = document.querySelector("#username").value.trim();
  // const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email && password) {
    console.log(email, password);
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
