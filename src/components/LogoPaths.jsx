import React from "react";
import svgPaths from "../helpers/svgPaths";

export default class LogoPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLabel: 'default',
    };
  }

  componentWillMount() {
    const { pathLabel } = this.props;
    if (pathLabel) {
      this.setState({currentLabel: pathLabel});
    } else {
      this.setState({currentLabel: 'default'});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pathLabel } = nextProps;
    if (pathLabel) {
      this.setState({currentLabel: pathLabel});
    } else {
      this.setState({currentLabel: 'default'});
    }
  }

  render() {
    const { currentLabel } = this.state;
    const currentPath = svgPaths[currentLabel];
    return (
      <path d={currentPath} {...this.props} />
    );
  }
}
