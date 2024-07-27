import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import {CustomTextInput} from '../assets/textinput';
import LinearGradient from 'react-native-linear-gradient';
import {fonts, infoData} from '../../config';
import {fontSize, SIZES} from '../styles/config';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import { color } from 'react-native-elements/dist/helpers';
import { Image } from 'react-native-elements/dist/image/Image';

const AppliedTo = ({navigation}) => {
  const [otpValue, setOtpValue] = React.useState(null);
  const [oldOtp, setOldOtp] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState('fresher');
  const [resume, setResume] = React.useState(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
      .required('Phone number is required')
      .min(10, 'Phone number must be 10 characters'),
    Location: yup.string().required('Please Enter Your Current Location'),
    jobTitle: selectedOption === 'experience' ? yup.string().required('Job Title is required') : yup.string(),
    experienceYears: selectedOption === 'experience' ? yup.number().required('Experience Years is required') : yup.number(),
    companyName: selectedOption === 'experience' ? yup.string().required('Company Name is required') : yup.string(),
  });

  const handleResumeUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setResume(res);
      console.log('----------------------------------------------------------------',res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };
  const handleApplyjob = useCallback(async (values) => {
    setLoading(true);
    try {
      const request = {
        userName: values.firstName,
        jobTitle: values.jobTitle || '',
        jobCategory: values.jobTitle || '',
        companyName: values.companyName || '',
        companyId: '',  // Add this if needed
        jobStatus: '',  // Add this if needed
        name: values.firstName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        jobLocation: values.Location,
        experienceType: selectedOption,
        experience: values.experienceYears || '',
        oldCompanyName: '',  // Add this if needed
        resume: resume ? resume[0].uri : '',  // Adjust based on the resume object format
      };
  
      const response = await axios.post('https://rishijob.com/backend/api/v1/jobs', request);
  
      if (response.data.success) {
        navigation.navigate('AppliedSucsuss');
      } else {
        Alert.alert('Application Failed', response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('error----------------------', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        Alert.alert('Application Failed', error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        console.error('Network error:', error.request);
        Alert.alert('Application Failed', 'No response from the server. Please check your internet connection and try again.');
      } else {
        console.error('Error:', error.message);
        Alert.alert('Application Failed', 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [resume, selectedOption, navigation]);
 
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Enter Your Profile Details Here
        </Text>
        <Formik
  initialValues={{
    firstName: '',
    email: '',
    phoneNumber: '',
    Location: '',
    jobTitle: '',
    experienceYears: '',
    companyName: '',
  }}
  validationSchema={validationSchema}
  onSubmit={values => {
    handleApplyjob(values);
  }}
>
  {({
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  }) => (
    <SafeAreaView style={[styles.card, styles.shadowProp]}>
      <CustomTextInput
        label={'Name'}
        labelStyle={{ fontFamily: fonts.CircularStdLight }}
        maxLength={30}
        onChangeText={handleChange('firstName')}
        onBlur={handleBlur('firstName')}
        value={values.firstName}
        error={touched.firstName && errors.firstName}
        inputStyle={{ fontFamily: fonts.CircularStdBook }}
        errorStyle={{ fontFamily: fonts.CircularStdBook }}
      />
      <CustomTextInput
        label={'Email'}
        labelStyle={{ fontFamily: fonts.CircularStdLight }}
        maxLength={30}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        error={touched.email && errors.email}
        inputStyle={{ fontFamily: fonts.CircularStdBook }}
        errorStyle={{ fontFamily: fonts.CircularStdBook }}
      />
      <CustomTextInput
        label={'Phone Number'}
        labelStyle={{ fontFamily: fonts.CircularStdLight }}
        maxLength={10}
        onChangeText={handleChange('phoneNumber')}
        onBlur={handleBlur('phoneNumber')}
        value={values.phoneNumber}
        error={touched.phoneNumber && errors.phoneNumber}
        inputStyle={{ fontFamily: fonts.CircularStdBook }}
        errorStyle={{ fontFamily: fonts.CircularStdBook }}
      />
      <CustomTextInput
        label={'Location'}
        labelStyle={{ fontFamily: fonts.CircularStdLight }}
        maxLength={20}
        onChangeText={handleChange('Location')}
        onBlur={handleBlur('Location')}
        value={values.Location}
        error={touched.Location && errors.Location}
        inputStyle={{ fontFamily: fonts.CircularStdBook }}
        errorStyle={{ fontFamily: fonts.CircularStdBook }}
      />

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedOption('experience')}>
          {selectedOption === 'experience' ? (
            <Text style={styles.radioTextFocus}>Experience</Text>
          ) : (
            <Text style={styles.radioText}>Experience</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedOption('fresher')}>
          {selectedOption === 'fresher' ? (
            <Text style={styles.radioTextFocus}>Fresher</Text>
          ) : (
            <Text style={styles.radioText}>Fresher</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleResumeUpload}>
        <Text style={styles.uploadButtonText}>
          {resume ? resume[0].name : 'Upload Resume'}
        </Text>
      </TouchableOpacity>

      {selectedOption === 'experience' && (
        <>
          <CustomTextInput
            label={'Job Title'}
            labelStyle={{ fontFamily: fonts.CircularStdLight }}
            maxLength={30}
            onChangeText={handleChange('jobTitle')}
            onBlur={handleBlur('jobTitle')}
            value={values.jobTitle}
            error={touched.jobTitle && errors.jobTitle}
            inputStyle={{ fontFamily: fonts.CircularStdBook }}
            errorStyle={{ fontFamily: fonts.CircularStdBook }}
          />
          <CustomTextInput
            label={'Experience Years'}
            labelStyle={{ fontFamily: fonts.CircularStdLight }}
            maxLength={10}
            keyboardType="numeric"
            onChangeText={handleChange('experienceYears')}
            onBlur={handleBlur('experienceYears')}
            value={values.experienceYears}
            error={touched.experienceYears && errors.experienceYears}
            inputStyle={{ fontFamily: fonts.CircularStdBook }}
            errorStyle={{ fontFamily: fonts.CircularStdBook }}
          />
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
        </>
      )}

      <LinearGradient
        colors={['#440217', '#CF577D', '#440217']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1.5 }}
        locations={[0, 0.5, 1]}
        style={styles.button}>
        <TouchableOpacity onPress={handleSubmit} disabled={loading}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontFamily: fonts.CircularStdMedium,
            }}>
            {loading ? 'Applying...' : 'Apply'}
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

export default AppliedTo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
    backgroundColor: '#fff',
    justifyContent:'center',

  },
  image1: {
    height: '20%',
    width: '50%',
    //marginBottom:20,
    resizeMode: 'center',
    alignItems:'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  radioContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioTextFocus: {
    fontFamily: fonts.CircularStdBook,
    marginRight: 10,
    color:'#3498DB'
  },
  radioText: {
    fontFamily: fonts.CircularStdBook,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: SIZES.h2,
    fontFamily: fonts.CircularStdMedium,
    color: '#411004',
    marginBottom: '2%',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  uploadButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom:20
  },
  uploadButtonText: {
    fontFamily: fonts.CircularStdBook,
    color:'#000'
  },
  button: {
    marginTop: 20,
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
