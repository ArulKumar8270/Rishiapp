import React, { useCallback, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { SIZES, fontSize } from '../styles/config';
import { fonts } from '../../config';

const validationSchema = Yup.object().shape({
  Username: Yup.string().required('*Username is required'),
  Password: Yup.string().required('*Password is required'),
});

const Postlogin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const handleLogin = useCallback(async (values) => {
    setLoading(true);
    try {
      const request = {
        userName: values.Username,
        password: values.Password,
      };
      console.log('Sending request to the server:', request);

      const response = await axios.post('https://rishijob.com/backend/api/v1/company/authenticate', request);
      console.log(response.data);
      setLoading(false);
      if (response.data.success) {
        navigation.navigate('Post');
      } else {
        Alert.alert('Login Failed');
      }
    } catch (error) {
      setLoading(false);

      if (error.response) {
        console.error('Server error:', error.response.data);
        Alert.alert('Login Failed', error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        console.error('Network error:', error.request);
        Alert.alert('Login Failed', 'No response from the server. Please check your internet connection and try again.');
      } else {
        console.error('Error:', error.message);
        Alert.alert('Login Failed', 'An error occurred. Please try again.');
      }
    }
  }, [navigation]);

  return (
    <Formik
      initialValues={{ Username: '', Password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <SafeAreaView style={styles.formContainer}>
          <View style={styles.innerContainer}>
            <Image source={require('../assets/logo.jpg')} style={styles.image1} />
            {/* <Image source={require('../assets/PROFILE.jpg')} style={styles.image2} /> */}
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.text}>LOGIN INTO YOUR COMPANY ACCOUNT</Text>
            <TextInput
              placeholder="Username"
              style={styles.input}
              onChangeText={handleChange('Username')}
              onBlur={handleBlur('Username')}
              value={values.Username}
            />
            {touched.Username && errors.Username && (
              <Text style={styles.errorText}>{errors.Username}</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate('PostSignup')} style={{ marginTop: 40 }}>
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
    justifyContent:'center',
    
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
  },
  image1: {
    height: '20%',
    width: '50%',
    marginBottom:20,
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
    //marginRight: '10%',
    paddingBottom: SIZES.radius,
    fontFamily: fonts.CircularStdBlack,
    color: '#411004',
    marginLeft: 5,
    marginBottom: 5,
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

export default Postlogin;
