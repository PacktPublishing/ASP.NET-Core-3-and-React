import { FC, Fragment, useEffect } from 'react';
import { Page } from './Page';
import { RouteComponentProps } from 'react-router-dom';
import { QuestionData, PostAnswerData, AnswerData } from './QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray3, gray6 } from './Styles';
import { AnswerList } from './AnswerList';
import { Form, required, minLength, Values, SubmitResult } from './Form';
import { Field } from './Field';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  getQuestionActionCreator,
  AppState,
  GotQuestionAction,
  PostedAnswerAction,
  postAnswerActionCreator,
  clearPostedAnswerActionCreator,
} from './Store';

interface RouteParams {
  questionId: string;
}
interface Props extends RouteComponentProps<RouteParams> {
  getQuestion: (questionId: number) => Promise<GotQuestionAction>;
  question: QuestionData | null;
  questionLoading: boolean;
  postAnswer: (answer: PostAnswerData) => Promise<PostedAnswerAction>;
  postedAnswerResult?: AnswerData;
  clearPostedAnswer: () => void;
}
const QuestionPage: FC<Props> = ({
  match,
  getQuestion,
  question,
  questionLoading,
  postAnswer,
  postedAnswerResult,
  clearPostedAnswer,
}) => {
  useEffect(() => {
    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      getQuestion(questionId);
    }
    return function cleanUp() {
      clearPostedAnswer();
    };
  }, [match.params.questionId, getQuestion, clearPostedAnswer]);

  const handleSubmit = (values: Values) => {
    postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
  };

  let submitResult: SubmitResult | undefined;
  if (postedAnswerResult) {
    submitResult = { success: postedAnswerResult !== undefined };
  }

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null
            ? questionLoading
              ? 'Loading ...'
              : ''
            : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on
          ${question.created.toLocaleDateString()} 
          ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <Form
                submitCaption="Submit Your Answer"
                validationRules={{
                  content: [
                    { validator: required },
                    { validator: minLength, arg: 50 },
                  ],
                }}
                onSubmit={handleSubmit}
                submitResult={submitResult}
                failureMessage="There was a problem with your answer"
                successMessage="Your answer was successfully submitted"
              >
                <Field name="content" label="Your Answer" type="TextArea" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    question: store.questions.viewing,
    questionLoading: store.questions.loading,
    postedAnswerResult: store.questions.postedAnswerResult,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getQuestion: (questionId: number) =>
      dispatch(getQuestionActionCreator(questionId)),
    postAnswer: (answer: PostAnswerData) =>
      dispatch(postAnswerActionCreator(answer)),
    clearPostedAnswer: () => dispatch(clearPostedAnswerActionCreator()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionPage);
