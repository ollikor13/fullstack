import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => {
  if (text === "Positive") {
    return (
      <tr>
        <td>{text}:</td>
        <td>{value}%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = props => {
  let good = props.goodCounter;
  let neutral = props.neutralCounter;
  let bad = props.badCounter;
  let all = good + neutral + bad;
  let average = (good * 1 + bad * -1) / all;
  let positive = (good / all) * 100;
  if (all === 0) {
    return (
      <div>
        <h1>Statistics:</h1>
        <div>No feedback given!</div>
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics:</h1>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = props => {
  const [goodCounter, setGoodCounter] = useState(0);
  const [neutralCounter, setNeutralCounter] = useState(0);
  const [badCounter, setBadCounter] = useState(0);

  const setToGoodValue = value => setGoodCounter(value);
  const setToNeutralValue = value => setNeutralCounter(value);
  const setToBadValue = value => setBadCounter(value);

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={() => setToGoodValue(goodCounter + 1)} text="Good" />
      <Button
        handleClick={() => setToNeutralValue(neutralCounter + 1)}
        text="Neutral"
      />
      <Button handleClick={() => setToBadValue(badCounter + 1)} text="Bad" />
      <Statistics
        goodCounter={goodCounter}
        neutralCounter={neutralCounter}
        badCounter={badCounter}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
