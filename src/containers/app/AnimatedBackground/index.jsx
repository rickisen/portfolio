import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Color from 'color';
import seedrandom from 'seedrandom'

import * as paralaxHelpers from '../../../helpers/paralaxHelpers';
import LogoPaths from '../../../components/LogoPaths';
import style from './style.css';

class AnimatedBackground extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      timer: null,
      currentOffset: 0,
      relativeOffset: 0,
      currentWindowHeight: paralaxHelpers.currentWindowHeight,
      currentWindowWidth: paralaxHelpers.currentWindowWidth,
      currentDocumentHeight: 0,
    }
  }

  componentWillMount() {
    paralaxHelpers.addAnimationCallBack(({currentOffset, relativeOffset, currentWindowWidth, currentWindowHeight, currentDocumentHeight}) => {
      if (
        currentOffset !== this.state.currentOffset ||
        relativeOffset !== this.state.relativeOffset ||
        currentWindowHeight !== this.state.currentWindowHeight ||
        currentWindowWidth !== this.state.currentWindowWidth ||
        currentDocumentHeight !== this.state.currentDocumentHeight
      ) {
        this.setState({currentOffset, relativeOffset, currentWindowHeight, currentWindowWidth, currentDocumentHeight});
      }
    })
  }

  colorMix(position = 0) {
    const { currentDocumentHeight } = this.state;

    let firstColorPos = {color: 'rgb(0,0,0)', scrollDistance: 0};
    let nextColorPos  = {color: 'rgb(200,255,10)', scrollDistance: 1000};
    let mixAmmount    = 0.5;
    let closestAbove  = currentDocumentHeight * -1;
    let closestBellow = currentDocumentHeight;

    this.props.colors.colors.forEach((colorPos) => {
      let proximity = position - colorPos.scrollDistance;
      if (proximity < 0 && proximity > closestAbove) {
        closestAbove = proximity;
        firstColorPos = colorPos;
      } else if ( proximity >= 0 && proximity < closestBellow ) {
        closestBellow = proximity;
        nextColorPos = colorPos;
      }
    });

    mixAmmount = Math.min((nextColorPos.scrollDistance - position) / (nextColorPos.scrollDistance - firstColorPos.scrollDistance), 1)

    return Color(nextColorPos.color).mix(Color(firstColorPos.color), mixAmmount);
  }

  render() {
    const { currentWindowHeight, currentWindowWidth, relativeOffset, currentOffset } = this.state;
    let mixedColor = this.colorMix(currentOffset);

    const pl = [
      'react',
      'unity3d',
      'heroku',
      'unity3d',
      'react',
      'heroku',
      'unity3d',
      'heroku',
      'react',
      'heroku',
    ];

    return (
      <div className="animated-background">
        <svg height="100%" width="100%">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:`rgb(0,0,0)`, stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:mixedColor.rgb(), stopOpacity:1}} />
            </linearGradient>
            <filter id="softglow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)"/>
          <IconLayer
            seed="first"
            labels={pl}
            currentWindowWidth={currentWindowWidth}
            currentWindowHeight={currentWindowHeight}
            verticalOffset={(relativeOffset * -500) + currentWindowHeight + 200}
            scale={1}
          />
          <IconLayer
            seed="second"
            labels={pl}
            currentWindowWidth={currentWindowWidth}
            currentWindowHeight={currentWindowHeight}
            verticalOffset={(relativeOffset * -250) + currentWindowHeight + 200}
            scale={0.75}
          />
          <IconLayer
            seed="third"
            labels={pl}
            currentWindowWidth={currentWindowWidth}
            currentWindowHeight={currentWindowHeight}
            verticalOffset={(relativeOffset * -100) + currentWindowHeight + 200}
            scale={0.5}
          />
        </svg>
      </div>
      );
  }
}

const IconLayer = ({seed, labels, currentWindowWidth, currentWindowHeight, verticalOffset, scale, filter = ''}) => {
  return (
    <g fill="transparent" strokeWidth="3" stroke="white" transform={`translate(0 ${verticalOffset})`}>
      {labels.map((l, i) => {
        const vertical = seedrandom(i + 'vertical' + seed);
        const horizontal = seedrandom(i + 'horizontal' + seed);
        const timeRng = seedrandom(i + 'timing' + seed);

        const verticalOffset = Math.round(vertical() * currentWindowHeight) * -1;
        const horizontalOffset = Math.round(horizontal() * currentWindowWidth);
        const timingOffset = ((timeRng() * 5) + 4);

        return (
          <g key={i} fill={`rgba(255,255,255,${scale})`} strokeWidth="0" transform={`translate(${horizontalOffset} ${verticalOffset}) scale(${scale})`} filter={filter}>
            <LogoPaths pathLabel={l} />
            {/* <animateMotion path="M 0,0	Q 50,-50 0,-350 T 0,-750 T 0,-1000 T 0,-1250 T 0,-1750" dur={`${(timingOffset)}s`} repeatCount="indefinite" /> */}
            <animate attributeName="opacity" values="0.99;0.20;0.99" dur={`${timingOffset}s`} repeatCount="indefinite"/>
          </g>
        );
      })}
    </g>
  );
}

const mapStateToProps = ({colors, siteSettings}) => ({
  colors,
  siteSettings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedBackground);

