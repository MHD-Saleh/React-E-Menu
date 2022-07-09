import React, { Component } from "react";
import Chart from "react-apexcharts";

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "WAU",
        },
        xaxis: {
          type: "category",
          categories: [],
        },
        title: {
          text: "WAU",
          align: "center",
          style: {
            fontSize: "20px",
            color: "black",
          },
        },
        labels: [],
      },
      series: [
        {
          name: "WAU",
          data: [5, 4, 3],
        },
      ],
    };
  }

  fetchData() {
    fetch(`http://www.mocky.io/v2/5db955cf3000005a005ee1cb`)
      .then((response) => response.json())
      .then((dat) => {
        console.log(dat.bars);
        const newSeries = [];
        const myarr = [];
        const newXaxis = dat.xaxis;
        console.log("data isss " + dat.bars);
        dat.bars.map((elemm, index) => {
          myarr[index] = elemm.value;
        });
        console.log("my arr " + myarr);

        newSeries.push({
          data: myarr,
          name: this.state.series.label,
        });
        this.setState({
          series: myarr,
          options: {
            ...this.state.options,
            labels: newXaxis,
            xaxis: { ...this.state.options.xaxis, categories: newXaxis },
          },
        });
        console.log(this.state.options);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        height="450"
        width="100%"
      />
    );
  }
}
export default Demo;
