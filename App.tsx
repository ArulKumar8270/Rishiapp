// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/screens/login';
import Forget from './src/screens/forget';
import Verifi from './src/screens/verifi';
import Company from './src/screens/company';
import Otp from './src/screens/otp';
import Post from './src/screens/post';
import Dashboard from './src/screens/dashbord';
import Chat from './src/bottomscreen/chat';
import Notify from './src/bottomscreen/notify';
import Profile from './src/bottomscreen/profile';
import { Animated, Image, StyleSheet} from 'react-native';
import Home from './src/screens/Home';
import { HomeIcon,ChatIcon,BellIcon, MyIcon, FocusBell, FocusHomeIcon, FocusChatIcon, FocusMyIcon } from './src/assets/svg';
import { View } from 'react-native';
import Serachbar from './src/screens/serachbar';
import Basicdetails from './src/bottomscreen/profileitems.js/basicdetails';
import CompanyDetails from './src/screens/companydetails';
//import CustomDrawer from './src/navigation/CustomDrawer';
import AppliedSucsuss from './src/screens/Appliedsucsuss';
import { fonts } from './config';
import Sigin from './src/screens/signin';
import Signup from './src/screens/signup';
import Resetpassword from './src/screens/resetpassword';
import ConversationScreen from './src/bottomscreen/conversationScreen';
import Postlogin from './src/screens/Postlogin';
import PostSignup from './src/screens/postSignup';
import PostOtp from './src/screens/PostOtp';
import CreateJob from './src/screens/createJob';
import Jobs from './src/screens/jobs';
import JobAppliedScreen from './src/screens/appliedJob';
import AppliedTo from './src/screens/ApplyedTo';
import Terms from './src/Slidemenu/terms';
import Contactus from './src/Slidemenu/contactus';
import AboutUs from './src/Slidemenu/aboutUs';
import Privacy from './src/Slidemenu/privacy';
import Blogs from './src/Slidemenu/jobBlogs';
import Testimonials from './src/Slidemenu/testimonials';
import Disclaimer from './src/Slidemenu/disclimer';
import ProfileUpdate from './src/bottomscreen/profileitems.js/Profileupdate';
import { Provider } from 'react-redux';
import { store } from './src/redux';

//import CustomDrawer from './src/navigation/CustomDrawer';

// in App.js

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <Provider
    store={store}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, presentation: 'modal' }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PostSignup" component={PostSignup} />
        <Stack.Screen name="Postlogin" component={Postlogin} />
        <Stack.Screen name="PostOtp" component={PostOtp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Verifi" component={Verifi} />
        <Stack.Screen name="Company" component={Company} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Dashbord" component={DashboardStack} />
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Basicdetails' component={Basicdetails}/>
        <Stack.Screen name='CompanyDetails' component={CompanyDetails}/>
        <Stack.Screen name='AppliedSucsuss' component={AppliedSucsuss}/>
        <Stack.Screen name='Resetpassword' component={Resetpassword}/>
        <Stack.Screen name='ConversationScreen' component={ConversationScreen}/>
        <Stack.Screen name="CreateJob" component={CreateJob} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name='JobAppliedScreen' component={JobAppliedScreen}/>
        <Stack.Screen name='AppliedTo' component={AppliedTo}/>
        <Stack.Screen name='Terms' component={Terms}/>
        <Stack.Screen name='Contactus' component={Contactus}/>
        <Stack.Screen name='Aboutus' component={AboutUs}/>
        <Stack.Screen name='Privacy' component={Privacy}/>
        <Stack.Screen name='Blogs' component={Blogs}/>
        <Stack.Screen name='Testimonials' component={Testimonials}/>
        <Stack.Screen name='Disclaimer' component={Disclaimer}/>
        <Stack.Screen name='ProfileUpdate' component={ProfileUpdate}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  );
};

const DashboardStack = () => {
  return (
    <Tab.Navigator 
    screenOptions=
    {{tabBarShowLabel:true,
      tabBarLabelStyle:{fontFamily:fonts.CircularStdBook},
      headerShown:false,
    tabBarStyle:{
      position:'absolute',
      left:0,
      right:0,
      bottom:0,
      elevation:0,
  }}}>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <HomeIcon height={20} width={35} color={'#fff'} style={styles.Tabfocus}/> : <HomeIcon color={'#17202A'} height={20} width={25}/>
          ),
         }}
      />
      <Tab.Screen name="Chat" component={Chat}  options={{
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <ChatIcon height={20} width={35} color={'#fff'} style={styles.Tabfocus}/> : <ChatIcon color={'#17202A'} height={20} width={25}/>
          ),
        }} />
      <Tab.Screen name="Notification" component={Notify}  options={{
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <BellIcon height={20} width={35} color={'#fff'} style={styles.Tabfocus}/> : <BellIcon color={'#17202A'} height={20} width={25}/>
          ),
        }} />
      <Tab.Screen name="Profile" component={Profile}  options={{
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <MyIcon height={20} width={35} color={'#fff'} style={styles.Tabfocus}/> : <MyIcon color={'#17202A'} height={20} width={25}/>
          ),
        }} />
    </Tab.Navigator>
  );
};
export default App;
const styles=StyleSheet.create({
  Tabfocus:{
   backgroundColor:'#641E16',
  borderRadius:10,
  borderBottomColor:'#641E16',
  borderBottomWidth:2,
 }
})
