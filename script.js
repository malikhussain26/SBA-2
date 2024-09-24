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

  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, learnerSubmissions);
  
  console.log(result);

  //=============================================

  // function to calculate final learner data with averages
  function getLearnerData(courseInfo, assignmentGroup, _learnerSubmissions) {
   // check if course and assignment group IDs match
    if (courseInfo.id !== assignmentGroup.course_id) {
        throw new
    Error('Invalid data: Course and Assignment group do not match.');
    }
  

  const learnerResults = []; // array for storing learner data

//Loop through learner submissions
for (const submission of learnerSubmissions) {
    const learnerId = submission.learner_id;
    // find existing learner data or create a new object for this learner
    let learnerData = learnerResults.find(data => data.id === learnerId);

    if (!learnerData) {
        learnerData = { id: learnerId, avg: 0, };
        learnerResults.push(learnerData);
    }
    // calculate assignment score for submission
    const assignmentScore = calculateAssignmentScore(submission, assignmentGroup.assignments);
if (assignmentScore) {
    //add assignment score and weighted score to learner data
    learnerData[assignmentScore.id] = assignmentScore.score;
    learnerData.avg += assignmentScore.weightedScore;
    }

}

// Calculating final average and handle NaN
for (const learnerData of learnerResults) {
    learnerData.avg /= Object.keys(learnerData).length - 1; //excluding id property
}

return learnerResults;
}

// function to calculate score and weighted score for a single assignment
function calculateAssignmentScore(submission, assignments) {
    try {
        //find matching assignment object based on ID
        let assignment = assignments.find(a => a.id === submission.assignment_id);
        if (!assignment) {
            return null; //return null if assignment is not found
        }
    

    const submittedAt = new Date(submission.submission.submitted_at);
    const dueAt = new Date(assignment.due_at);
    const isLate = submittedAt > dueAt;
    let score = submission.submission.score;

    if (assignment.points_possible === 0) {
        throw new Error("Invalid data: assignment unable to contain zero points");
    }

    //calculate percentage and apply late penalty if applicable
    score = score / assignment.points_possible;
    if (isLate) {
        score *= 0.9; // 10% deduction, 90% max available
    }
    //calculate weighted score based on assignment score and group weight
    const weightedScore = score * assignment.group_weight;
    //return an object containing assignment ID, score, and weighted score
    return { id: assignment.id, score, weightedScore };
    } catch (error) {
        //error handling
        console.error("Error calculating assignment score:", error);
        return null;
 }

}
