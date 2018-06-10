import jsonData from './data.json';

export function getSiteSettings() {
  return jsonData.siteSettings;
}

export function getSection(section) {
  return jsonData.sections[section];
}

export function getProjects() {
  return jsonData.projects;
}
