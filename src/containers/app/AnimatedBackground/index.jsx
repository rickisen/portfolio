import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Color from 'color';

import * as paralaxHelpers from '../../../helpers/paralaxHelpers';
import LogoPaths from '../../../components/LogoPaths';
import IconLayer from './IconLayer';
import style from './style.css';

class AnimatedBackground extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentOffset: 0,
      relativeOffset: 0,
      currentWindowHeight: paralaxHelpers.currentWindowHeight,
      currentWindowWidth: paralaxHelpers.currentWindowWidth,
      currentDocumentHeight: 0,
    };
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
    });
  }

  // TODO: Add comments, kinda strange function
  getCurrentTheme(position = 0) {
    const { currentDocumentHeight } = this.state;

    let firstColorPos = {color: 'rgb(0,0,0)', scrollDistance: 1};
    let nextColorPos  = {color: 'rgb(200,255,10)', scrollDistance: 1000};
    let mixAmmount    = 0.5;
    let closestAbove  = currentDocumentHeight * -1;
    let closestBellow = currentDocumentHeight;
    let theme = {
      mixedColor: Color('rgb(0,0,0)'),
      icons: [],
    };

    this.props.themes.placements.forEach((colorPos) => {
      let proximity = position - colorPos.scrollDistance;
      if (proximity < 0 && proximity > closestAbove) {
        closestAbove = proximity;
        firstColorPos = colorPos;
        theme.icons = colorPos.icons;
      } else if ( proximity >= 0 && proximity < closestBellow ) {
        closestBellow = proximity;
        nextColorPos = colorPos;
      }
    });
    mixAmmount = Math.min((nextColorPos.scrollDistance - position) / (nextColorPos.scrollDistance - firstColorPos.scrollDistance), 1)
    theme.mixedColor = Color(nextColorPos.color).mix(Color(firstColorPos.color), mixAmmount);

    return theme;
  }

  render() {
    const { currentWindowHeight, currentWindowWidth, relativeOffset, currentOffset } = this.state;
    let { mixedColor, icons } = this.getCurrentTheme(currentOffset);

    return (
      <div className="animated-background">
        <svg className="grad-bg" height="100%" width="100%">
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
        </svg>
        <IconLayer
          seed="first"
          labels={icons}
          currentWindowWidth={currentWindowWidth}
          currentWindowHeight={currentWindowHeight}
          verticalOffset={(relativeOffset * -500) + currentWindowHeight + 200}
          scale={1}
          quantity={10}
        />
        <IconLayer
          seed="second"
          labels={icons}
          currentWindowWidth={currentWindowWidth}
          currentWindowHeight={currentWindowHeight}
          verticalOffset={(relativeOffset * -250) + currentWindowHeight + 200}
          scale={0.75}
          quantity={10}
        />
        <IconLayer
          seed="third"
          labels={icons}
          currentWindowWidth={currentWindowWidth}
          currentWindowHeight={currentWindowHeight}
          verticalOffset={(relativeOffset * -100) + currentWindowHeight + 200}
          scale={0.5}
          quantity={10}
        />
      </div>
    );
  }
}

const mapStateToProps = ({themes, siteSettings}) => ({
  themes,
  siteSettings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedBackground);

