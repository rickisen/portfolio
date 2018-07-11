import React from "react"

import style from "./Cross.css";

export default class Cross extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <svg
        version="1.1"
        viewBox="0 0 12.7 12.7"
        height="48"
        width="48"
        {...this.props}
        className={ className ? `cross ${className}` : "cross" }
      >
        <defs id="defs2" />
        <g transform="translate(0,-284.3)" id="layer1" >
          <path
            id="rect815"
            d="m 0.73455693,284.35635 -0.6910783,0.69109 5.61312227,5.61312 -5.61312227,5.61381 0.6910783,0.69039 5.61312297,-5.61312 5.6131221,5.61312 0.691078,-0.69039 -5.6131221,-5.61381 5.6131221,-5.61312 -0.691078,-0.69109 -5.6131221,5.61313 z"
          />
        </g>
      </svg>
    );
  }
}
