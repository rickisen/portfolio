import React from 'react';

export default class Project extends React.Component {
  render() {
    const { projectSection, project } = this.props;
    const { endClientTitle, roleTitle, technologiesTitle } = projectSection;
    const p = project;

    return (
      <article key={p.endClient}>
        <header>
          <span>{p.agency}</span>:<span>{p.endClient}</span>
        </header>
        <section className="slider">
          {p.media.map((m, i) => <img src={m} key={i} alt="" />)}
        </section>
        <section className="description">
          <h3>{p.title}</h3>
          <header>
            <span>
              {endClientTitle}:<b>{p.endClient}</b>
            </span>
            <span className="float-right">
              {roleTitle}:<b>
                {p.role.reduce((acc, next) => acc + ', ' + next)}
              </b>
            </span>
          </header>
          <p>{p.description}</p>
          <div>
            <h4>{technologiesTitle}:</h4>
            <ul>{p.technologies.map((t, i) => <li key={i}>{t.name}</li>)}</ul>
          </div>
        </section>
      </article>
    );
  }
}
