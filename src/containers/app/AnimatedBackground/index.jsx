import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import style from './style.css';

class AnimatedBackground extends React.Component {
  render() {
    return (
      <div className="animated-background">
        <svg height="100%" width="100%">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:"rgb(0,0,0)", stopOpacity:1}} />
              <stop offset="50%" style={{stopColor:"rgb(0,50,50)", stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:"rgb(0,100,100)", stopOpacity:1}} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)"/>
        </svg>
      </div>
      );
  }
}

const mapStateToProps = ({ projects, siteSettings, contactForm }) => ({
  projects,
  contactForm,
  siteSettings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedBackground);

