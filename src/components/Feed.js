import React, { useState, useEffect } from "react";
import FeedCard from "../components/Feedcard";
import Modal from "./Modal";
import Error from "./Error";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";

export default function Feed(props) {
  const [feeds, setFeed] = useState({});
  const [clickedCardData, setClickedCardData] = useState({});
  const [modalStatus, setModalStatus] = useState(false);
  const [error, setError] = useState({ error: false, msg: "" });
  const [sortData, setSortData] = useState({});
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    setSortData(feeds);
  }, [feeds]);

  const ApiArray = [
    "http://www.mocky.io/v2/59b3f0b0100000e30b236b7e",
    "http://www.mocky.io/v2/59ac28a9100000ce0bf9c236",
    "http://www.mocky.io/v2/59ac293b100000d60bf9c239"
  ];
  const [page, setPage] = useState(0);
  const clickOncard = feed => {
    setClickedCardData(feed);
    setModalStatus(true);
  };

  const clickOnClose = status => {
    setModalStatus(false);
  };

  if (!navigator.onLine) {
    // alert();
    // let tempfeed = localStorage.getItem("feeds")
    // if (tempfeed) { this.setState({ feeds: JSON.parse(tempfeed) }) }
    // this.setState({ toastText: "No Internet Connection!" }, () => {
    //     this.toggleToast();
    // })
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scrollPos = window.scrollY;
      let pageHeight = document.body.scrollHeight;
      if (
        parseInt(window.pageYOffset / 2000) &&
        ApiArray.length > parseInt(window.pageYOffset / 2000) &&
        page != parseInt(window.pageYOffset / 2000)
      ) {
        console.log(parseInt(window.pageYOffset / 2000));
        setPage(parseInt(window.pageYOffset / 2000));
      }
    });
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
          console.log(data);
          let tempData = localStorage.getItem("feeds")
            ? JSON.parse(localStorage.getItem("feeds"))
            : [];
          let newArray = [...tempData, ...data.posts];

          console.log(newArray);
          setFeed(newArray);

          const uniqueArray = newArray.filter((thing, index) => {
            const _thing = JSON.stringify(thing);
            return (
              index ===
              newArray.findIndex(obj => {
                return JSON.stringify(obj) === _thing;
              })
            );
          });

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
    // console.log(feeds.map(m => m[type]));
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

  const handleStatus = () => {
    setAsc(!asc);
  };

  return (
    <>
      {sortData.length > 0 && (
        <Navbar
          sortBy={handleSort}
          sorttype={asc}
          changeStatus={handleStatus}
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
        <Modal show={modalStatus} feed={clickedCardData} close={clickOnClose} />
        {error.error ? <Error error={error} /> : ""}
      </Container>
    </>
  );
}
