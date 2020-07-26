import React from "react";
import { Card } from "react-bootstrap";

export default function Navbar(props) {
  return (
    <nav className="navbar fixed-top navbar-light bg-light">
      <Card.Body className="text-muted">
        Sort&nbsp;
        {props.sorttype ? (
          <i
            className="fa sort fa-sort-amount-asc"
            aria-hidden="true"
            onClick={props.changeStatus}
          ></i>
        ) : (
          <i
            className="fa sort fa-sort-amount-desc"
            aria-hidden="true"
            onClick={props.changeStatus}
          ></i>
        )}
        {"  "}&nbsp;&nbsp;
        <Card.Link onClick={() => props.sortBy("likes")}>
          <i className="fa fa-heart" aria-hidden="true">
            {" "}
            Likes
          </i>{" "}
        </Card.Link>
        <Card.Link onClick={() => props.sortBy("shares")}>
          <i className="fa fa-share" aria-hidden="true">
            {" "}
            Shares
          </i>
        </Card.Link>
        <Card.Link onClick={() => props.sortBy("views")}>
          <i className="fa fa-eye" aria-hidden="true">
            {" "}
            Views
          </i>
        </Card.Link>
        <Card.Link onClick={() => props.sortBy("event_date")}>
          <i className="fa fa-clock-o" aria-hidden="true">
            {" "}
            Date
          </i>
        </Card.Link>
      </Card.Body>
    </nav>
  );
}
