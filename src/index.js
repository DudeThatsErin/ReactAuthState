/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import appConfig from './app.json';  // Default import
const { name: appName } = appConfig;  // Destructure name from the default import

// Register the app for web
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
