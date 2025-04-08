// @ts-nocheck
import React from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({
      brand: "Tesla",
      model: "Model Y",
      color: "blue",
      year: 2020,
    });
  };

  componentDidMount(): void {
    console.log("componentDidMount");
    // runs after first render
  }

  componentWillUnmount(): void {
    console.log("componentWillUnmount");
    // runs before component unmount
  }

  componentDidUpdate(): void {}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color},
          <br />
          Model: {this.state.model},
          <br />
          Year: {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change detail
        </button>
      </div>
    );
  }
}

export default Test;
