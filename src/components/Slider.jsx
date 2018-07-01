import React from "react";
import PropTypes from 'prop-types';
import * as Slick from 'react-slick';

import Arrow from './Arrow';
import style from './Slider.css'

export default class Slider extends React.Component {
  static propTypes = {
    media: PropTypes.array,
  }

  static defaultProps = {
    media: [
      "https://static1.squarespace.com/static/5aba391d5b409b0d42f05e19/t/5ad46f951ae6cfce64d0691c/1523871640920/maitres_thumb2000x1333.jpg?format=1500w",
      "https://static1.squarespace.com/static/5aba391d5b409b0d42f05e19/t/5ad47afa70a6ad118aa85c07/1523874573775/maitres_intro2500w.jpg?format=2500w",
      "https://is4-ssl.mzstatic.com/image/thumb/Purple127/v4/9a/24/71/9a2471cf-aabc-d842-1c37-46dbffb19ea3/pr_source.jpg/300x0w.jpg"
    ],
  }

  prev() {
    if (this.refs.slick) {
      this.refs.slick.slickPrev()
    }
  }

  next() {
    if (this.refs.slick) {
      this.refs.slick.slickNext()
    }
  }

  render() {
    const { media } = this.props;

    const prevUrl    = media[0];
    const currentUrl = media[1];
    const nextUrl    = media[2];

    return (
      <div className="scroll-slider">
        <div className="zlider">
          <Slick.default
            ref="slick"
            dots={true}
            arrows={false}
          >
            <div>
              <div
                className="background-image prev"
                style={{backgroundImage: `url(${prevUrl})`}}
              ></div>
            </div>
            <div>
              <div
                className="background-image current"
                style={{backgroundImage: `url(${currentUrl})`}}
              ></div>
            </div>
            <div>
              <div
                className="background-image next"
                style={{backgroundImage: `url(${nextUrl})`}}
              ></div>
            </div>
          </Slick.default>
        </div>
        <div className="arrow-wrapper left">
          <Arrow direction="left" onClick={() => this.prev()}/>
        </div>
        <div className="arrow-wrapper right">
          <Arrow direction="right" onClick={() => this.next()}/>
        </div>
      </div>
    );
  }
}
