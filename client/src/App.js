import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [wantToShow, setWantToShow] = useState({});

  const inputRef = useRef();
  const formRef = useRef();

  window.onclick = function (event) {
    // console.log("event:", event.target);
    if (event.target !== inputRef.current) {
      setShow(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // inputRef.current?.reset();
    formRef.current?.reset();
    setWantToShow({ ...data[0] });
    setData([]);
    console.log(keyword);
  };

  async function getData() {
    try {
      let data = await axios.get(`http://localhost:8080/${keyword}`);
      setData(data.data.data);
    } catch (err) {
      console.log("err:", err);
    }
  }

  const handleChange = (e) => {
    setKeyword(e.target.value);
    getData();
    // getData(keyword);
    console.log(data);
  };

  return (
    <div className="App">
      <header>
        <div className="header">
          <h2>
            <i>Search Page </i>
          </h2>
        </div>
      </header>
      <section>
        <div className="ourInput">
          <form
            action=""
            className="input"
            ref={formRef}
            onSubmit={(e) => {
              handleSubmit(e);
              inputRef.current?.blur();
            }}
          >
            <input
              ref={inputRef}
              // value={task}
              type="text"
              placeholder="Enter a Keyword"
              className="input_box"
              onFocus={() => setShow(true)}
              onChange={(e) => handleChange(e)}
            />

            <button className="input_submit" type="submit">
              Go
            </button>
          </form>
        </div>
      </section>
      <section>
        <div
          className="searchResult"
          style={{ display: show ? "flex" : "none" }}
        >
          {data &&
            data.map((el) => {
              return (
                <p
                  key={el._id}
                  className="res"
                  onClick={() => {
                    setWantToShow({ ...el });
                    formRef.current?.reset();
                  }}
                >
                  {el.name}
                </p>
              );
            })}
          {data.length === 0 ? <p className="res">Not Found</p> : ""}
        </div>
      </section>
      <section>
        {/* showing ads and company name */}
        {wantToShow && (
          <div>
            <h3>{wantToShow.name}</h3>
            <h4>{wantToShow.url}</h4>
            <div className="showAds">
              {wantToShow.ads &&
                wantToShow.ads.map((el) => {
                  return (
                    <div>
                      <img
                        src={el.imageUrl}
                        alt=""
                        height="100%"
                        width="100%"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
