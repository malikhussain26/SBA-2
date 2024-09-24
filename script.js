// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const learnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  //=============================================

  function getLearnerData(courseInfo, assignmentGroup, _learnerSubmissions) {
    if (courseInfo.id !== assignmentGroup.course_id) {
        throw new
    Error('Invalid data: Course and Assignment group do not match.');
    }
  

  const learnerResults = [];

//Loop through learner submissions
for (const submission of learnerSubmissions) {
    const learnerId = submission.learner_id;
    let learnerData = learnerResults.find(data => data.id === learnerId);

    if (!learnerData) {
        learnerData = { id: learnerId, avg: 0, };
        learnerResults.push(learnerData);
    }

    const assignmentScore = calculateAssignmentScore(submission, assignmentGroup.assignments);
if (assignmentScore) {
    learnerData[assignmentScore.id] = assignmentScore.score;
    learnerData.avg += assignmentScore.weightedScore;
    }

}

// Calculating final average
for (const learnerData of learnerResults) {
    learnerData.avg /= Object.keys(learnerData).length - 1; //excluding id property
}

return learnerResults;
}

const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
console.log(result);