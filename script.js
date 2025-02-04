
    $(document).ready(function () {
        // Load existing students from local storage when the page loads
        loadStudents();

        // Handle form submission
        $("#student-form").submit(function (event) {
            event.preventDefault();

            // Get values from form inputs
            let name = $("#name").val();
            let studentClass = $("#class").val();
            let dob = $("#dob").val();
            let marks = $("#marks").val();
            let attendance = $("#attendance").val();

            // Create student object
            let student = {
                name: name,
                studentClass: studentClass,
                dob: dob,
                marks: marks,
                attendance: attendance
            };

            // Save student to local storage
            saveStudent(student);

            // Add new student to the table
            appendStudent(student);

            // Reset form
            $("#student-form")[0].reset();
        });

        // Function to add student row to the table
        function appendStudent(student) {
            let newRow = `<tr>
                <td data-label="Name">${student.name}</td>
                <td data-label="Class">${student.studentClass}</td>
                <td data-label="Date of Birth">${student.dob}</td>
                <td data-label="Marks">${student.marks}</td>
                <td data-label="Attendance">${student.attendance}%</td>
                <td data-label="Action"><button class='delete-btn'>Delete</button></td>
            </tr>`;

            $("#student-list").append(newRow);
        }

        // Save student to local storage
        function saveStudent(student) {
            let students = JSON.parse(localStorage.getItem("students")) || [];
            students.push(student);
            localStorage.setItem("students", JSON.stringify(students));
        }

        // Load students from local storage
        function loadStudents() {
            let students = JSON.parse(localStorage.getItem("students")) || [];
            students.forEach(student => appendStudent(student));
        }

        // Delete student from table and local storage
        $(document).on("click", ".delete-btn", function () {
            let rowIndex = $(this).closest("tr").index();
            let students = JSON.parse(localStorage.getItem("students")) || [];

            students.splice(rowIndex, 1);
            localStorage.setItem("students", JSON.stringify(students));

            $(this).closest("tr").remove();
        });
    });
