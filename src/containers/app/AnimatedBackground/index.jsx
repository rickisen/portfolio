import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Color from 'color';

import { addAnimationCallBack } from '../../../helpers/paralaxHelpers';
import style from './style.css';

class AnimatedBackground extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      timer: null,
      currentOffset: 0,
      relativeOffset: 0,
      currentWindowHeight: 0,
      currentDocumentHeight: 0,
    }
  }

  componentWillMount() {
    addAnimationCallBack(({currentOffset, relativeOffset, currentWindowHeight, currentDocumentHeight}) => {
      if (
        currentOffset != this.state.currentOffset ||
        relativeOffset != this.state.relativeOffset ||
        currentWindowHeight != this.state.currentWindowHeight ||
        currentDocumentHeight != this.state.currentDocumentHeight
      ) {
        this.setState({currentOffset, relativeOffset, currentWindowHeight, currentDocumentHeight});
      }
    })
  }

  colorMix(position = 0) {
    const { currentDocumentHeight } = this.state;

    let firstColorPos = {color: 'rgb(0,0,0)', scrollDistance: 0};
    let nextColorPos  = {color: 'rgb(255,255,10)', scrollDistance: 1000};
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
    const { currentWindowHeight, trelativeOffset, currentOffset } = this.state;
    let mixedColor = this.colorMix(currentOffset);

    return (
      <div className="animated-background">
        <svg height="100%" width="100%">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:`rgb(0,0,0)`, stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:mixedColor.rgb(), stopOpacity:1}} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)"/>
        </svg>
      </div>
      );
  }
}

const mapStateToProps = ({colors, siteSettings}) => ({
  colors,
  siteSettings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedBackground);

