import React from 'react';
import { useQuery } from '@apollo/client';

import QuestionList from '../components/QuestionList';

import { QUERY_QUESTIONS } from '../utils/queries';

const Quiz = () => {

  console.log('quiz.js')
  const { loading, data } = useQuery(QUERY_QUESTIONS);
  const questions = data?.questions || [];

  console.log(data)

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <QuestionList
              questions={questions}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Quiz;