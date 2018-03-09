import runtimeEnv from '@mars/heroku-js-runtime-env';
import Butter from 'buttercms';

export default (butter = Butter(runtimeEnv().REACT_APP_BUTTER_TOKEN));

// butter.page
//   .list('project', {})
//   .then(function(resp) {
//     console.log(resp.data);
//   })
//   .catch(function(resp) {
//     console.log(resp);
//   });
