import React from 'react';
import seedrandom from 'seedrandom'

import LogoPaths from '../../../components/LogoPaths';

export default class IconLayer extends React.Component {
  static defaultProps = {

  }

  render () {
    const {seed, labels, currentWindowWidth, currentWindowHeight, verticalOffset, scale, count, filter = ''} = this.props;
    let arr = [];
    let k = 0;
    for (let j = 0 ; j < count; j++) {
      if (k < labels.length) {
        arr.push(labels[k]);
      } else {
        k = 0;
        arr.push(labels[k])
      }
      k++;
    }

    return (
      <g fill="transparent" strokeWidth="3" stroke="white" transform={`translate(0 ${verticalOffset})`}>
        {arr.map((l, i) => {
          const vertical = seedrandom(i + 'vertical' + seed);
          const horizontal = seedrandom(i + 'horizontal' + seed);
          const timeRng = seedrandom(i + 'timing' + seed);

          const verticalOffset = Math.round(vertical() * currentWindowHeight) * -1;
          const horizontalOffset = Math.round(horizontal() * currentWindowWidth);
          const timingOffset = ((timeRng() * 5) + 4);

          return (
            <g key={'' + horizontalOffset + verticalOffset} strokeWidth="0" transform={`translate(${horizontalOffset} ${verticalOffset}) scale(${scale})`} filter={filter}>
              <LogoPaths pathLabel={l} i={i}/>
              {/* <animateMotion path="M 0,0	Q 50,-50 0,-350 T 0,-750 T 0,-1000 T 0,-1250 T 0,-1750" dur={`${(timingOffset)}s`} repeatCount="indefinite" /> */}
              <animate attributeName="opacity" values="0.99;0.20;0.99" dur={`${timingOffset}s`} repeatCount="indefinite"/>
            </g>
          );
        })}
      </g>
    );
  }
}
