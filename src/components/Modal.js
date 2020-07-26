import React from "react";
import "../css/Modal.css";
import { Card, Image, Modal } from "react-bootstrap";
import moment from "moment";

export default React.memo(function Model(props) {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Card>
        <Modal.Header closeButton onClick={() => props.close(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.feed.event_name}
            <br />
            <Modal.Title className="text-muted">
              <p>
                <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                {moment(props.feed.event_date).format("lll")}
              </p>
            </Modal.Title>
          </Modal.Title>
        </Modal.Header>

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
    </Modal>
  );
});
