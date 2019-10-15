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

import axios from 'axios';

import {Header} from 'react-native/Libraries/NewAppScreen';

// import DeepLinking from 'react-native-deep-linking';

class App extends Component {
  state = {
    dataLoaded: false,
  };

  componentDidMount() {
    console.log('called passed');

    // this.callAP();

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log('url', url);
          let transactionId = url.toString().split('?')[1];
          console.log('transactionId', transactionId);
          // this.callSecretAPI();
          this.setState({transactionId});
          this.getCustomerDetails(transactionId);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }

  getCustomerDetails = async TransactionId => {
    console.log('transactionId', TransactionId);

    const headers = {
      contentType: 'application/json',
      accept: 'application/json',
      authorization: 'Basic VGl0YW5fTXVsZTpBY2VUaXRhbiMyMCE5',
    };

    axios
      .post(
        'https://clientele-sfdc-integration.us-e2.cloudhub.io/api/ct/getCustomer',
        {TransactionId},
        {headers},
      )
      .then(response => {
        console.log('Authorization passed : ', response.data);
        this.setState({
          dataLoaded: true,
          data: response.data,
        });
      })
      .catch(error => {
        console.log('Authorization failed : ' + error.message);
      });
  };

  // callSecretAPI = async token => {
  //   console.log('[callSecretAPI]');
  //   fetch('http://rn-link.herokuapp.com/users/secret', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer' + token,
  //     },
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
    const {data, dataLoaded} = this.state;
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
            {dataLoaded ? (
              <View>
                <Text>Data dataLoaded: {JSON.stringify(data)}</Text>
              </View>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default App;
