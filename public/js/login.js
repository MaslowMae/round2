const loginFormHandler = async (event) => {
  event.preventDefault();

  const invalid = document.getElementById("invalid");
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
      invalid.textContent = "incorrect email or password";
      invalid.setAttribute(
        "style",
        "color: red; font-weight:bolder; margin-left:25%;"
      );
    }
  }
};
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
