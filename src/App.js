import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Feed from "./components/Feed";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Route
          exact
          path="/"
          render={props => <Feed {...props} title={`Props through render`} />}
        /> */}
        <Route exact path="/" component={Feed} />
      </BrowserRouter>
    </>
  );
}

export default App;
