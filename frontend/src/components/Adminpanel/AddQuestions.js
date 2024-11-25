import React, { useState } from 'react';
import axios from 'axios';
import './AddQuestions.css'; 
import { Link } from 'react-router-dom';

const AddQuestions = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState(''); 
  const [option2, setOption2] = useState(''); 
  const [option3, setOption3] = useState(''); 
  const [option4, setOption4] = useState(''); 
  const [correctOptionIndex, setCorrectOptionIndex] = useState(-1); 
  const [questionType, setQuestionType] = useState('easy');
  const [subject, setSubject] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  const handleSubmit = async () => {
    if (question.trim() === '') {
      window.alert('Question is missing');
      return;
    }
    if (option1.trim() === '' || option2.trim() === '' || option3.trim() === '' || option4.trim() === '') {
      window.alert('All options are required');
      return;
    }
    if (correctOptionIndex === -1) {
      window.alert('Please select the correct option');
      return;
    }

    const data = {
      question: question,
      options: [option1, option2, option3, option4],
      correctOptionIndex: correctOptionIndex,
      questionType: questionType,
      subject: subject,
      subjectCode: subjectCode
    };

    try {
      const response = await axios.post('http://localhost:5000/addquestion', data);
      if (response.data.success) {
        window.alert('Question added successfully');
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectOptionIndex(-1);
        setQuestionType('easy');
        setSubject('');
        setSubjectCode('');
      } else {
        window.alert('Failed to add question');
      }
    } catch (error) {
      console.error(error);
      window.alert('Error adding question');
    }
  };
  
  return (
    <div>
      <nav className="navbar">
        <Link to="/adminpanel" className="back-arrow">&#8592;</Link>
        <h2>Add Question</h2>
      </nav><br></br><br></br>
      <div className="add-questions-container">
        <label>
          Subject:
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            <option value="MAD">MAD</option>
            <option value="DevOps">DevOps</option>
            <option value="CN">CN</option>
            <option value="CRNS">CRNS</option>
          </select>
        </label>
        <label>
          Subject Code:
          <select value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)}>
            <option value="">Select Subject-Code</option>
            <option value="IT345">IT345</option>
            <option value="IT346">IT346</option>
            <option value="IT347">IT347</option>
            <option value="IT348">IT348</option>
          </select>
        </label>
        <label>
          Question Type:
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Question:
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        </label>
        <label>
          Option 1:
          <input type="text" value={option1} onChange={(e) => setOption1(e.target.value)} />
        </label>
        <label>
          Option 2:
          <input type="text" value={option2} onChange={(e) => setOption2(e.target.value)} />
        </label>
        <label>
          Option 3:
          <input type="text" value={option3} onChange={(e) => setOption3(e.target.value)} />
        </label>
        <label>
          Option 4:
          <input type="text" value={option4} onChange={(e) => setOption4(e.target.value)} />
        </label>
        <label>
          Correct Option:
          <select value={correctOptionIndex} onChange={(e) => setCorrectOptionIndex(parseInt(e.target.value))}>
            <option value={-1}>Select Correct Option</option>
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </label>
        
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddQuestions;