// login 
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const loginBtn = document.querySelector(".login");

const login = async () => {
    try {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            localStorage.setItem("token", data.data.token);
            alert("تم تسجيل الدخول بنجاح");
        } else {
            alert(data.message || "خطأ في تسجيل الدخول");
        }

    } catch (err) {
        console.log(err);
    }
};
loginBtn.addEventListener("click", login);
