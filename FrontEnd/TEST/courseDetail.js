const id = new URLSearchParams(location.search).get("id")
const header = document.querySelector(".header");
const description = document.querySelector(".description");
const price = document.querySelector(".price");
const instructor = document.querySelector(".instructor")
// Get Course Details
const getCourseDetails = async () => {
    try {

        const res = await fetch(`http://localhost:3000/api/course/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        const course = result.data;


        // get instractor Details
        const getInstractorDetails = async () => {
            try {
                const id = course.instructorId
                const res = await fetch(`http://localhost:3000/auth/instructor/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await res.json();
                const user = result.data;
                instructor.innerHTML = `👨‍🏫 المدرب: ${user.name }`               

            } catch (error) {
                console.log(error);
            }
        };
        getInstractorDetails()

        header.innerHTML = `
        <h1>${course.title}</h1>
        <p>${course.description}</p>`
        price.innerHTML = course.price + "EGP"

        description.innerHTML = course.description

    } catch (err) {
        console.log(err);
    }
};
getCourseDetails()