import React, { useCallback, useState, useRef } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { SIZES, fontSize } from '../styles/config';
import { fonts } from '../../config';

const validationSchema = Yup.object().shape({
  MobileNumber: Yup.string()
  .matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Must contain only digits')
  .max(13, 'Invalid phone Number')
  .required('*Mobile Number is required'),
  Password: Yup.string().required('*Password is required'),
});

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef(null);

  const handleLogin = useCallback(async (values) => {
    setLoading(true);
    try {
      const request = {
        userName: values.MobileNumber,
        password: values.Password,
      };
      console.log('Sending request to the server:', request);

      const response = await axios.post('https://rishijob.com/backend/api/v1/customers/authenticate', request);
      setLoading(false);
      if (response.data.success) {
        navigation.navigate('Dashbord');
      }
      else{
        //Alert.alert('Error', response.data.error);
        navigation.navigate('Dashbord');
      }
    } catch (error) {
      setLoading(false);
      console.error('error----------------------', error);

      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Server error:', error.response.data);
        Alert.alert('Login Failed', error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.request);
        Alert.alert('Login Failed', 'No response from the server. Please check your internet connection and try again.');
      } else {
        // Something else happened in setting up the request
        console.error('Error:', error.message);
        Alert.alert('Login Failed', 'An error occurred. Please try again.');
      }
    }
  }, [navigation]);

  return (
    <Formik
      initialValues={{ MobileNumber: '', Password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <SafeAreaView style={styles.formContainer}>
          <View style={styles.innerContainer}>
            <Image source={require('../assets/logo.jpg')} style={styles.image1} />
            <Image source={require('../assets/PROFILE.jpg')} style={styles.image2} />
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.text}>LOGIN INTO YOUR ACCOUNT</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={values.MobileNumber}
              defaultCode="IN"
              layout="first"
              withShadow
              autoFocus
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              onChangeFormattedText={(text) => setFieldValue('MobileNumber', text)}
            />
            {touched.MobileNumber && errors.MobileNumber && (
              <Text style={styles.errorText}>{errors.MobileNumber}</Text>
            )}
            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={handleChange('Password')}
              onBlur={handleBlur('Password')}
              value={values.Password}
              secureTextEntry
            />
            {touched.Password && errors.Password && (
              <Text style={styles.errorText}>{errors.Password}</Text>
            )}
            <LinearGradient
              colors={['#440217', '#CF577D', '#440217']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1.5 }}
              locations={[0, 0.5, 1]}
              style={styles.button}
            >
              <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.forgotText}>Forgot password</Text>
            </TouchableOpacity>
            {/* <View style={styles.socialLoginContainer}>
              <TouchableOpacity><Image source={require('../assets/go.jpg')} style={styles.socialImage} /></TouchableOpacity>
              <TouchableOpacity><Image source={require('../assets/ip.jpg')} style={styles.socialImage} /></TouchableOpacity>
            </View> */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{marginTop:40}}>
              <Text style={styles.signupText}>Don't have an account? Sign up for free</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image1: {
    height: '20%',
    width: '50%',
    marginTop: '10%',
    resizeMode: 'center',
  },
  image2: {
    height: '10%',
    width: '20%',
    resizeMode: 'center',
    marginBottom: '5%',
  },
  welcomeText: {
    fontSize: fontSize.textLarge,
    marginRight: '50%',
    fontFamily: fonts.CircularStdLight,
    color: '#411004',
    marginBottom: '2%',
  },
  text: {
    fontSize: fontSize.textLarge,
    marginRight: '25%',
    paddingBottom: SIZES.radius,
    fontFamily: fonts.CircularStdBlack,
    color: '#411004',
    marginLeft: 5,
    marginBottom: 5,
  },
  phoneContainer: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#560310',
    margin: '2%',
    borderRadius: 10,
  },
  textInput: {
    paddingVertical: -2,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#560310',
    padding: '2%',
    marginBottom: '3%',
    borderRadius: SIZES.radius,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: SIZES.radius,
    marginBottom: '4%',
    borderRadius: SIZES.radius,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: fonts.CircularStdMedium,
  },
  forgotPassword: {
    marginLeft: '50%',
  },
  forgotText: {
    color: '#411004',
    fontFamily: fonts.CircularStdBook,
  },
  orText: { 
    color: '#411004',
    fontFamily: fonts.CircularStdBook,
    marginTop: '10%', 
    marginBottom: '2%',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialImage: {
    height: 50,
    width: 50,
    marginHorizontal: '1%',
  },
  signupText: {
    color: '#411004',
    fontFamily: fonts.CircularStdBook,
  },
  errorText: {
    color: 'red',
    fontSize: fontSize.textLarge,
    fontFamily: fonts.CircularStdBook,
    marginLeft: '30%',
    marginBottom: '2%',
    marginTop: '-2%',
  },
});

export default Login;
