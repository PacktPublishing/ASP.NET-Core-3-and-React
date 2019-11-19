import { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
import { QuestionData } from './QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  searchQuestionsActionCreator,
  AppState,
  SearchedQuestionsAction,
} from './Store';

interface Props extends RouteComponentProps {
  searchQuestions: (criteria: string) => Promise<SearchedQuestionsAction>;
  questions: QuestionData[] | null;
  questionLoading: boolean;
}

const SearchPage: FC<Props> = ({
  location,
  searchQuestions,
  questions,
  questionLoading,
}) => {
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    searchQuestions(search);
  }, [search, searchQuestions]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions || []} />
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.searched,
    questionLoading: store.questions.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    searchQuestions: (criteria: string) =>
      dispatch(searchQuestionsActionCreator(criteria)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
