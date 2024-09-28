document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const logoutBtn = document.getElementById("logoutBtn");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const profileInfo = document.getElementById("profileInfo");
  const welcomeMessage = document.getElementById("welcomeMessage");

  let userProfile = {};

  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    showSection(loginSection);
  });

  registerLink.addEventListener("click", function (event) {
    event.preventDefault();
    showSection(registerSection);
  });

  logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();
    logout();
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = loginForm.loginEmail.value;
    if (email in localStorage) {
      userProfile = JSON.parse(localStorage.getItem(email));
      displayProfile();
      showSection(profileSection);
      welcomeMessage.innerText = `Welcome to your profile page ${capitalizeFirstLetter(
        userProfile.name
      )}`;
    } else {
      alert("User not found. Please register.");
    }
  });

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = registerForm.registerEmail.value;
    if (!(email in localStorage)) {
      const name = registerForm.registerName.value;
      const password = registerForm.registerPassword.value;
      userProfile = {
        name: capitalizeFirstLetter(name),
        email: email,
        password: password,
        additionalInfo: "",
      };
      localStorage.setItem(email, JSON.stringify(userProfile));
      displayProfile();
      showSection(profileSection);
      welcomeMessage.innerText = `Welcome to your profile page ${userProfile.name}`;
    } else {
      alert("User already exists. Please login.");
    }
  });

  editProfileBtn.addEventListener("click", function (event) {
    event.preventDefault();
    editProfile();
  });

  saveProfileBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveProfile();
  });

  function showSection(section) {
    const content = document.querySelector(".content");
    const sections = content.querySelectorAll(".section");

    sections.forEach((sec) => {
      sec.style.display = "none";
    });

    section.style.display = "block";
  }

  function displayProfile() {
    profileInfo.innerHTML = `
      <div>Name: ${userProfile.name}</div>
      <div>Email: ${userProfile.email}</div>
      <div>Additional Info: ${userProfile.additionalInfo}</div>
    `;
  }

  function editProfile() {
    profileInfo.innerHTML = `
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="${userProfile.name}" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${userProfile.email}" required disabled>
      </div>
      <div>
        <label for="additionalInfo">Additional Info:</label>
        <textarea id="additionalInfo" name="additionalInfo" rows="4">${userProfile.additionalInfo}</textarea>
      </div>
    `;
    editProfileBtn.style.display = "none";
    saveProfileBtn.style.display = "block";
  }

  function saveProfile() {
    userProfile.name = document.getElementById("name").value;
    userProfile.additionalInfo =
      document.getElementById("additionalInfo").value;
    localStorage.setItem(userProfile.email, JSON.stringify(userProfile));
    displayProfile();
    editProfileBtn.style.display = "block";
    saveProfileBtn.style.display = "none";
  }

  function logout() {
    userProfile = {};
    showSection(loginSection);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
