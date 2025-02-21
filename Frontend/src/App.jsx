import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setApiResponse(null);

    let parsed;
    try {
      parsed = JSON.parse(jsonInput);
    } catch (err) {
      setError('Invalid JSON input');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/bfhl', parsed);
      setApiResponse(response.data);
      document.title = "22BAI70756";
    } catch (err) {
      setError('Error calling backend API');
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!apiResponse) return null;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && apiResponse.alphabets && (
          <div>
            <h3>Alphabets</h3>
            <p>{apiResponse.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Numbers') && apiResponse.numbers && (
          <div>
            <h3>Numbers</h3>
            <p>{apiResponse.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('Highest Alphabet') && apiResponse.highest_alphabet && (
          <div>
            <h3>Highest Alphabet</h3>
            <p>{apiResponse.highest_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Tester</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON e.g. {"data": ["A", "C", "z"]}'
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apiResponse && (
        <div>
          <h2>Filter Options</h2>
          <select 
            multiple 
            value={selectedOptions} 
            onChange={handleDropdownChange}
            style={{ width: '200px', height: '80px' }}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          <hr />
          <h2>Response</h2>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
