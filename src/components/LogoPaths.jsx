import React from "react";
import svgPaths from "../helpers/svgPaths";
import style from "./LogoPaths.css";

export default class LogoPath extends React.Component {
  constructor(props) {
    super(props);

    this.timeoutId = null;

    this.state = {
      currentLabel: 'default',
      animate: 'out',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pathLabel } = nextProps;
    if (pathLabel && pathLabel != this.props.pathLabel) {
      this.transitionTo(pathLabel);
    }
  }

  componentDidMount() {
    if (this.refs['animationIn']) {
      this.refs['animationIn'].beginElement();
    }
  }

  componentWillUnmount() {
    if (this.refs['animationOut']) {
      this.refs['animationOut'].beginElement();
    }
  }

  transitionTo(newLabel) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.refs['animationIn'] && this.refs['animationOut']) {
      this.refs['animationOut'].beginElement();
      this.timeoutId = setTimeout(() => {
        this.setState({currentLabel: newLabel}, () => {
          this.refs['animationIn'].beginElement();
        })
      }, 200 + this.props.i);
    }
  }

  render() {
    const { currentLabel, animate} = this.state;
    const { i } = this.props;
    let currentPath = svgPaths['default'];
    const animationOffset = `${0.2 + Math.max(0.1, i/10)}`;
    if (currentLabel in svgPaths) {
      currentPath = svgPaths[currentLabel];
    }

    return (
      <path
        d={currentPath}
        style={this.props.style ? this.props.style : null}
      >
        <animate ref="animationOut" attributeName="fill" from="white" to="transparent" fill="freeze" dur={animationOffset} begin="indefinite" repeatCount="1"/>
        <animate ref="animationIn"  attributeName="fill" from="transparent" to="white" fill="freeze" dur={animationOffset} begin="indefinite" repeatCount="1"/>
      </path>
    );
  }
}
