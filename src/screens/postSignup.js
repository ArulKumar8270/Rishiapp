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
  import Otp from './otp';
  
  const PostSignup = ({navigation}) => {
    const [otpValue, setOtpValue] = React.useState(null);
    const [oldOtp, setOldOtp] = React.useState(null);
  
    const validationSchema = yup.object().shape({
       CompanyName: yup.string().required('CompanyName is required'),
      Companyemail: yup.string().email('Invalid email').required('CompanyEmail is required'),
      phoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
        .required('Phone number is required')
        .min(10, 'Phone number must be a 10 characters'),
        Address:yup.string().required('Address is requried'),
        Totalemployee:yup.string().required('Total employee is requried'),
         Username:yup.string().required('Username must required'),
      password: yup
        .string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long',
        )
        .min(6, 'Password must be at least 6 characters'),
    });
    // const onSubmit=()=>{
    //   navigation.navigate('PostOtp', {otpValue: otpValue})
    // }
    const onSubmit = async formData => {
        try {
          let req ={
            "companyName": formData.CompanyName,
            "companyEmail": formData.Companyemail,
            "companyNumber": formData.phoneNumber,
            "companyWebsite": 'fghjkl',
            "companyAddress": formData.Address,
            "totalEmployee": formData.Totalemployee,
            "userName": formData.Username,
            "password": formData.password

          }        
          const response = await axios.post(`https://rishijob.com/backend/api/v1/customers/number/${formData?.phoneNumber}`,
         req
        );
          if (response?.data.success) {
            navigation.navigate('PostOtp',{Otp : response.data, Data :  formData})
            Alert('Otp sent your registered Phone Number');
            setOldOtp(response?.data);  
            
          }
        } catch (error) {
          console.log("Error____________________",error);
          Alert('Somthis want worng');
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
            <TouchableOpacity onPress={() => navigation.navigate('Postlogin')}>
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
              CompanyName: '',
              Companyemail: '',
              phoneNumber: '',
              Address:'',
              Totalemployee:'',
              Username:'',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
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
                  label={'Company Name'}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  maxLength={30}
                  onChangeText={handleChange('CompanyName')}
                  onBlur={handleBlur('CompanyName')}
                  value={values.CompanyName}
                  error={touched.CompanyName && errors.CompanyName}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                />
                <CustomTextInput
                  label={'Company Email'}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  maxLength={30}
                  onChangeText={handleChange('Companyemail')}
                  onBlur={handleBlur('Companyemail')}
                  value={values.Companyemail}
                  error={touched.Companyemail && errors.Companyemail}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                />
                <CustomTextInput
                  label={'Contact Number'}
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
                  label={'Address'}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  maxLength={100}
                  onChangeText={handleChange('Address')}
                  onBlur={handleBlur('Address')}
                  value={values.Address}
                  error={touched.Address && errors.Address}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                />
                 <CustomTextInput
                  label={'Total Employee'}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  maxLength={10}
                  onChangeText={handleChange('Totalemployee')}
                  onBlur={handleBlur('Totalemployee')}
                  value={values.Totalemployee}
                  error={touched.Totalemployee && errors.Totalemployee}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                />
                 <CustomTextInput
                  label={'UserName'}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  maxLength={10}
                  onChangeText={handleChange('Username')}
                  onBlur={handleBlur('Username')}
                  value={values.Username}
                  error={touched.Username && errors.Username}
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
  
  export default PostSignup;
  
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
      paddingVertical: 30,
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
  