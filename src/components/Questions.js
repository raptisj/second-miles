import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { questions } from '../constants/questions'

const Divider = styled.div`
  height: 2px;
  width: 100%;
  margin: 16px 0;
  background: #e6e6e6;
`

const Answers = styled.ul`
  list-style: none;
  padding : 0;

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;

    &:hover {
      background: #e6e6e6;
    }

    label {
      padding: 8px 0 8px 8px;
      cursor: pointer;
    }
  }
`

const Questions = ({ currentQuestion, getAnswerValue, currentValue }) => {

  useEffect(() => {
    const po = document.getElementsByTagName('input').checked 
    console.log(po)
  }, [currentQuestion])

  const onSiteChanged = (e, answer) => {
    getAnswerValue(e.target.value, answer)
  }

  return (
    <>
      <h2>{questions[currentQuestion].question}</h2>

      <Divider />

      <Answers>
      {questions[currentQuestion].answers.map(answer => (
        <li key={answer.id}>
          <input type="radio" id={answer.id} name="gender" value={currentValue} onChange={(e) => onSiteChanged(e, questions[currentQuestion])} />
          <label htmlFor={answer.id}>{answer.answer}</label>
        </li>
      ))}
      </Answers>

      <Divider />
    
    </>
  );
}

export default Questions;
