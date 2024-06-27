/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import './firebase';

<PaperProvider>
    <RootSiblingParent>
    {
        AppRegistry.registerComponent(appName, () =>    
            App
        )
    }
    </RootSiblingParent>
</PaperProvider>
