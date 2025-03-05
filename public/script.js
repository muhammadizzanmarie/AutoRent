document.addEventListener("DOMContentLoaded", () => {
   
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nama = document.getElementById("nama").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!nama || !email || !password) {
                alert("Semua kolom harus diisi!");
                return;
            }

            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nama, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Gagal register");
                }

                alert("Registrasi berhasil! Silakan login.");
                window.location.href = "login.html";
            } catch (error) {
                alert(error.message);
                console.error("Error:", error);
            }
        });
    }


    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("Email dan password harus diisi!");
                return;
            }

            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Gagal login");
                }

                localStorage.setItem("token", data.token);
                alert("Login berhasil!");
                window.location.href = "index.html"; 
            } catch (error) {
                alert(error.message);
                console.error("Error:", error);
            }
        });
    }
});
