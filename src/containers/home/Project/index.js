import React from 'react';
import PropTypes from 'prop-types';

import {
  offsetBetween,
  offsetToDocument
} from '../../../helpers/paralaxHelpers';
import Arrow from '../../../components/Arrow';
import Cross from '../../../components/Cross';
import Slider from '../../../components/Slider';
import style from './style.css';

export default class Project extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    iteration: PropTypes.number,
    projectSection: PropTypes.object,
    addPlacement: PropTypes.func,
    currentOffset: PropTypes.number,
    currentWindowHeight: PropTypes.number
  };

  static defaultProps = {
    project: {},
    iteration: 0,
    projectSection: {},
    addPlacement: () => {},
    currentOffset: 10,
    currentWindowHeight: 1000
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      showInfo: false,
      animateInfo: false,
      scrollDistance: 1000,
      projHeight: 500
    };
  }

  componentDidMount() {
    this.registerPlacmentThemes();
  }

  componentDidUpdate(prevProps, prevState) {
    this.registerPlacmentThemes();
  }

  registerPlacmentThemes() {
    const projectElem = this.refs['project-ref'];
    let scrollDistance = 1000 * this.props.iteration; // just to guard in case of serverside rendering
    let projHeight = 500;

    if (projectElem) {
      scrollDistance = Math.round(offsetToDocument(projectElem).top);
      projHeight = projectElem.scrollHeight;
    }
    this.props.addPlacement(this.props.iteration, {
      scrollDistance,
      color: this.props.project.primaryColor,
      icons: this.props.project.technologies.map(t => t.icon)
    });
    if (scrollDistance !== this.state.scrollDistance) {
      this.setState({ scrollDistance, projHeight });
    }
  }

  toggleInfo() {
    const { showInfo, animateInfo } = this.state;
    if (showInfo) {
      this.setState({ animateInfo: false });
      setTimeout(() => this.setState({ showInfo: false }), 200);
    } else {
      this.setState({ animateInfo: false, showInfo: true }, () =>
        this.setState({ animateInfo: true })
      );
    }
  }

  // returns val between 0 and 1,
  // 0 before it's in view,
  // 0.5 when in middle,
  // 1.0 when scrolled passed
  // (clamped)
  relativeToViewport() {
    const { currentOffset, currentWindowHeight } = this.props;
    const { scrollDistance, projHeight } = this.state;
    const relativeTop = (currentOffset - scrollDistance) / projHeight;
    const relativeBot =
      (currentOffset + currentWindowHeight - scrollDistance) / projHeight;
    return Math.max(0, Math.min(1, (relativeTop + relativeBot / 2 + 1) / 3));
  }

  render() {
    const { showInfo, animateInfo } = this.state;
    const { iteration, projectSection, project, currentOffset } = this.props;
    const { endClientTitle, roleTitle, technologiesTitle } = projectSection;
    const p = project;
    const inView = this.relativeToViewport();
    const activated = inView > 0.25 && inView < 0.65;

    return (
      <article
        ref="project-ref"
        key={p.endClient}
        className={`project ${activated && 'activated'}`}
        style={{
          opacity: inView * 1.75 + 0.25
        }}>
        <header>
          <span>{p.agency}</span>:<b>{p.endClient}</b>
        </header>
        <section className="description">
          <Slider
            media={p.media}
            activated={activated}
            inView={inView}
            iteration={iteration}
          />
          <h3
            className="more-info interactive"
            onClick={() => this.toggleInfo()}>
            More Info
          </h3>
          {showInfo && (
            <div
              className={`content ${
                animateInfo ? 'animate-fade-in-200' : 'animate-fade-out-200'
              }`}
              style={{ backgroundColor: p.primaryColor }}>
              <h3>{p.title}</h3>
              <header>
                <p>
                  {endClientTitle}:<b>{p.endClient}</b>
                </p>
                <p>
                  {roleTitle}:<b>
                    {' '}
                    {p.role.reduce((acc, next) => acc + ', ' + next)}{' '}
                  </b>
                </p>
                <Cross
                  className="content-close"
                  onClick={() => this.toggleInfo()}
                />
              </header>
              <p className="paragraph">{p.description}</p>
              <div>
                <h4>{technologiesTitle}:</h4>
                <ul>
                  {p.technologies.map((t, i) => <li key={i}>{t.name}</li>)}
                </ul>
              </div>
            </div>
          )}
        </section>
      </article>
    );
  }
}
