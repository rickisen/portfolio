import React from "react";
import PropTypes from 'prop-types';
import * as Slick from 'react-slick';

import Arrow from './Arrow';
import style from './Slider.css'

export default class Slider extends React.Component {
  static propTypes = {
    media: PropTypes.array,
    activated: PropTypes.bool,
    inView: PropTypes.number,
    iteration: PropTypes.number,
  }

  static defaultProps = {
    media: [],
    activated: false,
    iteration: 0,
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
    const { iteration, inView, media, activated } = this.props;
    const delta = 8;
    const translationOffset = (inView * delta) - (delta / 2);

    return (
      <div className="scroll-slider">
        <div
          className={`zlider zlider-${iteration}`}
          style={{transform: `translate(0, ${translationOffset}rem)`}}
        >
          <style>{`.zlider-${iteration} .slick-dots{transform: translate(0, ${translationOffset * -1}rem);}`}</style>
          <Slick.default
            ref="slick"
            dots={true}
            arrows={false}
          >
            {media && media.map((m, i) => (
              <div key={"media" + i}>
                <div
                  className="background-image"
                  style={{backgroundImage: `url(${m})`}}
                ></div>
              </div>
            ))}
          </Slick.default>
        </div>
        <div
          style={{ opacity: activated ? 1 : 0}}
          className="arrow-wrapper left">
          <Arrow direction="left" onClick={() => this.prev()}/>
        </div>
        <div
          className="arrow-wrapper right"
          style={{ opacity: activated ? 1 : 0}}
        >
          <Arrow direction="right" onClick={() => this.next()}/>
        </div>
      </div>
    );
  }
}
