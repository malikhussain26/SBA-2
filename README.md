**Author**
Malik A. Hussain


This javascript assignment analyzes learner data, including course information, assignment groups, and learner submissions. 
It calculates weighted averages for each learner based on their performances on individual assignments.

some key features of the javascript are that it:
Validates input data, ensuring consistent course and assignment group IDs.
Processes learner submissions, calculating scores, applying late penalties, and calculating weighted averages.
Handles potential errors gracefully, such as invalid data or calculation issues.
Provides a clear and structured output format.

How to Use:
Ensurethat courseInfo, assignmentGroup, and learnerSubimssions data are defined.
call the getLearnerData function:
const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(result);

It should output/return an array of objects, each representing a learner's data, which; includes id, avg, and assignment_id
