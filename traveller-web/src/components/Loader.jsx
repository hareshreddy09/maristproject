import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="position-fixed w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}
    >
      <Spinner animation="border" variant="dark" />
    </div>
  );
};

export default Loader;