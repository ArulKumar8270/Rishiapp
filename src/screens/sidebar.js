// AppNavigator.js
import React from 'react';
import Dashboard from './dashbord';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};

export default AppNavigator;
