// const loginFormHandler = async (event) => {
//   event.preventDefault();
//   // Collect values from the login form
//   //   const username = document.querySelector("#username").value.trim();
//   const username = document.querySelector("#username").value.trim();
//   const email = document.querySelector("#email").value.trim();
//   const password = document.querySelector("#password").value.trim();
//   if (username && email && password) {
//     // Send a POST request to the API endpoint
//     const response = await fetch("/api/users/login", {
//       method: "POST",
//       body: JSON.stringify({ username, email, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       console.log
//       // If successful, redirect the browser to the profile page
//       document.location.replace("/profile");
//     } else {
//       alert(response.statusText);
//     }
//   }
// };
// document
//   .querySelector(".login-form")
//   .addEventListener("submit", loginFormHandler);

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
    console.log("Sending POST request to /api/users/login");
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    // Logging the response to see what the server returned
    console.log("Response received:", response);

    if (response.ok) {
      console.log("Login successful, redirecting to profile page...");
      // If successful, redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      invalid.textContent = "incorrect email or password";
      invalid.setAttribute(
        "style",
        "color: red; font-weight:bolder; margin-left:25%;"
      );
    }
  } else {
    console.log("Missing username, email, or password.");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
