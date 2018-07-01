import React from 'react';

import {
  offsetBetween,
  offsetToDocument
} from '../../../helpers/paralaxHelpers';
import Arrow from '../../../components/Arrow';
import Slider from '../../../components/Slider';
import style from './style.css';

export default class Project extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showInfo: false
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
    if (projectElem) {
      scrollDistance = Math.round(offsetToDocument(projectElem).top);
    }
    this.props.addPlacement(this.props.iteration, {
      scrollDistance,
      color: this.props.project.primaryColor,
      icons: this.props.project.technologies.map(t => t.icon)
    });
  }

  toggleInfo() {
    this.setState({ showInfo: !this.state.showInfo });
  }

  render() {
    const { showInfo } = this.state;
    const { projectSection, project } = this.props;
    const { endClientTitle, roleTitle, technologiesTitle } = projectSection;
    const p = project;

    return (
      <article ref="project-ref" key={p.endClient} className="project">
        <header>
          <span>{p.agency}</span>:<b>{p.endClient}</b>
        </header>
        <section className={`description ${showInfo ? 'show' : 'hide'}`}>
          <Slider />
          <h3
            className="more-info interactive"
            onClick={() => this.toggleInfo()}>
            More Info
          </h3>
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
