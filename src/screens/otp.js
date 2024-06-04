import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../config';
import {fontSize} from '../styles/config';
import axios from 'axios';

const Otp = ({navigation, route}) => {
  const {params} = route;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onSubmit = async () => {
    if (String(params.Otp.data) === String(value)){
      try {
        const tempData = {
          ...params.Data,
          userName: params.Data.phoneNumber,
        };
        const response = await axios.post(
          `https://rishijob.com/backend/api/v1/customers`,
          tempData,
        );
        console.log("Response:", response.data);
        Alert.alert("Success", "OTP verified and data submitted successfully.");
      } catch (error) {
        console.error("Error:", error);
        if (error.response) {
          Alert.alert("Error", error.response.data?.message || "An error occurred.");
        } else {
          Alert.alert("Error", "Network error or server is down.");
        }
      }
    } else {
      Alert.alert('Invalid OTP', 'Please check your OTP and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: '10%'}}>
        <Text
          style={{
            fontFamily: fonts.CircularStdBlack,
            color: '#411004',
            fontSize: fontSize.header1,
          }}>
          VALIDATION CODE
        </Text>
        <Text style={{fontFamily: fonts.CircularStdBook, color: '#411004'}}>
          We sent a code to your registered mobile number
        </Text>
      </View>
      <View style={styles.otpContainer}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          renderCell={({index, symbol, isFocused}) => (
            <View
              style={[styles.otpbox, isFocused && styles.focusBorder]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.otptext}>
                {symbol ? '*' : isFocused ? <Cursor /> : null}
              </Text>
            </View>
          )}
        />
      </View>
      <LinearGradient
        colors={['#440217', '#CF577D', '#440217']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1.5}}
        locations={[0, 0.5, 1]}
        style={styles.button}>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={{color: 'white', fontFamily: fonts.CircularStdBlack}}>
            Send OTP
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: '#411004',
            fontFamily: fonts.CircularStdBook,
            textAlign: 'center',
            marginTop: '2%',
          }}>
          &#60;BACK TO LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  otpContainer: {
    marginHorizontal: '10%',
    marginBottom: '10%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpbox: {
    borderRadius: 10,
    borderColor: '#411004',
    borderWidth: 2,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  otptext: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
    width: '80%',
    marginHorizontal: '10%',
  },
  focusBorder: {
    borderColor: '#411004',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: {width: -2, height: 4},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
    marginLeft: '10%',
  },
});

export default Otp;
