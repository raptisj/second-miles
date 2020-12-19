import React, { useState } from 'react'
import './App.css';
import Questions from './components/Questions'
import styled from 'styled-components'
import { questions } from './constants/questions'

const Header = styled.header`
  max-width: 600px;
  margin: 0 auto; 
`

const Card = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #e6e6e6;
  padding: 16px;
`
const NextButton = styled.button`
  border: none;
  background: #e0a1a1;
  font-size: 1rem;
  padding: .5rem 1rem;
  cursor: pointer;
`

const PreviousButton = styled.button`
  border: none;
  background: #e6e6e6;
  font-size: 1rem;
  padding: .5rem 1rem;
  cursor: pointer;
`

const ActionBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentValue, setCurrentValue] = useState('')

  const handlePreviousQuestion = () => {
    if(currentQuestion > 0 && questions.length > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNextQuestion = () => {
    if(currentQuestion >= 0 && questions.length - 1 > currentQuestion) {
      setCurrentQuestion(currentQuestion + 1)
      setCurrentValue('')
    }
  }

  const getAnswerValue = (value, answer) => {
    console.log(value, answer)
    // setCurrentValue(value)
  }

  return (
    <div>
      <Header>
        <h1>Second Miles</h1>
        <p>How much of a Miles fan are you?</p>
      </Header>
      
      <Card>
        <Questions currentQuestion={currentQuestion} getAnswerValue={getAnswerValue} currentValue={currentValue} />
        
        <ActionBox>
          <PreviousButton onClick={handlePreviousQuestion}>Previews</PreviousButton>
          <NextButton onClick={handleNextQuestion}>Next</NextButton>
        </ActionBox>
      </Card>
    </div>
  );
}

export default App;
