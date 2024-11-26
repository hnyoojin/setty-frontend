/**
 * @format
 */
import 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';
enableScreens();

import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
