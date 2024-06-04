import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup'; // You need to install yup for schema validation

import { SIZES, fontSize } from '../styles/config'
import { fonts } from '../../config'
import LinearGradient from 'react-native-linear-gradient'

const Resetpassword = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    resetPassword: yup.string().required('Reset Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('resetPassword'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = (values) => {
    setLoading(true);
    // Your form submission logic here
    // For example, you can call an API to reset the password
    // After the submission is done, setLoading(false);
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ resetPassword: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Image source={require('../assets/LOCK.jpg')} style={styles.image1} />
            <Text style={styles.resetText}>Please enter your new password below:</Text>
            <TextInput
            
              placeholder='Reset Password'
              style={styles.input}
              onChangeText={handleChange('resetPassword')}
              onBlur={handleBlur('resetPassword')}
              value={values.resetPassword}
              secureTextEntry={true}
            />
            {touched.resetPassword && errors.resetPassword &&
              <Text style={styles.errorText}>{errors.resetPassword}</Text>
            }
            <TextInput
              placeholder='Confirm Password'
              style={styles.input}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={true}
            />
            {touched.confirmPassword && errors.confirmPassword &&
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            }
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
                  <Text style={{ textAlign: 'center', color: 'white', fontFamily: fonts.CircularStdMedium }}>Submit</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
          </>
        )}
      </Formik>
      <TouchableOpacity style={{ marginLeft: '50%' }} onPress={() => {
        setLoading(true)
        navigation.navigate('Forget')
        setLoading(false)
      }
      }></TouchableOpacity>
    </View>
  )
}

export default Resetpassword

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  resetText: {
    marginVertical:20,
    fontSize: fontSize.textLarge,
    fontFamily: fonts.CircularStdBlack,
    color: '#411004',
},
  image1: {
    marginBottom:-30,
    height: '20%',
    width: '20%',
    //marginTop: '%',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    resizeMode: 'center',
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
  errorText: {
    color: 'red',
    fontSize: fontSize.textLarge,
    fontFamily: fonts.CircularStdBook,
    marginBottom: '2%',
  },
});
 