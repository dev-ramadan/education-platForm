const title = document.querySelector(".title");
const description = document.querySelector(".description");
const price = document.querySelector(".price");
const btn_add = document.querySelector(".add");
const course_table = document.querySelector(".course_table");
const course_card = document.querySelector(".course")


// get Course
const getCourses = async () => {
    try {

        const res = await fetch("http://localhost:3000/api/course", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        const courses = result.data;

if (window.location === "http://127.0.0.1:5500/FrontEnd/courses.html") {

    course_table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>الاسم</th>
            <th>السعر</th>
        </tr>
    `;

    courses.forEach(course => {
        course_table.innerHTML += `
            <tr>
                <td>${course.id}</td>
                <td>${course.title}</td>
                <td>${course.price}</td>
            </tr>
        `;
    });
}


        courses.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.price}</p>
                <a href="courseDetails.html?id=${course.id}" class="btn">عرض الكورس</a>
            `;

            course_card.appendChild(card);
        });

    } catch (err) {
        console.log(err);
    }
};
getCourses()


// Add Course
const addCourse = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/course", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                price: price.value
            })
        });
        const result = await res
        if (res.ok) {
            alert(result.message || "تمت الإضافة بنجاح");

            title.value = "";
            description.value = "";
            price.value = "";

            getCourses()
        } else {
            alert(result.message || "حدث خطأ");
        }

    } catch (err) {
        console.log(err);
    }
};

if (window.location === "http://127.0.0.1:5500/FrontEnd/courses.html") {
    btn_add.addEventListener("click", addCourse);
}



