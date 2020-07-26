import React from "react";
import Feed from "./components/Feed";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <>
      hi
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
