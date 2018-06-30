import React from "react"

import style from "./Arrow.css";

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { direction } = this.props;

    return (
      <svg
        version="1.1"
        viewBox="0 0 67.52961 239.74654"
        height="240px"
        width="70px"
        {...this.props}
        className={`${'' || this.props.className} arrow ${'' || this.props.direction}`}
      >
        <g transform="translate(-15.524721,-19.510208)" id="layer1" >
          <path
            id="rect815"
            transform={`scale(0.26458333)`}
            d="M 59.333984,956.13281 108.83008,979.20117 313.35742,526.80369 108.83008,74.40625 59.333984,97.476562 257.94848,526.80537 Z"
          />
        </g>
      </svg>
    );
  }
}
