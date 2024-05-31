function calculateGrade(percentage) {
  let grade = "";
  if (percentage < 50) {
    grade = "F";
  } else if (percentage >= 50 && percentage < 60) {
    grade = "E";
  } else if (percentage >= 60 && percentage < 70) {
    grade = "D";
  } else if (percentage >= 70 && percentage < 80) {
    grade = "C";
  } else if (percentage >= 80 && percentage < 90) {
    grade = "B";
  } else if (percentage >= 90 && percentage <= 100) {
    grade = "A";
  } else {
    grade = null; // for percentages above 100 or invalid inputs
  }
  return grade;
}

var result = calculateGrade(50);
console.log(result);
