import React, { useState, useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Header from './components/Header';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  console.log("App.js")
  // resp is user response. That is the answer to a question
  // The component QuestionList is repsonsible for displaying the questions and get the answers
  const [answers, setAnswers] = useState([]);

  // The Quiz page is responsible for creating the displayQuestions
  // The Quiz page is one of the routes
  const [displayQuestions, setDisplayQuestions] = useState([]);

  useEffect(() => {
    document.title = "Quizzler"
    }, [])

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
            <Route exact path="/profiles/:username">
              <Profile />
            </Route>
            <Route exact path="/quiz">
              <Quiz answers={answers} 
                setAnswers={setAnswers} 
                displayQuestions={displayQuestions}
                setDisplayQuestions = {setDisplayQuestions}/>
            </Route>
            <Route exact path="/results">
              <Results answers={answers} displayQuestions={displayQuestions}/>
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
