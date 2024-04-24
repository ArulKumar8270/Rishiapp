import React, { useState,useEffect } from 'react';
import { StyleSheet,View,Text, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios'
import { object } from 'yup';
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];
const CustomDropdownComponent = ({placeholder,label,ViewStyle,labelStyle,error,errorStyle,selectedTextStyle,v}) => {
  const [value, setValue] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const[Citydata,setCitydata]=useState([])
  useEffect(()=>{
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries/IN/states',
      headers: {
        'X-CSCAPI-KEY': 'RGk2NGsyd0tvWnF6YVZoVHh3aHlBc1pPYkRlSUJCUm5qeDAwUkJHVQ=='
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      let cityArray = response.data.map(city => ({
        value: city.iso2,
        label: city.name,
      }));
      setCitydata(cityArray);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return (
    <View style={[styles.container, ViewStyle]}>
      <Text style={[styles.label, isFocused || value ? styles.labelFocused : null,labelStyle]}>
         {label}
      </Text>
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={[styles.selectedTextStyle,selectedTextStyle]}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={Citydata}
      onFocus={handleFocus}
      onBlur={handleBlur}
      search
      maxHeight={300}
      labelField='label'
      valueField='value'
      placeholder={[null,placeholder]}
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }
    }
    />
    {error && <Text style={[styles.errorMessage,errorStyle]}>{error}</Text>}
    </View>
  );
};

export default CustomDropdownComponent;

const styles = StyleSheet.create({
  container: {
    //marginBottom: 20,
    //marginVertical: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    marginHorizontal:1,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  label: {
    position: 'absolute',
    top: 30,
    left: 17,
    fontSize: 16,
    color: '#999',
    zIndex: 1,
    transition: 'all 0.3s',
  },
  labelFocused: {
    top: 15,
    fontSize: 13,
    color: '#3498DB',
  },
  errorMessage: {
    marginTop: 4,
    color: 'red',
  },
  inputFocused: {
    color: 'black',
    borderBottomColor: '#3498DB',
  }
});