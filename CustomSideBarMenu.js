import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import db from '../config';
export default class CustomSideBarMenu extends Component {
  state = {
    userId: firebase.auth().currentUser.email,
    image: '#',
    name: '',
    docId: '',
  };
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.setState({ image: uri });
      this.uploadImage(uri, this.state.userId);
    }
  };
  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };
  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };
  getUserProfile() {
    db.collection('users')
      .where('email_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + ' ' + doc.data.last_name,
          });
        });
      });
  }
  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            backgroundColor: '#343434',
          }}>
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            size="xlarge"
            onPress={() => this.selectPicture()}
            containerStyle={styles.imageContainer}
            showEditButton
          />
          <Text
            style={{
              fontWeight: '200',
              fontSize: 38,
              paddingTop: 20,
            }}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
              firebase.auth().signOut();
            }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.8,
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  logOutButton: {
    height: 30,
    width: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  logOutText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
