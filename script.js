// Smooth Scroll (internal links ke liye)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    elements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
const params = new URLSearchParams(window.location.search);

const successMsg = document.getElementById("successMsg");

if (successMsg && params.get("success") === "true") {
    successMsg.style.display = "block";
}
const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");

if (form && popup) {
form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();
        console.log(result); // 👈 IMPORTANT

        if (response.ok) {
            popup.style.display = "flex";
            form.reset();
        } else {
            alert("❌ Error: " + result.error);
        }

    } catch (error) {
        console.error(error); // 👈 IMPORTANT
        alert("❌ Network error! Check console.");
    }
});
}


function closePopup() {
    popup.style.display = "none";
}

window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
});

// Mobile Hamburger Menu
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu");

    if (navbar && menu && !document.querySelector(".hamburger")) {
        const hamburger = document.createElement("div");
        hamburger.className = "hamburger";
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        navbar.appendChild(hamburger);

        hamburger.addEventListener("click", function () {
            menu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
        
        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function () {
                menu.classList.remove("active");
                hamburger.classList.remove("active");
            });
        });
    }
});