import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "../css/feed.css";

export default function Feedcard(props) {
  return (
    <>
      <Card className="" onClick={() => props.getModalData(props.feed)}>
        <Card.Header>
          <Card.Title>{props.feed.event_name}</Card.Title>
          <Card.Text className="text-muted">
            <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
            {moment(props.feed.event_date).format("lll")}
          </Card.Text>
        </Card.Header>
        <Image src={props.feed.thumbnail_image} thumbnail />
        {/* <Button variant="primary">Go somewhere</Button> */}
        <Card.Footer className="text-muted text-center">
          <Card.Body>
            <Card.Link className="text-muted text-center">
              <i className="fa fa-heart"> {props.feed.likes}</i>{" "}
            </Card.Link>
            <Card.Link className="text-muted text-center">
              <i className="fa fa-share"> {props.feed.shares}</i>
            </Card.Link>
            <Card.Link className="text-muted text-center">
              <i className="fa fa-eye"> {props.feed.views}</i>
            </Card.Link>
          </Card.Body>
        </Card.Footer>
      </Card>
    </>
  );
}
