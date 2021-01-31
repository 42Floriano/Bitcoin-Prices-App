import React, { Component } from "react";

class About extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <section className="row-section">
          <div className="container">
            <div className="row">
              <h2 className="text-center">
                <div className="row"></div>
                <span>About</span>
              </h2>
            </div>
            <div className="row"></div>{" "}
            <div className="pAbout">
              <p>
                {" "}
                React & PHP app challenge built with Symfony using the
                https://www.coindesk.com API to display the bitcoin price
                history per day. Built for Smart Mobile Factory. <br />
              </p>
              <p>By Floriano Albertini on the 31.01.2121</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default About;
