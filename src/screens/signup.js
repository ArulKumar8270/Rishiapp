import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {CustomTextInput} from '../assets/textinput';
import LinearGradient from 'react-native-linear-gradient';
import {fonts, infoData} from '../../config';
import {SIZES} from '../styles/config';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Signup = ({navigation}) => {
  const [otpValue, setOtpValue] = React.useState(null);
  const [oldOtp, setOldOtp] = React.useState(null);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
      .required('Phone number is required')
      .min(10, 'Phone number must be a 10 characters'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long',
      )
      .min(6, 'Password must be at least 6 characters'),
  });

  const onSubmit = async formData => {
    console.log(formData, 'formData245234');
    if (!otpValue) {
      try {
        const response = await axios.get(`https://rishijob.com:5000/api/v1/courses`);
        console.log(response, 'response5234');
        if (response?.data) {
          alert('Otp sent your registered Phone Number');
          setOldOtp(response?.data);
        }
        console.log(formData, 'formData32134', response);
      } catch (error) {
        console.log(error, 'error34');
        alert('Somthis want worng');
      }
    } else {
      if (String(oldOtp?.data) === String(otpValue)) {
        try {
          let tempData = {
            ...formData,
            userName: formData?.phoneNumber,
          };
          let result = await axios.post(
            `${infoData?.baseApi}/customers`,
            tempData,
          );
          console.log(result, 'asdfasd');
          Alert('Register Successful');
          setTimeout(() => {
            navigation.navigate('/Login');
          }, 1000);
        } catch (error) {
          if (error.response) {
            alert(error.response.data?.message);
          }
        }
      } else {
        alert('Please check your otp');
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Image source={require('../assets/logo.jpg')} style={styles.image1} />
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Text
            style={{
              fontFamily: fonts.CircularStdMedium,
              fontSize: SIZES.h2,
              color: '#660000',
            }}>
            Already create an account
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                borderBottomWidth: 0.5,
                borderBlockColor: '#ccc',
                color: 'red',
                fontFamily: fonts.CircularStdMedium,
                fontSize: SIZES.h2,
              }}>
              {' '}
              Sigin
            </Text>
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{
            firstName: '',
            email: '',
            phoneNumber: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values, 'onSubmitsdfadsasd');
            onSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <SafeAreaView style={[styles.card, styles.shadowProp]}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: fonts.CircularStdBook,
                    marginVertical: 5,
                    fontSize: SIZES.body2,
                    color: '#660000',
                  }}>
                  Ready to tack next steps
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.CircularStdBook,
                    marginVertical: 5,
                    fontSize: SIZES.body2,
                    color: '#660000',
                  }}>
                  Create an acoount or signin
                </Text>
              </View>
              <CustomTextInput
                label={'name'}
                labelStyle={{fontFamily: fonts.CircularStdLight}}
                maxLength={30}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                error={touched.firstName && errors.firstName}
                inputStyle={{fontFamily: fonts.CircularStdBook}}
                errorStyle={{fontFamily: fonts.CircularStdBook}}
              />
              <CustomTextInput
                label={'email'}
                labelStyle={{fontFamily: fonts.CircularStdLight}}
                maxLength={30}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
                inputStyle={{fontFamily: fonts.CircularStdBook}}
                errorStyle={{fontFamily: fonts.CircularStdBook}}
              />
              <CustomTextInput
                label={'phonenumber'}
                labelStyle={{fontFamily: fonts.CircularStdLight}}
                maxLength={10}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber}
                inputStyle={{fontFamily: fonts.CircularStdBook}}
                errorStyle={{fontFamily: fonts.CircularStdBook}}
              />
              <CustomTextInput
                label={'password'}
                labelStyle={{fontFamily: fonts.CircularStdLight}}
                maxLength={10}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
                inputStyle={{fontFamily: fonts.CircularStdBook}}
                errorStyle={{fontFamily: fonts.CircularStdBook}}
              />
              {oldOtp && (
                <CustomTextInput
                  label={'Otp'}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  maxLength={10}
                  onChangeText={e => setOtpValue(e.target.value)}
                  onBlur={handleBlur('Otp')}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                />
              )}

              <LinearGradient
                colors={['#440217', '#CF577D', '#440217']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1.5}}
                locations={[0, 0.5, 1]}
                style={styles.button}>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontFamily: fonts.CircularStdMedium,
                    }}>
                    {oldOtp ? 'Submit' : 'Send Otp'}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </SafeAreaView>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
    backgroundColor: '#fff',
  },
  image1: {
    height: 100,
    width: 120,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ccc',
    //alignItems:'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '100%',
    height: '80%',
    marginVertical: 10,
    resizeMode: 'stretch',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    marginTop: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: SIZES.radius,
    borderRadius: SIZES.radius,
    shadowOffset: {width: -2, height: 4},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
});
