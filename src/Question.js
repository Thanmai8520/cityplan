import React, { useState } from 'react';

const languageOptions = ["French", "Spanish", "Telugu", "German", "Japanese"];

function Question({ text, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
    }
  };

  return (
    <div className="question-container">
      <p>Guess the language of the following text:</p>
      <h2>{text}</h2>
      <div className="options-container">
        {languageOptions.map((language) => (
          <button 
            key={language} 
            onClick={() => setSelectedAnswer(language)}
            style={{
              backgroundColor: selectedAnswer === language ? '#009460' : '#FFD56C',
              color: selectedAnswer === language ? '#FFD56C' : '#009460',
            }}
          >
            {language}
          </button>
        ))}
      </div>
      <br />
      <button onClick={handleSubmit} disabled={!selectedAnswer}>
        Submit Answer
      </button>
    </div>
  );
}

export default Question;
