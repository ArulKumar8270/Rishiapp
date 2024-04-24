
import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet,KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fonts } from '../../config';
import LinearGradient from 'react-native-linear-gradient';

const Verifi = ({ navigation }) => {
  const initialValues = { password: '' };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleFormSubmit = () => {
    // Replace this with your actual form submission logic.
    // For demonstration purposes, we're navigating to the 'Company' screen.
    navigation.navigate('Company');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={require('../assets/TICK.jpg')} style={styles.image} />
      <Text style={{color:'#411004',  fontFamily:fonts.CircularStdBlack}}>VERIFICATION CODE</Text>
      <Text numberOfLines={2} style={styles.text}>
        Enter your password, and we'll continue the verification process.
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Enter password here"
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={{color:'red',marginTop:'3%', fontFamily:fonts.CircularStdBook,textAlign:'justify'}}>{errors.password}</Text>
            )}
            <LinearGradient colors={['#440217', '#CF577D', '#440217']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            locations={[0, 0.5, 1]} style={styles.button}>

            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={{color:'white', fontFamily:fonts.CircularStdBlack}}>Submit</Text>
            </TouchableOpacity></LinearGradient>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ margin: '5%' }}>
        <Text style={{color:'#411004',fontFamily:fonts.CircularStdBook}}>&#60; BACK TO LOGIN</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
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
    height: '1%',
    width: '20%',
    padding:'10%'
    //marginTop: '40%',
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#560310',
    padding: '2%',
    //margin: '10%',
    borderRadius: 10,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: '2%',
    marginTop:'15%',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: {width: -2, height: 4},    
    shadowColor:'black',   
    shadowOpacity:1,
    shadowRadius: 3,
    elevation:6 
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2%',
    color:'#411004',
    fontFamily:fonts.CircularStdBook
  },
});

export default Verifi;
