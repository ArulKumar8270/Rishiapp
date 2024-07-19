import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRightFromBracket, faBookmark, faClipboard, faGear, faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import { TextInput, Icon } from 'react-native-paper';
import {
  Title,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Button
} from "react-native";
import { Overlay } from 'react-native-elements';
import { fonts } from "../../../config";
import { SideMenuIcon, ThumbsDown, Thumbsup } from "../../assets/svg";

export default function Header({ title, navigation, isMainPage }) {
  const [navDraw, setNavDraw] = useState(false);
  const [imageLiked, setImageLiked] = useState(false);
  const [imageDislike, setImageDislike] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Login'); // Replace 'Login' with your actual login screen route
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
        containerStyle: { backgroundColor: '#ffffff', borderRadius: 10 },
        messageStyle: { fontSize: 16, color: '#333333' },
        titleStyle: { fontSize: 18, fontWeight: 'bold', color: '#000000' },
      }
    );
  };

  const handleImageLike = () => {
    setImageLiked(!imageLiked);
  };

  const handleImageDislike = () => {
    setImageDislike(!imageDislike);
  };

  const renderDetails = (value, naviPath, isLogout, icon) => (
    <TouchableOpacity onPress={() => {
      setNavDraw(!navDraw);
      if (naviPath) {
        navigation.navigate(naviPath);
      } else if (isLogout) {
        handleLogout();
      }
    }}>
      <View style={{ padding: 10, marginTop: 10 }}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          {icon}
          <Text style={{ fontSize: 14, fontFamily: fonts.CircularStdBook, color: '#17202A', paddingLeft: 10 }}>
            {value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {!isMainPage ?
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => setNavDraw(!navDraw)}>
            <SideMenuIcon width={25} height={25} />
          </TouchableOpacity>
        }

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {title ? title : "Home"}
          </Text>
        </View>
      </View>

      <Overlay
        isVisible={navDraw}
        animationType="fade"
        onBackdropPress={() => setNavDraw(!navDraw)}
        overlayStyle={styles.overlay}
        animationConfig={{ duration: 500 }}>
        <ScrollView>
          <TouchableOpacity onPress={() => isMainPage ? setNavDraw(!navDraw) : navigation.goBack()} >
            <View>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginLeft: '5%' }} />
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: '6%', marginLeft: '3%' }}>
            {renderDetails("Company Profile", "Post", false, <FontAwesomeIcon icon={faMagnifyingGlass} />)}
            {renderDetails("Create Jobs", "CreateJob", false, <FontAwesomeIcon icon={faHouse} />)}
            {renderDetails("Candidates", "Candidates", false, <FontAwesomeIcon icon={faClipboard} />)}
            {renderDetails("Settings", "Settings", false, <FontAwesomeIcon icon={faGear} />)}
            {renderDetails("Jobs", "Jobs", false, <FontAwesomeIcon icon={faBookmark} />)}
            {renderDetails("Log out", null, true, <FontAwesomeIcon icon={faArrowRightFromBracket} />)}
          </View>
          <View style={styles.bottomContent}>
            <Text style={{ fontFamily: fonts.CircularStdBook, color: '#000066' }}>Finding this app useful?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={handleImageLike} style={{ marginLeft: '2%' }}>
                <Thumbsup height={20} width={20} color={imageLiked ? 'red' : '#566573'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleImageDislike}>
                <ThumbsDown height={20} width={20} color={imageDislike ? 'red' : '#566573'} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: '5%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  titleText: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: fonts.CircularStdBlack,
    color: '#2C3E50',
  },
  overlay: {
    opacity: 1.9,
    width: '80%',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    right: 0,
    paddingRight: '8%',
    marginTop: '1%',
  },
  logoImage: {
    height: 50,
    marginTop: '10%',
    borderRadius: 30,
    alignSelf: 'center',
    aspectRatio: 1,
    borderColor: '#85C1E9',
    borderWidth: 1
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: '150%',
    padding: 10,
  },
  profilecontainer: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgcontainer: {},
  profile: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderColor: '#85C1E9',
    borderWidth: 3
  },
  Procontainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});
