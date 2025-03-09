const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigationEl = document.querySelector(".off-screen-menu");

const formContact = document.querySelector("#contactForm");
const fullName = document.querySelector("#full-name");
const phoneNumber = document.querySelector("#number");
const userEmail = document.querySelector("#email");
const message = document.querySelector("#message");
const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");
const skillsDiv = document.querySelector(".skills-div");
const circleText = document.querySelector("#circleText");

const summaryWrapper = document.querySelector(".summary-wrapper");

const scrollToTopBtn = document.getElementById("scrollToTop");

/* 
  Hamburger Menu and Tab Navigation:

  - Hamburger menu click event toggles visibility of the off-screen menu.
  - Tab navigation handles click events on navigation links.
  - Activates and deactivates tab groups based on the clicked link.
  - Ensures responsive behavior by closing the menu on link click for smaller screens.
*/

hamburgerMenu.addEventListener("click", (event) => {
  event.preventDefault();
  const offScreenMenu = document.querySelector(".off-screen-menu");
  hamburgerMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});
function handleTabClick({ target }) {
  if (target.tagName !== "LI" || target == getActiveLink()) {
    return;
  }

  unsetActiveTabGroup();
  setActiveTabGroup(target.id);
}

function unsetActiveTabGroup() {
  getActiveLink().classList.remove("active");
  getActiveTab().classList.remove("active");
}

function setActiveTabGroup(id) {
  document.getElementById(id).classList.add("active");
  document.getElementById(id + "-panel").classList.add("active");
}

function getActiveLink() {
  return document.querySelector(".nav-link.active");
}

function getActiveTab() {
  return document.querySelector(".tab-panel.active");
}

navigationEl.addEventListener("click", (event) => {
  handleTabClick(event);

  if (window.innerWidth < 768) {
    const hamburgerMenuEl = document.querySelector(".hamburger-menu");
    hamburgerMenuEl.classList.remove("active");
    navigationEl.classList.remove("active");
  }
});

/* 
Rotates text around emoji in about-section
*/
const text = circleText.innerText;
circleText.innerHTML = text
  .split("")
  .map(
    (char, i) => `<span style="transform: rotate(${i * 14}deg)">${char}</span>`
  )
  .join("");

/* 
  Scroll-to-Top Functionality:

  - Attaches a scroll event listener to the window.
  - Calls the scrollFunction to control the display of the scrollToTop button.
  - Displays the scrollToTop button when scrolling down a certain distance.
  - Hides the scrollToTop button when close to the top of the page.
  
*/

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const scrollToTopEl = document.querySelector("#scrollToTop");
scrollToTopEl.addEventListener("click", () => {
  topFunction();
});

/*

Scroll animation Functionality:

If the element is visible:
-Adds the CSS class 'inView' to the element to indicate visibility.
-Sets a transition delay based on the index to create a delay effect between the visibility of elements.

*/
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("inView");
        entry.target.style.transitionDelay = `${index * 0.5}s`;
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: [0, 0.1, 1],
  }
);

const tags = document.querySelectorAll(".animation");
tags.forEach((tag) => {
  observer.observe(tag);
});

/* 
  Contact Form Functionality:

  - Checks input fields for errors.
  - Sends email using SMTP.JS library on successful validation.
  - Displays a success message using Swal library.
  - Clears form input values after successful submission.
*/

formContact.addEventListener("submit", (event) => {
  event.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !userEmail.classList.contains("error") &&
    !message.classList.contains("error") &&
    !phoneNumber.classList.contains("error")
  ) {
    sendEmail();
    cleanForm();
  }
});
function sendEmail() {
  const subjectValue = "No subject";
  const fullMessage = `Full name: ${fullName.value}<br> Phone number: ${phoneNumber.value}<br> Email:${userEmail.value}<br> Message:${message.value}`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "andreea.j@hotmail.com",
    Password: "607030EE29733FA84E833CE6151ECA27A7C8",
    To: "andreea.j@hotmail.com",
    From: "andreea.j@hotmail.com",
    Subject: subjectValue,
    Body: fullMessage,
  }).then((message) => {
    if (message == "OK") {
      console.log("hej");
      Swal.fire({
        title: "Thanks for your message!",
        text: "Message sent successfully!",
        icon: "success",
      });
    }
  });
}

function cleanForm() {
  fullName.value = "";
  phoneNumber.value = "";
  message.value = "";
  userEmail.value = "";
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value === "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    item.addEventListener("keyup", () => {
      if (item.value !== "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}
