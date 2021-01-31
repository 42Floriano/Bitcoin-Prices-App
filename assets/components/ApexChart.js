import React from "react";
import Chart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Price",
          data: this.props.values,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Bitcoin in USD per day",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.props.dates,
        },
      },
    };
  }

  componentDidUpdate() {
    // Create a string from the list recieves as a prop and list in the state.
    // Compare both string and if they are different, it updates the state otherwise nothing happen. To avoid infinite loop.
    let first = this.state.series.slice();
    let strArrayState = JSON.stringify(first[0].data);
    let strArrayProps = JSON.stringify(this.props.values);

    if (strArrayState.localeCompare(strArrayProps) != 0) {
      // This should copy the state as a new object update it and pass it back to the state. However, when done the state do not update. Havn't understood why.
      // Because of this, I'm passing the whole object hard coded but it isnt optimal with a big state
      // let newState = Object.assign({}, this.state);
      // newState.series[0].data = this.props.values;
      // newState.options.xaxis.categories = this.props.dates;
      // this.setState(newState);

      this.setState({
        series: [
          {
            name: "Price",
            data: this.props.values,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Bitcoin price per day",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: this.props.dates,
          },
        },
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="800"
        />
      </div>
    );
  }
}

export default ApexChart;
