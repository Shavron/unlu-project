import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import FeedCard from "./Feedcard";
import Modal from "./Modal";
import Error from "./Error";
import Navbar from "./Navbar";

export default function Feed() {
  const [page, setPage] = useState(0);
  const [asc, setAsc] = useState(true);
  const [feeds, setFeed] = useState([]);
  const [sortData, setSortData] = useState({});
  const [modalStatus, setModalStatus] = useState(false);
  const [clickedCardData, setClickedCardData] = useState({});
  const [error, setError] = useState({ error: false, msg: "" });

  const ApiArray = [
    "https://www.mocky.io/v2/59b3f0b0100000e30b236b7e",
    "https://www.mocky.io/v2/59ac28a9100000ce0bf9c236",
    "https://www.mocky.io/v2/59ac293b100000d60bf9c239"
  ];

  useEffect(() => {
    if (Object.keys(feeds).length) {
      localStorage.setItem("feeds", JSON.stringify(feeds));
      setSortData(feeds);
    }
  }, [feeds]);

  const clickOncard = feed => {
    setClickedCardData(feed);
    setModalStatus(true);
  };

  // const clickOnClose = status => {
  //   setModalStatus(false);
  // };

  useEffect(() => {
    if (navigator.onLine) {
      window.addEventListener("scroll", () => {
        let h = parseInt(window.pageYOffset / 2100);
        if (h && ApiArray.length > h && page != h) {
          setPage(h);
        }
      });
    }
  });

  useEffect(() => {
    if (!navigator.onLine) {
      let tempData = localStorage.getItem("feeds")
        ? JSON.parse(localStorage.getItem("feeds"))
        : [];
      if (tempData) {
        setFeed(tempData);
      }
      setError({
        error: true,
        msg: "Unable to connect to the internet !!"
      });
    } else {
      fetch(ApiArray[page], { cache: "force-cache" })
        .then(res => {
          if (res.status !== 200) {
            setError({
              error: true,
              msg: "Oops :) API ERROR"
            });
          }
          return res.json();
        })
        .then(data => {
          // console.log(data);
          // let tempData = localStorage.getItem("feeds")
          //   ? JSON.parse(localStorage.getItem("feeds"))
          //   : [];
          let newArray = [...feeds, ...data.posts];

          const uniqueArray = newArray.filter((thing, index) => {
            const _thing = JSON.stringify(thing);
            return (
              index ===
              newArray.findIndex(obj => {
                return JSON.stringify(obj) === _thing;
              })
            );
          });

          setFeed(uniqueArray);
          localStorage.setItem("feeds", JSON.stringify(uniqueArray));
        })
        .catch(e => {
          let tempData = localStorage.getItem("feeds")
            ? JSON.parse(localStorage.getItem("feeds"))
            : [];
          if (tempData) {
            setFeed(tempData);
          } else {
            setError({
              error: true,
              msg: "Oops :) No data Available This Moment"
            });
          }
        });
    }
  }, [page]);

  const handleSort = type => {
    feeds.sort(function(a, b) {
      return asc == false
        ? b[type] > a[type]
          ? 1
          : b[type] < a[type]
          ? -1
          : 0
        : b[type] < a[type]
        ? 1
        : b[type] > a[type]
        ? -1
        : 0;
    });

    window.scrollTo({ behavior: "smooth", top: 0 });
    setSortData(Object.assign([], feeds));
  };

  // const handleStatus = () => {
  //   setAsc(!asc);
  // };

  return (
    <>
      {sortData.length > 0 && (
        <Navbar
          sortBy={handleSort}
          sorttype={asc}
          changeStatus={() => setAsc(!asc)}
        />
      )}
      <Container style={{ marginTop: "65px" }}>
        {sortData.length > 0
          ? sortData.map((feed, index) => {
              return (
                <FeedCard feed={feed} key={index} getModalData={clickOncard} />
              );
            })
          : ""}
        <Modal
          show={modalStatus}
          feed={clickedCardData}
          closemodal={() => setModalStatus(false)}
        />
        {error.error ? <Error error={error} /> : ""}
      </Container>
    </>
  );
}
