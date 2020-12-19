import React from 'react'
import styled from 'styled-components';
import { questions } from '../constants/questions'
import { Radio, RadioGroup, Stack } from "@chakra-ui/react"

const Divider = styled.div`
  height: 2px;
  width: 100%;
  margin: 16px 0;
  background: #e6e6e6;
`

const Answers = styled.ul`
  list-style: none;
  padding : 0;

  div > div {
    display: grid;
    grid-template-columns: auto;
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
const Questions = ({ currentQuestion, currentValues, setValue }) => {

  return (
    <>
      <h2>{questions[currentQuestion].question}</h2>

      <Divider />

        <Answers>
          <RadioGroup onChange={setValue} value={currentValues[currentQuestion]}>
          {questions[currentQuestion].answers.map(answer => (
            <Stack direction="row" key={answer.id}>
              <Radio value={answer.answer}>{answer.answer}</Radio>
            </Stack>
          ))}
        </RadioGroup>
      </Answers>

      <Divider />

    </>
  );
}

export default Questions;
