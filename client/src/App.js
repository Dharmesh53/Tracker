import "./App.css";
import { useState, useEffect } from "react";
import { formatISO9075 } from "date-fns";

function App() {
  const [Name, setName] = useState("");
  const [Datetime, setDatetime] = useState("");
  const [Remark, setRemark] = useState("");
  const [Transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const url = process.env.REACT_APP_API_URL + "/transaction";
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((transaction) => {
          setTransactions(transaction);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetcher();
  }, []);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const Price = Name.split(" ")[0];
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: Name.substring(Price.length + 1),
        Price,
        Datetime,
        Remark,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setName("");
        setDatetime("");
        setRemark("");
      });
  };
  var balance = 0;
  for (const transaction of Transactions) {
    balance += transaction.Price;
  }
  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];
  return (
    <main>
      <h1>
        ₹{balance}
        <span>.{fraction}</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="basic">
          <input
            type="text"
            value={Name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={"+200"}
          />
          <input
            type="datetime-local"
            value={Datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
          />
        </div>
        <div className="remark">
          <input
            type="text"
            value={Remark}
            onChange={(ev) => setRemark(ev.target.value)}
            placeholder={"Remark"}
          />
        </div>
        <button>Add new Transaction</button>
      </form>
      <div className="transactions">
        {Transactions.length > 0 &&
          Transactions.map((transaction) => {
            return (
              <div className="transaction" key={transaction._id}>
                <div className="left">
                  <div className="name">{transaction.Name}</div>
                  <div className="remark">{transaction.Remark}</div>
                </div>
                <div className="right">
                  <div
                    className={`amount ${
                      transaction.Price < 0 ? "red" : "green"
                    }`}
                  >
                    ₹{transaction.Price}
                  </div>
                  <div className="date">
                    {formatISO9075(new Date(transaction.Datetime))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default App;
