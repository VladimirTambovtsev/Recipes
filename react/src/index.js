import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

import './styles/App.css'
import App from "./components/App"
import Search from "./components/nav/Search"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"
import Signout from "./components/auth/Signout"
import RecipePage from "./components/recipe/RecipePage"
import AddRecipe from "./components/recipe/AddRecipe"
import Profile from "./components/profile/Profile"
import withSession from './components/auth/withSession'


const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: (e) => { 
    console.log(e.graphQLErrors) // for debug
    if (e.networkError) {
      localStorage.setItem("token", "");
    }
  }, 
})

const Root = ({ refetch, session }) => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" exact component={Search} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/signout" exact component={Signout} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/recipe/add" render={ () => <AddRecipe session={session}/> } />
        <Route path="/recipes/:_id" exact component={RecipePage} />
        <Redirect to="/" /> {/* if route doesnt exists, go to '/' */}
      </Switch>
    </Fragment>
  </BrowserRouter>
)

const RootWithSession = withSession(Root)



ReactDOM.render(
  <ApolloProvider client={client}>
  	<RootWithSession/>
  </ApolloProvider>,
  document.getElementById("root")
)
