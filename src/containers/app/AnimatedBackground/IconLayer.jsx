import React from 'react';
import PropTypes from 'prop-types';

import LogoPaths from '../../../components/LogoPaths';

export default class IconLayer extends React.Component {
  static propTypes = {
    seed: PropTypes.string,
    labels: PropTypes.array,
    currentWindowWidth: PropTypes.number,
    currentWindowHeight: PropTypes.number,
    verticalOffset: PropTypes.number,
    scale: PropTypes.number,
    quantity: PropTypes.number,
    filter: PropTypes.string,
  }

  static defaultProps = {
    seed: 'seed',
    labels: [],
    currentWindowWidth: 1200,
    currentWindowHeight: 900,
    verticalOffset: 0,
    scale: 1,
    quantity: 10,
    filter: '',
  }

  render () {
    const {
      seed,
      labels,
      currentWindowWidth,
      currentWindowHeight,
      verticalOffset,
      scale,
      quantity,
      filter = '',
    } = this.props;

    let arr = [];
    let k = 0;
    for (let j = 0 ; j < quantity; j++) {
      if (k < labels.length) {
        arr.push(labels[k]);
      } else {
        k = 0;
        arr.push(labels[k])
      }
      k++;
    }

    return (
      <div
        className="icon-layer"
        style={{
          height: '3rem',
          width:'3rem',
          transform: `translate(0, ${verticalOffset}px)`,
        }}
      >
        {arr.map((l, i) => (
          <LogoPaths
            seed={seed}
            scale={scale}
            filter={filter}
            i={i}
            currentWindowWidth={currentWindowWidth}
            currentWindowHeight={currentWindowHeight}
            pathLabel={l}
            animationDuration={(0.2 + Math.max(0.1, i/10)) / 2}
          />
        ))}
      </div>
    );
  }
}
