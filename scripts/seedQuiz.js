const mongoose = require('mongoose');
require('dotenv').config();
const Quiz = require('../models/quiz');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Quiz.deleteMany({});
    console.log(' Old quiz data deleted.');

    const quizzes = [
    
      {
        lessonId: new mongoose.Types.ObjectId('68317e81a43057fc8057a287'),
        question: 'What is the main principle of Agile?',
        options: ['Process over people', 'Comprehensive documentation', 'Customer collaboration', 'Strict contracts'],
        correctAnswerIndex: 2
      },
      {
        lessonId: new mongoose.Types.ObjectId('68317e81a43057fc8057a287'),
        question: 'Which framework is commonly used in Agile?',
        options: ['Waterfall', 'Scrum', 'V-Model', 'RAD'],
        correctAnswerIndex: 1
      },
      {
        lessonId: new mongoose.Types.ObjectId('68317e81a43057fc8057a287'),
        question: 'Agile emphasizes:',
        options: ['Big releases', 'Long-term contracts', 'Late feedback', 'Continuous delivery'],
        correctAnswerIndex: 3
      },
      {
        lessonId: new mongoose.Types.ObjectId('68317e81a43057fc8057a287'),
        question: 'What is a Sprint in Agile?',
        options: ['A fast task', 'A meeting', 'A fixed development cycle', 'Bug report'],
        correctAnswerIndex: 2
      },
      {
        lessonId: new mongoose.Types.ObjectId('68317e81a43057fc8057a287'),
        question: 'Who manages the product backlog?',
        options: ['Scrum Master', 'QA Lead', 'Product Owner', 'Client'],
        correctAnswerIndex: 2
      },

      {
        lessonId: new mongoose.Types.ObjectId('6831983ae1fc9dfee4c33562'),
        question: 'What does CI stand for?',
        options: ['Continuous Integration', 'Central Interface', 'Cloud Index', 'Code Ignition'],
        correctAnswerIndex: 0
      },
      {
        lessonId: new mongoose.Types.ObjectId('6831983ae1fc9dfee4c33562'),
        question: 'What tool is commonly used in DevOps for CI/CD?',
        options: ['WordPress', 'Jenkins', 'Photoshop', 'MongoDB'],
        correctAnswerIndex: 1
      },
      {
        lessonId: new mongoose.Types.ObjectId('6831983ae1fc9dfee4c33562'),
        question: 'Infrastructure as Code means:',
        options: ['Manual config', 'Using scripts to manage infrastructure', 'Building software', 'Developing UI'],
        correctAnswerIndex: 1
      },
      {
        lessonId: new mongoose.Types.ObjectId('6831983ae1fc9dfee4c33562'),
        question: 'What’s the benefit of Continuous Deployment?',
        options: ['Weekly releases', 'Immediate updates after tests', 'Better screenshots', 'More meetings'],
        correctAnswerIndex: 1
      },
      {
        lessonId: new mongoose.Types.ObjectId('6831983ae1fc9dfee4c33562'),
        question: 'Which is NOT a DevOps tool?',
        options: ['Jenkins', 'Docker', 'Kubernetes', 'Figma'],
        correctAnswerIndex: 3
      },

      {
        lessonId: new mongoose.Types.ObjectId('68319672e1fc9dfee4c3355a'),
        question: 'What is the first phase in SDLC?',
        options: ['Deployment', 'Testing', 'Requirement Analysis', 'Maintenance'],
        correctAnswerIndex: 2
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319672e1fc9dfee4c3355a'),
        question: 'Which model is linear and sequential?',
        options: ['Agile', 'Waterfall', 'RAD', 'Scrum'],
        correctAnswerIndex: 1
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319672e1fc9dfee4c3355a'),
        question: 'Design phase focuses on:',
        options: ['Writing tests', 'Gathering feedback', 'Planning architecture', 'Training users'],
        correctAnswerIndex: 2
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319672e1fc9dfee4c3355a'),
        question: 'Which is NOT a software quality attribute?',
        options: ['Usability', 'Reliability', 'Profitability', 'Efficiency'],
        correctAnswerIndex: 2
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319672e1fc9dfee4c3355a'),
        question: 'What is the final phase in SDLC?',
        options: ['Design', 'Maintenance', 'Testing', 'Analysis'],
        correctAnswerIndex: 1
      },

      {
        lessonId: new mongoose.Types.ObjectId('68319449e1fc9dfee4c33554'),
        question: 'What is unit testing?',
        options: ['Testing the whole system', 'Testing one function/module', 'Testing UI', 'Integration testing'],
        correctAnswerIndex: 1
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319449e1fc9dfee4c33554'),
        question: 'What’s the goal of regression testing?',
        options: ['Speed up release', 'Retest unchanged modules', 'Find bugs in new features', 'Ensure no new bugs'],
        correctAnswerIndex: 3
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319449e1fc9dfee4c33554'),
        question: 'What is black box testing?',
        options: ['Knowing internal logic', 'Testing without internal knowledge', 'Code coverage testing', 'Unit testing'],
        correctAnswerIndex: 1
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319449e1fc9dfee4c33554'),
        question: 'Which tool is used for automated testing?',
        options: ['Jira', 'Postman', 'Selenium', 'Notion'],
        correctAnswerIndex: 2
      },
      {
        lessonId: new mongoose.Types.ObjectId('68319449e1fc9dfee4c33554'),
        question: 'Smoke testing is used to:',
        options: ['Stress test the system', 'Check stability after build', 'Check design elements', 'Debug performance'],
        correctAnswerIndex: 1
      }
    ];

    await Quiz.insertMany(quizzes);
    console.log(' Fresh quiz data inserted!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
