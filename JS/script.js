const students = [
    {
        roll: 101,
        name: "Dhaval Rangapara",
        course: "B.Com",
        math: 85,
        science: 78,
        english: 92
    },
    {
        roll: 102,
        name: "Janak Makwana",
        course: "BCA",
        math: 76,
        science: 69,
        english: 80
    },
    {
        roll: 103,
        name: "Rohit Makwana",
        course: "B.Com",
        math: 45,
        science: 52,
        english: 48
    },
    {
        roll: 104,
        name: "Hardik Makwana",
        course: "B.Com",
        math: 52,
        science: 52,
        english: 48
    },
    {
        roll: 105,
        name: "Aashu Pancholi",
        course: "B.Com",
        math: 45,
        science: 32,
        english: 28
    },
    {
        roll: 106,
        name: "Ananya Gupta",
        course: "B.Com",
        math: 38,
        science: 42,
        english: 40
    },
    {
        roll: 107,
        name: "Karan Verma",
        course: "BCA",
        math: 79,
        science: 81,
        english: 76
    },
    {
        roll: 108,
        name: "Meera Iyer",
        course: "B.Sc",
        math: 68,
        science: 72,
        english: 70
    },
    {
        roll: 109,
        name: "Rajesh Pancholi",
        course: "B.Com",
        math: 45,
        science: 32,
        english: 28
    },
    {
        roll: 105,
        name: "Savji Makwana",
        course: "B.Com",
        math: 45,
        science: 32,
        english: 28
    },
];

const resultBody = document.getElementById("resultBody");
const resultForm = document.getElementById("resultForm");

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const courseInput = document.getElementById("course");

const mathInput = document.getElementById("math");
const scienceInput = document.getElementById("science");
const englishInput = document.getElementById("english");

const sortFilter = document.getElementById("sortFilter");

let editRoll = null;


function getTotal(student) {
    return Number(student.math) +
        Number(student.science) +
        Number(student.english);
}


function getPercentage(student) {
    return getTotal(student) / 3;
}


function getGrade(percentage) {

    if (percentage >= 80) {
        return "A";
    }

    if (percentage >= 70) {
        return "B";
    }

    if (percentage >= 60) {
        return "C";
    }

    return "D";
}


function getStatus(student) {

    if (
        student.math < 40 ||
        student.science < 40 ||
        student.english < 40
    ) {
        return "Fail";
    }

    return "Pass";
}


function renderStudents() {

    let data = [...students];


    if (sortFilter.value === "high") {
        data.sort(
            (a, b) => getPercentage(b) - getPercentage(a)
        );
    }

    if (sortFilter.value === "low") {
        data.sort(
            (a, b) => getPercentage(a) - getPercentage(b)
        );
    }


    resultBody.innerHTML = "";


    data.forEach(student => {

        const percentage = getPercentage(student);
        const grade = getGrade(percentage);
        const status = getStatus(student);


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>${student.math}</td>

            <td>${student.science}</td>

            <td>${student.english}</td>

            <td>${getTotal(student)}</td>

            <td>${percentage.toFixed(2)}%</td>

            <td>
                <span class="grade">
                    ${grade}
                </span>
            </td>

            <td>
                <span class="status ${status === "Pass" ? "pass" : "fail"}">
                    ${status}
                </span>
            </td>

            <td>

                <button
                    class="edit"
                    onclick="editStudent(${student.roll})"
                    title="Edit"
                >
                    ✏️
                </button>

                <button
                    class="delete"
                    onclick="deleteStudent(${student.roll})"
                    title="Delete"
                >
                    🗑️
                </button>

            </td>
        `;


        resultBody.appendChild(row);

    });
}


// Add / Update Student
resultForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const student = {

        roll: Number(rollInput.value),

        name: nameInput.value.trim(),

        course: courseInput.value,

        math: Number(mathInput.value),

        science: Number(scienceInput.value),

        english: Number(englishInput.value)
    };


    if (
        !student.name ||
        !student.roll ||
        !student.course ||

        student.math < 0 ||
        student.math > 100 ||

        student.science < 0 ||
        student.science > 100 ||

        student.english < 0 ||
        student.english > 100
    ) {

        alert("Please enter valid student details.");

        return;
    }



    if (editRoll !== null) {

        const index = students.findIndex(
            s => s.roll === editRoll
        );


        if (index !== -1) {

            student.roll = editRoll;

            students[index] = student;
        }


        editRoll = null;

    }



    else {

        if (
            students.some(
                s => s.roll === student.roll
            )
        ) {

            alert("Roll number already exists.");

            return;
        }


        students.push(student);
    }


    resultForm.reset();

    renderStudents();

});



function editStudent(roll) {

    const student = students.find(
        s => s.roll === roll
    );


    if (!student) return;


    editRoll = roll;


    nameInput.value = student.name;

    rollInput.value = student.roll;

    courseInput.value = student.course;

    mathInput.value = student.math;

    scienceInput.value = student.science;

    englishInput.value = student.english;

}


function deleteStudent(roll) {

    if (
        !confirm("Are you sure you want to delete?")
    ) {
        return;
    }


    const index = students.findIndex(
        s => s.roll === roll
    );


    if (index !== -1) {

        students.splice(index, 1);
    }


    renderStudents();

}

sortFilter.addEventListener(
    "change",
    renderStudents
);

renderStudents();