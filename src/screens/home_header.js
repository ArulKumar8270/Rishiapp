import React, { useState, useRef } from "react";
//mport { icon } from 'react-native-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons/faThumbsDown';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faClipboard} from '@fortawesome/free-solid-svg-icons/faClipboard';
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';
import {faChartSimple  } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import {faBlog} from '@fortawesome/free-solid-svg-icons/faBlog';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import ImagePicker from 'react-native-image-crop-picker';
import { TextInput,Icon} from 'react-native-paper';
// in App.js

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
import { SideMenuIcon, ThumbsDown, Thumbsup } from "../assets/svg";
import RBSheet from "react-native-raw-bottom-sheet";
import { fonts } from "../../config";
import { color } from "react-native-elements/dist/helpers";
export default function HomeHeader({ title, navigation, isMainPage }) {
  const [navDraw, setNavDraw] = useState(false);
  const [imageLiked, setImageLiked] = useState(false);
  const [imageDislike, setImageDislike] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');


  const handleLogout = () => {
    // Display a customized alert for logout confirmation
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
            // Perform logout actions if needed
            // Navigate to the login screen
            navigation.navigate('Login'); // Replace 'Login' with your actual login screen route
          },
          style: 'destructive', // Customize the button style for "Yes"
        },
      ],
      {
        cancelable: false,
        // Customize the alert container style
        containerStyle: { backgroundColor: '#ffffff', borderRadius: 10 },
        // Customize the alert message style
        messageStyle: { fontSize: 16, color: '#333333' },
        // Customize the alert title style
        titleStyle: { fontSize: 18, fontWeight: 'bold', color: '#000000' },
      }
    );
  };
  const handleImageLike = () => {
    // Toggle the state to change color and size
    setImageLiked(!imageLiked);
  };
  const handleImageDislike = () => {
    // Toggle the state to change color and size
    setImageDislike(!imageDislike);
  };
  

  const renderDetails = (value, naviPath, isLogout, icon,navigation) => (
    <TouchableOpacity onPress={() => setNavDraw(!navDraw)}>
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
            <SideMenuIcon width={25} height={25}/>
          </TouchableOpacity>
        }

        <View style={styles.titleContainer}>
         <Text style={styles.titleText}>
            {title ? title : "Dashboard"}
          </Text>
        </View>
      </View>
      

     <Overlay

      isVisible={navDraw}
      animationType="fade"
      onBackdropPress={() => setNavDraw(!navDraw)}
      overlayStyle={styles.overlay}
      animationConfig={{ duration:  500 }}>
      <ScrollView>
      <TouchableOpacity onPress={() => isMainPage ? setNavDraw(!navDraw) : navigation.goBack()} ><View>
  <FontAwesomeIcon icon={faArrowLeft} style={{marginLeft:'5%'}}/>
</View></TouchableOpacity>
        <View style={{ marginTop: '6%', marginLeft: '3%' }}>
          {renderDetails("Home", false, false,<FontAwesomeIcon icon={faHouse}/>)}
          {renderDetails("Search Jobs", false, false, <FontAwesomeIcon icon={faMagnifyingGlass} />)}
          {renderDetails("Recommended Jobs", false, false,<FontAwesomeIcon icon={faClipboard} />)}
          {renderDetails("Saved Jobs", false, false,<FontAwesomeIcon icon={faBookmark} /> )}
          {renderDetails("Profile Performance", false, false,<FontAwesomeIcon icon={faChartSimple} /> )}
          {renderDetails("Settings", false, false, <FontAwesomeIcon icon={faGear} />)}
          {renderDetails("How Rishi Job Works", false, false, <FontAwesomeIcon icon={faBriefcase} />)}
          {renderDetails("Rishi Job Blogs", false, false,<FontAwesomeIcon icon={faBlog} />)}
          {renderDetails("Write to Us", false, false,<FontAwesomeIcon icon={faPenToSquare} /> )}
          {renderDetails("About Us", false, false, <FontAwesomeIcon icon={faAddressCard} />)}
          {renderDetails("Log out", false, false, (
  <TouchableOpacity onPress={handleLogout}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
      <Text style={{ fontSize: 14, fontFamily: fonts.CircularStdBook, color: '#17202A', paddingLeft: 10 }}>
        Log out
      </Text>
    </View>
  </TouchableOpacity>
))}
        </View>
        <View style={styles.bottomContent}>
          <Text style={{ fontFamily: fonts.CircularStdBook, color: '#000066' }}>Finding this app useful?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={handleImageLike} style={{marginLeft:'2%'}}>
           <Thumbsup height={20} width={20} color={imageLiked ? 'red': '#566573'}/>
           </TouchableOpacity>
           <TouchableOpacity onPress={handleImageDislike}>
            <ThumbsDown height={20} width={20} color={imageDislike ?'red': '#566573'}/>
        </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </Overlay>

      <View style={styles.logoContainer}>
        <View>
          <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Image  source={ require('../assets/dp.png')} style={styles.logoImage}/>
          </TouchableOpacity>
          </View>
      </View>
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
    //flex:1,
    //alignItems:'flex-end',
    position: 'absolute',
    right: 0,
    paddingRight: '8%',
   marginTop:'1%'
  },
  logoImage: {
    height: 50,
    marginTop:'10%',
    borderRadius: 30,
    alignSelf: 'center',
    aspectRatio: 1,
    //backgroundColor: '#878787',
   borderColor:'#85C1E9',
   borderWidth:1
  },
  bottomContent: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: '60%',
    marginLeft: 10,
    //borderTopWidth: 1,
    //borderTopColor: '#ccc',
    paddingTop: 10,
  },
  profilecontainer:{
    marginTop:'5%',
    //flex:0.7,
    alignItems:'center',
    justifyContent:'center'

  },
  imgcontainer:{

  },
  profile:{
    width:100,
    height:100,
    borderRadius:60,
    borderColor:'#85C1E9',
   borderWidth:3
  },
  Procontainer: {
    flex: 1,
    padding: 20,
  },
  input: { 
    marginBottom: 10,
  },
  
});
