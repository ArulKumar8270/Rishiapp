import React, { useCallback, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fonts } from '../../config';
import PhoneInput from 'react-native-phone-number-input';

const Company = ({ navigation }) => {
  const initialValues = { companyName: '', phoneNumber: '' };
  const [phoneNumber, setPhoneNumber] = useState('');
  const phoneInput = useRef(null);

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    phoneNumber: Yup.string().matches(/^[+][0-9]*$/, 'Invalid phone number format')
      .required('Phone number is required')
      
  });

  //const handleSubmit = () => {
    // Replace this with your actual form submission logic.
    // For demonstration purposes, we're navigating to the 'Otp' screen.
    //navigation.navigate('Otp');
  //};

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.image} />
      <Text style={styles.text}>COMPANY NAME</Text>
      <Text style={{ marginBottom: '10%', color: '#411004', fontFamily: fonts.CircularStdBook }}>
        Create an account or sign in.
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => navigation.navigate('Otp')}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Enter company name here"
              style={styles.input}
              onChangeText={handleChange('companyName')}
              onBlur={handleBlur('companyName')}
              value={values.companyName}
            />
            {touched.companyName && errors.companyName && (
              <Text style={{ color: 'red' }}>{errors.companyName}</Text>
            )}

            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="IN"
              layout="first"
              withShadow
              autoFocus
              containerStyle={{width: '80%',
              borderWidth: 2,
              borderColor: '#560310',
             // padding: '0.1%',
              margin: '2%',
              borderRadius: 10}}
              //containerStyle={styles.input}
              textContainerStyle={styles.textInput}
              onChangeFormattedText={(text) => {
                setPhoneNumber(text);
                handleChange('phoneNumber')(text)

              }}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={{ color: 'red', fontFamily: fonts.CircularStdBook }}>{errors.phoneNumber}</Text>
            )}
            <LinearGradient
              colors={['#440217', '#CF577D', '#440217']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1.5 }}
              locations={[0, 0.5, 1]}
              style={styles.button}
            >
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={{ color: 'white', fontFamily: fonts.CircularStdBlack }}>Send OTP</Text>
              </TouchableOpacity>
            </LinearGradient>
           
          </>
        )}
      </Formik> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: '20%',
    width: '50%',
    padding: '20%',
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#560310',
    padding: '2%',
    margin: '2%',
    borderRadius: 10,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: '2%',
    margin: '2%',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
  text: {
    fontSize: 25,
    color: '#411004',
    fontFamily: fonts.CircularStdBlack,
  },
  textInput: {
    paddingVertical: -2,
    borderRadius:10,
   backgroundColor:'white'
  }
 
});

export default Company;
