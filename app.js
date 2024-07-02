let semestersData = [[]]; // Start with one empty semester

function addCourse(button) {
    const semesterDiv = button.parentElement;
    const coursesDiv = semesterDiv.querySelector('.courses');
    const courseInput = semesterDiv.querySelector('.course');
    const creditsInput = semesterDiv.querySelector('.credits');
    const gradeSelect = semesterDiv.querySelector('.grade');

    const course = courseInput.value.trim();
    const credits = parseFloat(creditsInput.value);
    const grade = parseFloat(gradeSelect.value);

    if (course && !isNaN(credits) && !isNaN(grade) && credits >= 1 && credits <= 4) {
        // Create and display the new course
        const newCourse = document.createElement('div');
        newCourse.className = 'course-item';
        newCourse.textContent = `Course: ${course}, Credits: ${credits}, Grade: ${gradeSelect.options[gradeSelect.selectedIndex].text}`;
        coursesDiv.appendChild(newCourse);

        // Store course data
        const semesterIndex = Array.from(document.getElementById('semesters').children).indexOf(semesterDiv);
        if (!semestersData[semesterIndex]) {
            semestersData[semesterIndex] = [];
        }
        semestersData[semesterIndex].push({ course, credits, grade });

        // Clear inputs
        courseInput.value = '';
        creditsInput.value = '';
        gradeSelect.selectedIndex = 0;
    } else {
        alert('Please fill in all fields correctly and ensure credits are between 1 and 4.');
    }
}

function editCourse(button) {
    const semesterDiv = button.parentElement;
    const coursesDiv = semesterDiv.querySelector('.courses');
    const courseInput = semesterDiv.querySelector('.course');
    const creditsInput = semesterDiv.querySelector('.credits');
    const gradeSelect = semesterDiv.querySelector('.grade');

    const semesterIndex = Array.from(document.getElementById('semesters').children).indexOf(semesterDiv);

    if (semestersData[semesterIndex] && semestersData[semesterIndex].length > 0) {
        // Remove the last course display
        if (coursesDiv.lastChild) {
            coursesDiv.removeChild(coursesDiv.lastChild);
        }

        // Retrieve the last course data
        const lastCourse = semestersData[semesterIndex].pop();
        courseInput.value = lastCourse.course;
        creditsInput.value = lastCourse.credits;
        gradeSelect.value = lastCourse.grade;
    } else {
        alert('No courses to edit.');
    }
}

function addSemester() {
    const semestersDiv = document.getElementById('semesters');
    const semesterCount = semestersDiv.getElementsByClassName('semester').length;
    const newSemester = document.createElement('div');
    newSemester.className = 'semester';
    newSemester.innerHTML = `
        <h2>Semester ${semesterCount + 1}</h2>
        <div class="courses"></div>
        <label for="course">Course:</label>
        <input type="text" class="course" name="course">
        <label for="credits">Credits:</label>
        <input type="number" class="credits" name="credits" min="1" max="4">
        <label for="grade">Grade:</label>
        <select class="grade" name="grade">
            <option value="10">O - 10</option>
            <option value="9">A -  9</option>
            <option value="8">B -  8</option>
            <option value="7">C -  7</option>
            <option value="6">D -  6</option>
            <option value="5">P -  5</option>
            <option value="0">F -  0</option>
        </select>
        <button type="button" onclick="addCourse(this)">Add Course</button>
        <button type="button" onclick="editCourse(this)">Edit Last Course</button>
    `;
    semestersDiv.appendChild(newSemester);

    // Ensure a corresponding entry in semestersData
    semestersData.push([]);
}

function calculateCGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;

    const semesters = document.getElementsByClassName('semester');
    for (let i = 0; i < semesters.length; i++) {
        const semesterCourses = semestersData[i];
        let semesterGradePoints = 0;
        let semesterCredits = 0;

        if (semesterCourses.length > 0) {
            for (const course of semesterCourses) {
                semesterGradePoints += course.grade * course.credits;
                semesterCredits += course.credits;
            }

            totalGradePoints += semesterGradePoints;
            totalCredits += semesterCredits;

            const gpa = semesterGradePoints / semesterCredits;
            semesters[i].querySelector('h2').textContent = `Semester ${i + 1} (GPA: ${gpa.toFixed(3)})`;
        } else {
            semesters[i].querySelector('h2').textContent = `Semester ${i + 1} (No courses added)`;
        }
    }

    if (totalCredits > 0) {
        const cgpa = totalGradePoints / totalCredits;
        const resultElement = document.getElementById('result');
        resultElement.textContent = `Your overall CGPA is: ${cgpa.toFixed(3)}`;
    } else {
        const resultElement = document.getElementById('result');
        resultElement.textContent = 'No courses added. CGPA cannot be calculated.';
    }
}

// Initialize with only one semester
document.addEventListener('DOMContentLoaded', () => {
    // Only Semester 1 is initialized, no additional semesters
});
