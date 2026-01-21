function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Registration Successful");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.email !== email || user.password !== password) {
        alert("Invalid Credentials");
        return;
    }

    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

function startQuiz() {
    window.location.href = "quiz.html";
}


if (window.location.pathname.includes("home.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    } else {
        const user = JSON.parse(localStorage.getItem("user"));
        document.getElementById("welcomeUser").innerText =
            "Hello, " + user.name;
    }
}
