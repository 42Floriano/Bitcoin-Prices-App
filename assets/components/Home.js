import React, { Component } from "react";
import { Route, Switch, Redirect, Link, withRouter } from "react-router-dom";
import Prices from "./Prices";
import About from "./About";

class Home extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className={"navbar-brand"} to={"/"}>
            {" "}
            Bitcoin Price PHP{" "}
          </Link>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className={"nav-link"} to={"/prices"}>
                  {" "}
                  Prices{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to={"/about"}>
                  {" "}
                  About{" "}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Redirect exact from="/" to="/prices" />
          <Route path="/prices" component={Prices} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default Home;
