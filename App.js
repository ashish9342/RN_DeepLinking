/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';

// import DeepLinking from 'react-native-deep-linking';

class App extends Component {
  state = {};

  componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log('url', url);
          let token = url.toString().split('?')[1];
          console.log('token', token);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Header />
            {global.HermesInternal == null ? null : (
              <View>
                <Text>Engine: Hermes</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default App;
