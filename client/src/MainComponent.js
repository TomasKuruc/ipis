import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Other Page', href: '/otherPage' },
]


const MainComponent = () => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");

  const getAllNumbers = useCallback(async () => {
    // we will use nginx to redirect it to the proper URL
    const data = await axios.get("/api/values/all");
    setValues(data.data.rows.map(row => getFunyQuote(row.number)));
  }, []);


const getFunyQuote = (number) => {
    const quotes = [
        `${number} kilos, that's exactly how much your mother weighs`,
        `The odds are ${number} to one for you to ever get laid`,
        `It takes up to ${number} engineers to find out that it could be done more easily`,
        `${number-1} out of ${number} mental health specialists recommend this website`,
        `The number of people who know you: ${number}. The number of people who like you: 0`,
        `IQ of ${number} just means you're special`,
        `It doesn't matter if you tell ${number} facts, your wife will still be right`,
        `I got ${number} problems but a glitch ain't one`
    ]

    const randomIndex = Math.floor(Math.random() * quotes.length)

    return quotes[randomIndex]
}


  const saveNumber = useCallback(
    async event => {
      event.preventDefault();

      if (isNaN(+value)) return

      await axios.post("/api/values", {
        value
      });

      setValue("");
      getAllNumbers();
    },
    [value, getAllNumbers]
  );

  useEffect(() => {
    getAllNumbers();
  }, []);

  return (
    <div className='page'>
      {/*<button onClick={getAllNumbers}>Get all numbers</button>*/}
      {/*<br />*/}
      <h1 className="title">Numeric Hub</h1>

      <form className="form" onSubmit={saveNumber}>
        <input
            className='input'
            value={value}
            onChange={event => {
                setValue(event.target.value);
            }}
            placeholder='Time to Crunch Some Digits...'
        />
        <button className='submitbtn'>Submit</button>
      </form>

        <div className="values">
            <h2>List of Facts?</h2>

            {values.map((number, index) => (
                <div className="value"><span className='value-index'>#{index + 1}</span>{number}</div>
            ))}
        </div>
    </div>
  );
};

export default MainComponent;
