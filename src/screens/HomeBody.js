import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    Keyboard,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import { SkypeIndicator, MaterialIndicator, PulseIndicator, UIActivityIndicator } from "react-native-indicators";
import { Platform } from "react-native";
import HomeHeader from "./home_header";
import { NavigationContainer } from '@react-navigation/native';
import Bottomtab from "./bottomtab";
import BottomTab from "./bottomtab";
import { loader } from "../assets";
import { Overlay } from "react-native-elements";

export default function HomeBody({
    children,
    refRBSheet,
    title,
    isLoading = false,
    isMainPage,
    navigation }) {
   

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const { height } = Dimensions.get('window');
    const UNFOCUSED_HEIGHT = (height * 57) / 100;
    const FOCUSED_HEIGHT = (height * 87) / 100;




    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
    <>
        <View
            style={{
                flex: 1,
                height: isKeyboardVisible ? FOCUSED_HEIGHT : UNFOCUSED_HEIGHT,
                backgroundColor:'#fff'
            }}>
            <LinearGradient
                // style={{
                //     flex: 1,
                // }}
                useAngle={true}
                angle={45}
                angleCenter={{ x: 0.5, y: 0.5 }}
                colors={["white", "white"]} >
                <HomeHeader title={title} isMainPage={isMainPage} navigation={navigation} />
                {children}
                {/* <ScrollView>
                
                </ScrollView> */}
            </LinearGradient>

            {/* {isLoading && (
                <View style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <UIActivityIndicator size={100} />
                </View>
            )}
             */}
             <Overlay
        isVisible={isLoading || false}
        fullScreen
        overlayStyle={{ alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'}}
        overlayBackgroundColor="rgba(0,0,0,0.0)">
        <View style={{padding: 10, borderRadius: 10}}>
          <Image
            style={{alignSelf: 'center', width: 70, height: 70}}
            source={loader}/>
          
        </View>
      </Overlay>
           </View>
           <View>
           </View>
           
           </>
    );
}
