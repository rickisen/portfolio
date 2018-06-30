import React from "react";
import seedrandom from 'seedrandom';
import PropTypes from 'prop-types';

import svgPaths from "../helpers/svgPaths";
import style from "./LogoPaths.css";

export default class LogoPath extends React.Component {
  static propTypes = {
    animationDuration: PropTypes.number,
    seed: PropTypes.string,
    currentWindowWidth: PropTypes.number,
    currentWindowHeight: PropTypes.number,
    i: PropTypes.number,
    scale: PropTypes.number,
    filter: PropTypes.string,
  }

  static defaultProps = {
    animationDuration: 0.4,
    seed: 'seed',
    currentWindowWidth: 1200,
    currentWindowHeight: 900,
    i: 4,
    scale: 1,
    filter: '',
  }

  constructor(props) {
    super(props);

    this.timeoutId = null;

    this.state = {
      currentLabel: 'default',
      animate: 'in',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pathLabel } = nextProps;
    if (pathLabel && pathLabel != this.props.pathLabel) {
      this.transitionTo(pathLabel);
    }
  }

  componentDidMount() {
    this.animateIn();
  }

  componentWillUnmount() {
    this.animateOut();
  }

  animateOut(cb = () => {}) {
    if (this.refs['animationOut']) {
      this.refs['animationOut'].beginElement();
    }
    this.setState({animate: 'out'}, cb)
  }

  animateIn(cb = () => {}) {
    if (this.refs['animationIn']) {
      this.refs['animationIn'].beginElement();
    }
    this.setState({animate: 'in'}, cb)
  }

  clearAnimation() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  transitionTo(newLabel) {
    const {transitionDelay, animationDuration} = this.props;
    this.clearAnimation();
    this.timeoutId = setTimeout(() => {
      this.animateOut();
      this.timeoutId = setTimeout(() => {
        this.setState({currentLabel: newLabel}, () => {
          this.animateIn();
        })
      }, animationDuration * 1000);
    }, transitionDelay * 1000)
  }

  render() {
    const { currentLabel, animate} = this.state;
    const {
      animationDuration,
      seed,
      currentWindowHeight,
      currentWindowWidth,
      i,
      scale,
      filter,
    } = this.props;

    let currentPath = svgPaths['default'];
    if (currentLabel in svgPaths) {
      currentPath = svgPaths[currentLabel];
    }

    const vertical   = seedrandom(i + 'vertical' + seed);
    const horizontal = seedrandom(i + 'horizontal' + seed);
    const timeRng    = seedrandom(i + 'timing' + seed);

    const verticalPos   = Math.round(vertical() * currentWindowHeight) * -1;
    const horizontalPos = Math.round(horizontal() * currentWindowWidth);
    const timingOffset  = ((timeRng() * 5) + 4);

    return (
      <svg
        key={'' + horizontalPos + verticalPos}
        height="50"
        width="50"
        style={{
          transform: `translate(${horizontalPos}px, ${verticalPos}px) scale(${scale}) ${animate === 'in'? 'rotate3d(0, 0, 0, 0)' : 'rotate3d(0, 1, 0, 90deg)'}`,
          transitionDuration: animationDuration + 's',
          transitionProperty: 'transform',
          transitionTimingFunction: 'linear',
          ...this.props.syle,
        }}
        className={'logo-path'}
      >
        <g strokeWidth="0" filter={filter}>
          <path d={currentPath}></path>
          <animate attributeName="opacity" values="0.99;0.20;0.99" dur={`${timingOffset}s`} repeatCount="indefinite"/>
        </g>
      </svg>
    );
  }
}
