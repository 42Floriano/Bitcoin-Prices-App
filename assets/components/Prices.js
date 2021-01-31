import React, { Component } from "react";
import axios from "axios";
import ApexChart from "./ApexChart";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Prices extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      dates: [],
      values: [],
      loading: true,
      errorDate: "",
      dateStart: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(),
      todayMinOne: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    };
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleChangeStartDate(date) {
    this.setState({
      dateStart: date,
    });
  }
  handleChangeEndDate(date) {
    this.setState({
      dateEnd: date,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.getData();
    console.log(this.state.dateStart, this.state.dateEnd);
  }

  changeDateFormat(date) {
    let newFormat = date.toISOString().slice(0, 10);
    return newFormat;
  }
  //Check if date start is older than date end then
  //Call our PHP server, passing the dates selected or in state.
  //if successful setState with new data
  getData() {
    this.setState({
      loading: true,
    });
    let dateStart = this.changeDateFormat(this.state.dateStart);
    let dateEnd = this.changeDateFormat(this.state.dateEnd);
    if (this.state.dateStart > this.state.dateEnd == true) {
      this.setState({
        errorDate: "The start date should be before the end date! :-)",
        loading: false,
      });
    } else {
      axios
        .get(`https://127.0.0.1:8000/api/data?d1=${dateStart}&d2=${dateEnd}`)
        .then((data) => {
          let keys = Object.keys(data.data.bpi);
          let values = Object.values(data.data.bpi);
          //maps through the list to reduce the decimal number of our prices to .00
          values = values.map(function (each_element) {
            return Number(each_element.toFixed(2));
          });
          this.setState({
            data: data.bpi,
            dates: keys,
            values: values,
            loading: false,
            errorDate: "",
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  render() {
    const loading = this.state.loading;
    return (
      <div>
        <section className="row-section">
          <div className="container">
            <div className="row">
              <h2 className="text-center">
                <div className="row"></div>
                <span>Bitcoin Prices</span>
                <p>
                  Built by Floriano Albertini <i className="fa fa-heart"></i>
                </p>
              </h2>
              <div className="row form-group">
                <form className="formOne" onSubmit={this.onFormSubmit}>
                  <p>Start: </p>
                  <DatePicker
                    className="formElem"
                    selected={this.state.dateStart}
                    onChange={this.handleChangeStartDate}
                    name="startDate"
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date(2013, 1, 1)}
                    maxDate={this.state.todayMinOne}
                  />
                  <p>End: </p>
                  <DatePicker
                    className="formElem"
                    selected={this.state.dateEnd}
                    onChange={this.handleChangeEndDate}
                    name="endDate"
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date(2013, 1, 2)}
                    maxDate={new Date()}
                  />
                  <button className="btn btn-primary formElem">Show</button>
                  <p className="pError">{this.state.errorDate}</p>
                </form>
                <div className="graph">
                  {loading ? (
                    <div className={"row text-center"}>
                      <span className="fa fa-spin fa-spinner fa-2x"></span>
                    </div>
                  ) : (
                    <ApexChart
                      dates={this.state.dates}
                      values={this.state.values}
                    ></ApexChart>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Prices;
