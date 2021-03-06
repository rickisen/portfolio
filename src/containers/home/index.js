import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addAnimationCallBack } from '../../helpers/paralaxHelpers';
import { addPlacement, clearIcons } from '../../modules/themes';
import { loadFormSettings } from '../../modules/contactForm';
import { loadProjects, loadProjectSection } from '../../modules/projects';
import { loadSiteSettings } from '../../modules/siteSettings';
import Project from './Project';
import style from './style.css';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentOffset: 10,
      currentWindowHeight: 1000
    };
  }

  componentWillReceiveProps(nextProps) {}

  componentWillMount() {
    this.props.loadSiteSettings();
    this.props.loadFormSettings();
    this.props.loadProjectSection();
    this.props.loadProjects();

    addAnimationCallBack(({ currentOffset, currentWindowHeight }) => {
      if (
        currentOffset !== this.state.currentOffset ||
        currentWindowHeight !== this.state.currentWindowHeight
      ) {
        this.setState({ currentOffset, currentWindowHeight });
      }
    });
  }

  render() {
    const { siteSettings, projects, contactForm } = this.props;
    const { currentOffset, currentWindowHeight } = this.state;

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
    const { title } = projects.projectSection;
    return (
      <div className="view home-view">
        <header className="hero">
          <img src={hero.image} alt="portrait of me" />
          <h1>{hero.title}</h1>
          <h2>{hero.subTitle}</h2>
          <p>{hero.paragraph}</p>
        </header>
        <section className="projects-section">
          <h2>{title}</h2>
          <div>
            {projects.projects.map((p, i) => (
              <Project
                project={p}
                iteration={i}
                projectSection={projects.projectSection}
                addPlacement={(k, v) => this.props.addPlacement(k, v)}
                currentOffset={currentOffset}
                currentWindowHeight={currentWindowHeight}
              />
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
      loadSiteSettings,
      addPlacement
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
