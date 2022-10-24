import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./Components/Loader";
import Viewport from "./Components/Viewport";
import Nav from "./Components/Nav";
import ErrorBoundary from "./Components/ErrorBoundary";

const Home = React.lazy(() => import("./Components/Home"));
// Lazily load additional components here

function App() {
  return (
    <div>
      <Router>
        <div>
          <Nav />
          <Viewport>
            <DataStoreOperations />
            <Switch>
              <Route exact path="/">
                <React.Suspense fallback={<Loader />}>
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                </React.Suspense>
              </Route>
              {/* Add additional routes here */}
            </Switch>
          </Viewport>
        </div>
      </Router>
    </div>
  );
}

export default App;
