import React from 'react';

import {
  offsetBetween,
  offsetToDocument
} from '../../../helpers/paralaxHelpers';
import Arrow from '../../../components/Arrow';
import style from './style.css';

export default class Project extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.prevScrollDistance = 0;

    this.state = {
      locked: false,
      intervalId: null,
      activeSlide: 0,
      showInfo: false
    };
  }

  componentWillMount() {
    setTimeout(() => this.startSlider(), this.props.iteration * 1000 || 0);
  }

  componentWillUnmount() {
    this.stopSlider();
  }

  componentDidUpdate(prevProps, prevState) {
    const projectElem = this.refs['project-ref'];
    let scrollDistance = 1000 * this.props.iteration; // just to guard in case of serverside rendering
    if (projectElem) {
      scrollDistance = Math.round(offsetToDocument(projectElem).top);
    }
    this.props.addPlacement(this.props.iteration, {
      scrollDistance,
      color: this.props.project.primaryColor,
      icons: this.props.project.technologies.map(t => t.icon)
    });
  }

  startSlider() {
    this.stopSlider();
    let intervalId = setInterval(() => this.incrementSlide(), 4500);
    this.setState({ intervalId });
  }

  stopSlider() {
    clearInterval(this.state.intervalId);
    this.state.intervalId = null;
  }

  decrementSlide(qued = false) {
    let { activeSlide, locked } = this.state;
    if (!locked) {
      const mediaLength = this.props.project.media.length - 1;
      this.setState(
        {
          locked: true,
          activeSlide: activeSlide < mediaLength ? ++activeSlide : 0
        },
        () => {
          setTimeout(() => this.setState({ locked: false }), 800);
        }
      );
    } else if (!qued) {
      setTimeout(() => this.decrementSlide(true), 800);
    }
  }

  incrementSlide(qued = false) {
    let { activeSlide, locked } = this.state;
    if (!locked) {
      const mediaLength = this.props.project.media.length - 1;
      this.setState(
        {
          locked: true,
          activeSlide: activeSlide <= 0 ? mediaLength : --activeSlide
        },
        () => {
          setTimeout(() => this.setState({ locked: false }), 800);
        }
      );
    } else if (!qued) {
      setTimeout(() => this.incrementSlide(true), 800);
    }
  }

  toggleInfo() {
    this.setState({ showInfo: !this.state.showInfo });
  }

  render() {
    const { activeSlide, showInfo } = this.state;
    const { projectSection, project } = this.props;
    const { endClientTitle, roleTitle, technologiesTitle } = projectSection;
    const p = project;

    return (
      <article ref="project-ref" key={p.endClient} className="project">
        <header>
          <span>{p.agency}</span>:<b>{p.endClient}</b>
        </header>
        <section className={`description ${showInfo ? 'show' : 'hide'}`}>
          <section className="slider">
            {p.media.map((m, i, arr) => (
              <div
                key={i}
                className={`background-image ${
                  i === activeSlide
                    ? 'current'
                    : i == activeSlide + 1 ||
                      (activeSlide === arr.length - 1 && i === 0)
                      ? 'next'
                      : 'prev'
                }`}
                style={{ backgroundImage: `url(${m})` }}
                onClick={() => this.toggleInfo()}
              />
            ))}
            <Arrow
              key="arrow-back"
              direction="left"
              onClick={() => {
                this.decrementSlide();
                this.stopSlider();
              }}
              style={{ position: 'absolute', left: '-8rem', top: '15rem' }}
              className="arrow"
            />
            <Arrow
              key="arrow-next"
              direction="right"
              onClick={() => {
                this.incrementSlide();
                this.stopSlider();
              }}
              style={{ position: 'absolute', right: '-8rem', top: '15rem' }}
              className="arrow"
            />
          </section>
          <div
            className="content"
            onClick={() => this.toggleInfo()}
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
            </header>
            <p className="paragraph">{p.description}</p>
            <div>
              <h4>{technologiesTitle}:</h4>
              <ul>{p.technologies.map((t, i) => <li key={i}>{t.name}</li>)}</ul>
            </div>
          </div>
        </section>
      </article>
    );
  }
}
