import React from 'react';

import style from './style.css';

export default class Project extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      intervalId: null,
      activeSlide: 0
    };
  }

  componentWillMount() {
    setTimeout(() => this.startSlider(), this.props.iteration * 1000 || 0);
  }

  componentWillUnmount() {
    this.stopSlider();
  }

  startSlider() {
    this.stopSlider();
    let intervalId = setInterval(() => this.incrementSlide(), 4500);
    this.setState({ intervalId });
  }

  stopSlider() {
    clearInterval(this.state.intervalId);
  }

  incrementSlide() {
    let { activeSlide } = this.state;
    this.setState({
      activeSlide:
        activeSlide < this.props.project.media.length - 1 ? ++activeSlide : 0
    });
  }

  render() {
    const { activeSlide } = this.state;
    const { projectSection, project } = this.props;
    const { endClientTitle, roleTitle, technologiesTitle } = projectSection;
    const p = project;

    return (
      <article
        key={p.endClient}
        className="project"
        onClick={() => this.incrementSlide()}
        onMouseEnter={() => this.stopSlider()}
        onMouseLeave={() => this.startSlider()}>
        <header>
          <span>{p.agency}</span>:<b>{p.endClient}</b>
        </header>
        <section className="description">
          <section className="slider">
            {p.media.map((m, i, arr) => (
              <div
                className={
                  i === activeSlide
                    ? 'background-image current'
                    : i == activeSlide + 1 ||
                      (activeSlide === arr.length - 1 && i === 0)
                      ? 'background-image next'
                      : 'background-image prev'
                }
                style={{ backgroundImage: `url(${m})` }}
                key={i}>
                {' '}
              </div>
            ))}
          </section>
          <h3>{p.title}</h3>
          <header>
            <p>
              {endClientTitle}:<b>{p.endClient}</b>
            </p>
            <p>
              {roleTitle}:<b>
                {p.role.reduce((acc, next) => acc + ', ' + next)}
              </b>
            </p>
          </header>
          <p className="paragraph">{p.description}</p>
          <div>
            <h4>{technologiesTitle}:</h4>
            <ul>{p.technologies.map((t, i) => <li key={i}>{t.name}</li>)}</ul>
          </div>
        </section>
      </article>
    );
  }
}
