import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Add_test.css'; // Import CSS file
import { Link } from 'react-router-dom';

const Add_test = () => {
  const [easyCount, setEasyCount] = useState(0);
  const [mediumCount, setMediumCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);
  const [subjectCode, setSubjectCode] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {

    const selectedDate = new Date(date);
    const today = new Date();
    
    // Adjust the time to start of the day (midnight) for comparison
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    let status = "";
  if (selectedDate.toDateString() === today.toDateString()) {
    status = "Ongoing";
  } else if (selectedDate > today) {
    status = "Upcoming";
  } else {
    status = "Past";
  }

  const testData = {
    subjectCode: subjectCode,
    date: date,
    easyCount: easyCount,
    mediumCount: mediumCount,
    hardCount: hardCount,
    status: status
  };
  
    try {
      const response = await axios.post('http://localhost:5000/addtest', testData);
      if (response.data.success) {
        window.alert('Test added successfully');
        setEasyCount(0);
        setMediumCount(0);
        setHardCount(0);
        setSubjectCode('');        
        setDate('');        
      // Redirect to Adminpanel
        window.location.href = 'http://localhost:3000/Adminpanel';
      } else {
        window.alert('Failed to add test');
      }
    } catch (error) {
      console.error(error);
      window.alert('Error adding test');
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const selected = new Date(selectedDate);
    
    // Adjust the time to start of the day (midnight) for comparison
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    
    if (selected < today) {
      window.alert("Please select a date from today onwards.");
      setDate('');
    } else {
      setDate(selectedDate);
    }
  };
  

  // Function to fetch questions based on subject code and date
  const fetchQuestions = async (subjectCode, date) => {
    try {
      const response = await axios.get(`http://localhost:5000/questions/${subjectCode}/${date}`);
      const fetchedQuestions = response.data;
      console.log('Fetched questions:', fetchedQuestions);
      // Handle the fetched questions data as needed
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Fetch questions when subject code or date changes
  useEffect(() => {
    if (subjectCode && date) {
      fetchQuestions(subjectCode, date);
    }
  }, [subjectCode, date]);

  return (
    <div>
      <nav className="navbar">
        <Link to="/adminpanel" className="back-arrow">&#8592;</Link>
        <h2>Add Test</h2>
      </nav>
    <div className="add-test-container"> {/* Apply CSS class */}
      <h2>Select Questions</h2>
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
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <label>
        Easy Questions:
        <input type="number" value={easyCount} min="0" onChange={(e) => setEasyCount(e.target.value)} />
      </label>
      <label>
        Medium Questions:
        <input type="number" value={mediumCount}  min="0" onChange={(e) => setMediumCount(e.target.value)} />
      </label>
      <label>
        Hard Questions:
        <input type="number" value={hardCount} min="0" onChange={(e) => setHardCount(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Submit</button>      
    </div>
    </div>
  );
};

export default Add_test;
