import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashStack from './splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashStack}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>
  </NavigationContainer>
);

function CustomDrawerContent(props) {
  const width = useWindowDimensions().width * 0.3;

  return (
    <DrawerContentScrollView {...props}>
      <View style={{
        margin: 10,
        borderWidth: 1,
        height: 100
      }}>


      </View>
    </DrawerContentScrollView>
  );
}


export const navigationOptions = {
  header: null,
  animationEnabled: false,
  swipeEnabled: false,
};
