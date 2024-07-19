import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import HomeBody from './HomeBody';
import { fonts } from '../../config';
import { CustomTextInput } from '../assets/textinput';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES } from '../styles/config';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';

// Validation schema for form fields
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Job Title is required'),
  companyEmail: Yup.string().email('Invalid email').required('Company Email is required'),
  companyWebsite: Yup.string().required('Company Website is required'),
  companyAddress: Yup.string().required('Company Address is required'),
  totalEmployees: Yup.number().required('Total Employees is required').min(1, 'Must be at least 1'),
});

const Post = ({ navigation }) => {
  const searchsheet = useRef();
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoBinary, setLogoBinary] = useState(null);

  const handleSubmit = useCallback(async (values) => {
    setLoading(true);
    try {
      const request = {
        companyName: values.companyName,
        companyEmail: values.companyEmail,
        companyWebsite: values.companyWebsite,
        companyAddress: values.companyAddress,
        totalEmployee: values.totalEmployees,
        companyLogo: logoBinary,
        id: values.companyId,
      };

      const response = await axios.put(`https://rishijob.com/backend/api/v1/company/${values.companyId}`, request);
      setLoading(false);
      if (response.data.success) {
        Alert.alert('Company Profile Created Successfully');
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
  }, [navigation, logoBinary]);

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      const source = { uri: image.path };
      setLogo(source);
      setLogoBinary(image.data);
    }).catch(error => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        console.error('ImagePicker Error: ', error);
        Alert.alert('Image Picker Error', 'An error occurred while selecting the image. Please try again.');
      }
    });
  };

  return (
    <HomeBody
      navigation={navigation}
      title={'Home'}
      postJobDashbord={true}
      isMainPage={true}
      isLoading={loading}
      
    >
      <Formik
        initialValues={{
          companyName: '',
          companyId: '',
          companyEmail: '',
          companyWebsite: '',
          companyAddress: '',
          totalEmployees: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
       
          <SafeAreaView style={[styles.card, styles.shadowProp]}>
               <ScrollView>
            <Text style={styles.headerText}>Company Profile</Text>
            <CustomTextInput
              label={'Company Name'}
              labelStyle={{ fontFamily: fonts.CircularStdLight }}
              maxLength={30}
              onChangeText={handleChange('companyName')}
              onBlur={handleBlur('companyName')}
              value={values.companyName}
              error={touched.companyName && errors.companyName}
              inputStyle={{ fontFamily: fonts.CircularStdBook }}
              errorStyle={{ fontFamily: fonts.CircularStdBook }}
            />
            <CustomTextInput
              label={'Company ID'}
              labelStyle={{ fontFamily: fonts.CircularStdLight }}
              maxLength={30}
              onChangeText={handleChange('companyId')}
              onBlur={handleBlur('companyId')}
              value={values.companyId}
              error={touched.companyId && errors.companyId}
              inputStyle={{ fontFamily: fonts.CircularStdBook }}
              errorStyle={{ fontFamily: fonts.CircularStdBook }}
            />
            <CustomTextInput
              label={'Company Email'}
              labelStyle={{ fontFamily: fonts.CircularStdLight }}
              maxLength={30}
              onChangeText={handleChange('companyEmail')}
              onBlur={handleBlur('companyEmail')}
              value={values.companyEmail}
              error={touched.companyEmail && errors.companyEmail}
              inputStyle={{ fontFamily: fonts.CircularStdBook }}
              errorStyle={{ fontFamily: fonts.CircularStdBook }}
            />
            <CustomTextInput
              label={'Company Website'}
              labelStyle={{ fontFamily: fonts.CircularStdLight }}
              maxLength={100}
              onChangeText={handleChange('companyWebsite')}
              onBlur={handleBlur('companyWebsite')}
              value={values.companyWebsite}
              error={touched.companyWebsite && errors.companyWebsite}
              inputStyle={{ fontFamily: fonts.CircularStdBook }}
              errorStyle={{ fontFamily: fonts.CircularStdBook }}
            />
            <CustomTextInput
              label={'Company Address'}
              labelStyle={{ fontFamily: fonts.CircularStdLight }}
              maxLength={100}
              onChangeText={handleChange('companyAddress')}
              onBlur={handleBlur('companyAddress')}
              value={values.companyAddress}
              error={touched.companyAddress && errors.companyAddress}
              inputStyle={{ fontFamily: fonts.CircularStdBook }}
              errorStyle={{ fontFamily: fonts.CircularStdBook }}
            />
            <CustomTextInput
              label={'Total Employees'}
              labelStyle={{ fontFamily: fonts.CircularStdLight }}
              maxLength={10}
              onChangeText={handleChange('totalEmployees')}
              onBlur={handleBlur('totalEmployees')}
              value={values.totalEmployees}
              error={touched.totalEmployees && errors.totalEmployees}
              inputStyle={{ fontFamily: fonts.CircularStdBook }}
              errorStyle={{ fontFamily: fonts.CircularStdBook }}
            />
            <View style={styles.logoContainer}>
              <Text style={styles.logoLabel}>Select Company Logo</Text>
              <TouchableOpacity style={{alignItems:'center',marginHorizontal:10,marginVertical:-10}} onPress={handleImagePicker}>
                <View style={styles.logoPicker}>
                  {logo ? (
                    <Image source={logo} style={styles.logo} />
                  ) : (
                   null
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <LinearGradient
                colors={['#440217', '#CF577D', '#440217']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.5 }}
                locations={[0, 0.5, 1]}
                style={styles.button}
              >
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            </ScrollView>
          </SafeAreaView>
         
        )}
      </Formik>
    </HomeBody>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ccc',
    paddingVertical: 30,
    paddingHorizontal: 25,
    marginHorizontal: 20,
    width: '90%',
    height: '85%',
    marginVertical: 10,
    resizeMode: 'stretch',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  headerText: {
    fontFamily: fonts.CircularStdMedium,
    fontSize: SIZES.h2,
    color: '#660000',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 0,
    width: '100%',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: SIZES.radius,
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
  logoContainer: {
    //alignItems: 'center',
    marginVertical: 20,
    flexDirection:'row'

  },
  logoLabel: {
    fontFamily: fonts.CircularStdLight,
    fontSize: 16,
    marginBottom: 10,
  },
  logoPicker: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  logoPlaceholder: {
    fontFamily: fonts.CircularStdLight,
    fontSize: 12,
    color: '#ccc',
  },
});

export default Post;
