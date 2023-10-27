// Sample student data
let students = [
    { id: 1, name: "John Doe", attendance: [] },
    { id: 2, name: "Jane Smith", attendance: [] }
];

// Function to display the student list for the teacher
function displayStudentList() {
    const studentList = document.getElementById("student-list");

    students.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = student.name;
        studentList.appendChild(option);
    });
}

// Function to mark student attendance
function markAttendance() {
    const studentId = parseInt(document.getElementById("student-list").value);
    const date = document.getElementById("attendance-date").value;

    const student = students.find(student => student.id === studentId);
    if (student) {
        student.attendance.push(date);
    }

    displayAttendanceResults();
}

// Function to display attendance results
function displayAttendanceResults() {
    const attendanceResultsUl = document.getElementById("attendance-results-ul");
    attendanceResultsUl.innerHTML = ""; // Clear previous data

    students.forEach(student => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${student.name}: ${student.attendance.length} days`;
        attendanceResultsUl.appendChild(listItem);
    });

    calculateMonthlyAttendance();
}

// Function to calculate monthly attendance percentage
function calculateMonthlyAttendance() {
    const monthlyAttendance = document.getElementById("monthly-attendance");
    const selectedMonth = new Date().getMonth() + 1; // Get the current month

    let totalDays = 0;
    let presentDays = 0;

    students.forEach(student => {
        student.attendance.forEach(date => {
            if (new Date(date).getMonth() + 1 === selectedMonth) {
                totalDays++;
            }
        });
    });

    students.forEach(student => {
        student.attendance.forEach(date => {
            if (new Date(date).getMonth() + 1 === selectedMonth) {
                presentDays++;
            }
        });
    });

    const attendancePercentage = (presentDays / totalDays) * 100 || 0;
    monthlyAttendance.textContent = `Monthly Attendance: ${attendancePercentage.toFixed(2)}%`;
}

// Add an event listener to mark attendance
const markAttendanceButton = document.getElementById("mark-attendance");
markAttendanceButton.addEventListener("click", markAttendance);

displayStudentList(); // Initial display of the student list
displayAttendanceResults(); // Display initial attendance results
