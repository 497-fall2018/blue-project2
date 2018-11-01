import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MainReducer from './reducers/mainReducers'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
const store = createStore(MainReducer);
const client = new ApolloClient({
  uri: 'https://us-central1-dj-prudo.cloudfunctions.net/api/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
