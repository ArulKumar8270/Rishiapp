import React, { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropDowntry = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select an option"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        arrowColor="#000"
      />
    </View>
  );
};

export default CustomDropDowntry;
const styles = StyleSheet.create({
  container: {
    //flex: 1,
   // justifyContent: 'center',
    //alignItems: 'center',
  },
  dropdownContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderColor:'#fff',
    borderWidth:0.1,
  },
  dropdown: {
    width:'100%',

    backgroundColor: '#fafafa',
    borderRadius: 5,
    borderColor:'#fff',
    borderWidth:0.1,
    borderBottomWidth:2,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    
  },
});
