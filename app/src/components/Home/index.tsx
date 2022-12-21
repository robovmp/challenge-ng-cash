import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppConfig from "../../configs/AppConfig";
import moment from "moment";

interface Cash {
  id: string;
  createdAt: string;
  value: number;
}

function Home() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [personTransaction, setPersonTransaction] = useState("");
  const [value, setValue] = useState("");
  const [ordenation, setOrdenation] = useState("Newest");
  const [hasError, setHasError] = useState("");

  const [dateCashOut, setDateCashOut] = useState<Cash[]>();
  const [dateCashIn, setDateCashIn] = useState<Cash[]>();

  const navigate = useNavigate();

  const formatDate = (timestamp: string) => {
    const formattedDate = moment(parseInt(timestamp)).format(
      "DD/MM/YY - hh:mm"
    );

    return formattedDate;
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const order = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (dateCashIn && dateCashOut) {
      dateCashIn.reverse();
      dateCashOut.reverse();
    }

    if (ordenation === "Newest") {
      setOrdenation("Older");
    } else {
      setOrdenation("Newest");
    }
  };

  const handleClearfields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPersonTransaction("");
    setValue("");
  };

  const getUser = () => {
    axios
      .get(`${AppConfig.API_USER}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setBalance(() => {
          const newBalance = res.data.account.balance;
          return newBalance.replace(".", ",");
        });
      });
  };

  const getTransactions = () => {
    axios
      .get(`${AppConfig.API_TRANSACTIONS}/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDateCashIn([...res.data.cashIn].reverse());
        setDateCashOut([...res.data.cashOut].reverse());
      });
  };
  const saveTransaction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!value) {
      setHasError("Invalid value.");
      setInterval(() => {
        setHasError("");
      }, 5000);
      return;
    }

    axios
      .post(
        `${AppConfig.API_TRANSACTIONS}/transactions`,
        { name: personTransaction, value: parseFloat(value.replace("-", "")) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDateCashOut(() => {
          if (dateCashOut) {
            return [
              {
                id: res.data.createdTransaction.id,
                createdAt: res.data.createdTransaction.createdAt,
                value: res.data.createdTransaction.value.toFixed(2),
              },
              ...dateCashOut,
            ];
          }
        });

        setBalance(() => {
          const newBalance = (parseFloat(balance) - parseFloat(value)).toFixed(
            2
          );
          return newBalance.replace(".", ",");
        });

        setPersonTransaction("");
        setValue("");
      })
      .catch((err) => {
        setHasError(err.response.data.error);
        setInterval(() => {
          setHasError("");
        }, 5000);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    getUser();
    getTransactions();
  }, []);

  return (
    <>
      <nav id="loggout">
        <button onClick={() => logout()}>Logout</button>
      </nav>
      <div className="home">
        <main>
          {hasError && <span id="showError">{hasError}</span>}

          <section className="account">
            <div className="accountDetails">
              <h1>R$ {balance} </h1>
              <div className="bottomBar">
                <h4>{name} </h4>
              </div>
            </div>

            <form action="">
              <h1>Transactions</h1>
              <div className="fields">
                <input
                  type="text"
                  id="nomeTransaction"
                  placeholder="Name *"
                  value={personTransaction}
                  onChange={(e) => setPersonTransaction(e.target.value)}
                  required
                />

                <input
                  type="number"
                  id="nomeTransaction"
                  placeholder="Value *"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
              <div className="bottomBarBtns">
                <button
                  className="btnClear"
                  onClick={(e) => handleClearfields(e)}
                >
                  Clear
                </button>
                <button
                  className="btnConfirm"
                  onClick={(e) => saveTransaction(e)}
                >
                  Confirm
                </button>
              </div>
            </form>
          </section>
          <div className="transactionSearch">
            <h1>Realized transactions</h1>
            <div className="transactionSearch-btns">
              <button onClick={(e) => order(e)}>{ordenation}</button>
            </div>
          </div>
          <section className="sectionTransaction">
            <div className="transactionDetails">
              {dateCashIn && dateCashIn.length ? (
                dateCashIn.map((cashIn) => {
                  return (
                    <div className="transaction" key={cashIn.id}>
                      <h3>Cash In</h3>
                      <strong>R$ {cashIn.value.toString().replace(".", ",")}</strong>
                      <span>{formatDate(cashIn.createdAt)}</span>
                    </div>
                  );
                })
              ) : (
                <div className="transaction">
                  {" "}
                  <p>There are no transactions</p>{" "}
                </div>
              )}
            </div>

            <div className="transactionDetails">
              {dateCashOut && dateCashOut.length ? (
                dateCashOut.map((cashOut) => {
                  return (
                    <div className="transaction" key={cashOut.id}>
                      <h3>Cash Out</h3>
                      <strong>R$ {cashOut.value.toString().replace(".", ",")}</strong>
                      <span>{formatDate(cashOut.createdAt)}</span>
                    </div>
                  );
                })
              ) : (
                <div className="transaction">
                  {" "}
                  <p>There are no transactions</p>{" "}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Home;
