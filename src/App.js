import React, { useEffect, useState } from 'react'
import './App.css';
import Questions from './components/Questions'
import styled from 'styled-components'
import { questions } from './constants/questions'
import { ChakraProvider, CSSReset, Button } from "@chakra-ui/react"

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
const NextButton = styled(Button)`
&& {
  border: none;
  background: #e0a1a1;
  font-size: 1rem;
  padding: .5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #d69898;
  }
}
`

const PreviousButton = styled(Button)`
&& {
  border: none;
  background: #e6e6e6;
  font-size: 1rem;
  padding: .5rem 1rem;
  cursor: pointer;
}
`

const ActionBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Results = styled.div`
  .right {
    border:  1px solid green;
  }

  .wrong {
    border: 1px solid red;
  }
`

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentValues, setCurrentValues] = useState('')
  const [value, setValue] = useState('')
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('answers') === null) {
      localStorage.setItem('answers', JSON.stringify([]))
    } 
    setValue(JSON.parse(localStorage.getItem('answers'))[currentQuestion] || [])
  }, [])

  useEffect(() => {
    const updateAnswers = JSON.parse(localStorage.getItem('answers'))
    updateAnswers[currentQuestion] = value
    localStorage.setItem('answers', JSON.stringify([...updateAnswers]))
    setCurrentValues(updateAnswers)
  }, [value])

  const handlePreviousQuestion = () => {
    if(currentQuestion > 0 && questions.length > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  
  const handleNextQuestion = () => {
    if(currentQuestion >= 0 && questions.length - 1 > currentQuestion) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleFinishQuiz = () => {
    setFinish(true)
  }

  if (currentValues === '') {
    return null
  }

  const isDisabled = !currentValues[currentQuestion] || currentValues[currentQuestion].length === 0

  return (
    <ChakraProvider>
      <CSSReset />

      <div>
        <Header>
          <h1>Second Miles</h1>
          <p>How much of a Miles fan are you?</p>
        </Header>
        
        {!finish && <Card>
          <Questions currentQuestion={currentQuestion} currentValues={currentValues} setValue={setValue} />
          
          <ActionBox>
            <PreviousButton onClick={handlePreviousQuestion}>Previews</PreviousButton>
           {currentQuestion >= 0 && questions.length - 1 > currentQuestion ?
             <NextButton disabled={isDisabled} onClick={handleNextQuestion}>Next</NextButton> :
             <NextButton disabled={isDisabled} onClick={handleFinishQuiz}>Finish Quiz</NextButton> } 
          </ActionBox>
        </Card>}

        <Results>
           {finish &&  questions.map((q, i) => ( 
           <Card key={i}>
             <h2>{q.question}</h2>
           {q.answers.map(d => <div key={d.id} className={d.correct ? 'right' : JSON.parse(localStorage.getItem('answers'))[i] === d.answer ? 'wrong' : ''}>{d.answer}</div>)}
          </Card>)) }
        </Results>
      </div>
    </ChakraProvider>
  );
}

export default App;
