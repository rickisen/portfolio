import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadFormSettings } from '../../modules/contactForm';
import { loadProjects, loadProjectSection } from '../../modules/projects';
import { loadSiteSettings } from '../../modules/siteSettings';

class Home extends React.Component {
  componentWillMount() {
    this.props.loadSiteSettings();
    this.props.loadFormSettings();
    this.props.loadProjectSection();
    this.props.loadProjects();
  }

  render() {
    const { siteSettings, projects, contactForm } = this.props;

    const anyLoading =
      siteSettings.loading ||
      projects.loadingProjects ||
      projects.loadingSection ||
      contactForm.loading;
    if (anyLoading) {
      return (
        <div className="loading">
          <p>loading...</p>
        </div>
      );
    }

    const { hero } = siteSettings.siteSettings;
    const {
      endClientTitle,
      roleTitle,
      title,
      technologiesTitle
    } = projects.projectSection;
    return (
      <div>
        <header className="hero">
          <img src={hero.image} alt="portrait of me" />
          <h1>{hero.title}</h1>
          <h2>{hero.subTitle}</h2>
          <p>{hero.title}</p>
        </header>
        <section className="projects-section">
          <h2>{title}</h2>
          <div>
            {projects.projects.map((p, i) => (
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
                    <ul>
                      {p.technologies.map((t, i) => <li key={i}>{t.name}</li>)}
                    </ul>
                  </div>
                </section>
              </article>
            ))}
          </div>
        </section>
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
  bindActionCreators(
    {
      loadFormSettings,
      loadProjectSection,
      loadProjects,
      loadSiteSettings
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
