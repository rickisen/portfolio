import jsonData from './data.json';

export function getSiteSettings() {
  return JSON.parse(jsonData).siteSettings;
}

export function getSection(section) {
  return JSON.parse(jsonData).sections[section];
}

export function getProjects() {
  return JSON.parse(jsonData).projects;
}
