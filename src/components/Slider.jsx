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
    media: [],
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

    return (
      <div className="scroll-slider">
        <div className="zlider">
          <Slick.default
            ref="slick"
            dots={true}
            arrows={false}
          >
            { media && media.map((m, i) => (
            <div
              key={"media" + i}
            >
              <div
                className="background-image prev"
                style={{backgroundImage: `url(${m})`}}
              ></div>
            </div>
            ))}
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
