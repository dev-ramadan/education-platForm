// Students
const studentsTable = document.querySelector(".students");

const getStudent = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/auth/users", {
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await res.json();
        const users = result.data;
        const students = users.filter(u => u.role === "student");
        
        studentsTable.innerHTML = `
            <tr>
                <th>ID</th>
                <th>الاسم</th>
                <th>الإيميل</th>
            </tr>
        `; 

        students.forEach(user => {
            studentsTable.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.log(error);
    }
};

getStudent();