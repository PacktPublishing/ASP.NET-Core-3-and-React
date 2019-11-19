import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { QuestionData } from './QuestionsData';
import { Question } from './Question';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('When the Question component is rendered, it should contain the correct data', () => {
  const question: QuestionData = {
    questionId: 1,
    title: 'Title test',
    content: 'Content test',
    userName: 'User1',
    created: new Date(2019, 1, 1),
    answers: [],
  };
  const { getByText } = render(
    <BrowserRouter>
      <Question data={question} />
    </BrowserRouter>,
  );

  const titleText = getByText('Title test');
  expect(titleText).not.toBeNull();

  const contentText = getByText('Content test');
  expect(contentText).not.toBeNull();

  const userText = getByText(/User1/);
  expect(userText).not.toBeNull();

  const dateText = getByText(/2019/);
  expect(dateText).not.toBeNull();
});
