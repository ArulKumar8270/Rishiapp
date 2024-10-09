import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import {CustomTextInput} from '../../assets/textinput';
import {fonts} from '../../../config';
import {SIZES} from '../../styles/config';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import {loginResponseSelector} from '../../redux/selectors/app.selector';
import {SET_USER_DATA} from '../../redux/constants';
import {store} from '../../redux';

const ProfileUpdate = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('fresher');
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
      .required('Phone number is required')
      .min(10, 'Phone number must be 10 characters'),
    gender: yup.string().required('Enter your Gender'),
    qualification: yup.string().required('Enter your Qualifications'),
    jobTitle:
      selectedOption === 'experience'
        ? yup.string().required('Job Title is required')
        : yup.string(),
    experienceYears:
      selectedOption === 'experience'
        ? yup.number().required('Experience Years is required')
        : yup.number(),
    companyName:
      selectedOption === 'experience'
        ? yup.string().required('Company Name is required')
        : yup.string(),
  });

  const Gender = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Transgender', value: 'Transgender'},
  ];

  const handleResumeUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setResume(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };
  const loginResponse = useSelector(loginResponseSelector);

  const handleApplyJob = useCallback(
    async values => {
      setLoading(true);
      try {
        // Create a FormData object
        const request = {
          id: loginResponse.data.id,
          firstName: values.firstName || '',
          lastName: values.lastName || '',
          email: values.email || '',
          phoneNumber: values.phoneNumber || '',
          userName:values.phoneNumber || '',
          qualification: values.qualification || '',
          gender: values.gender || '',
          experience: values.experienceYears || '',
          resume: resume ? resume[0]: null,
          totalEmployee: 10,            
        };
        const formData = new FormData();
        // Append form fields
        formData.append('id', loginResponse.data.id);
        formData.append('firstName', values.firstName || '');
        formData.append('lastName', values.lastName || '');
        formData.append('email', values.email || '');
        formData.append('phoneNumber', values.phoneNumber || '');
        formData.append('userName', values.phoneNumber || '');
        formData.append('qualification', values.qualification || '');
        formData.append('gender', values.gender || '');
        formData.append('experience', values.experienceYears || '');
        formData.append('totalEmployee', 10);
        if (resume && resume[0]) {
          formData.append('resume', {
            uri: resume[0].uri,
            type: resume[0].type || 'application/pdf', // Ensure type is set
            name: resume[0].name || 'resume.pdf', // Ensure a name is set
          });
        }
        console.log("formdata=====================================================",formData);
        const response = await axios.put(
          `https://rishijob.com/backend/api/v1/customers/${loginResponse.data.id}`,
          formData._parts,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Required for file uploads
            },
          },
        );
        setLoading(false)
        if (response.data.success) {
          store.dispatch({
            type: SET_USER_DATA,
            payload: request
          });
          navigation.goBack();
        } else {
          Alert.alert(
            'Application Failed',
            'An error occurred. Please try again.',
          );
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        Alert.alert(
          'Application Failed',
          error.response?.data?.message ||
            'An error occurred. Please try again.',
        );
      }
    },
    [resume, navigation],
  );

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Enter Your Profile Details Here</Text>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            qualification: '',
            gender: '',
            jobTitle: '',
            experienceYears: '',
            companyName: '',
            
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleApplyJob(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <SafeAreaView style={[styles.card, styles.shadowProp]}>
              <CustomTextInput
                label={'First Name'}
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
                label={'Last Name'}
                labelStyle={{fontFamily: fonts.CircularStdLight}}
                maxLength={30}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                error={touched.lastName && errors.lastName}
                inputStyle={{fontFamily: fonts.CircularStdBook}}
                errorStyle={{fontFamily: fonts.CircularStdBook}}
              />
              <CustomTextInput
                label={'Email'}
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
                label={'Phone Number'}
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
                label={'Qualification'}
                labelStyle={{fontFamily: fonts.CircularStdLight}}
                maxLength={100}
                onChangeText={handleChange('qualification')}
                onBlur={handleBlur('qualification')}
                value={values.qualification}
                error={touched.qualification && errors.qualification}
                inputStyle={{fontFamily: fonts.CircularStdBook}}
                errorStyle={{fontFamily: fonts.CircularStdBook}}
              />
              <View>
                <Text
                  style={{
                    fontFamily: fonts.CircularStdBook,
                    color: '#3498DB',
                    marginBottom: 5,
                  }}>
                  Gender
                </Text>
                <Dropdown
                  data={Gender}
                  labelField="label"
                  valueField="value"
                  value={values.gender}
                  onChange={item => setFieldValue('gender', item.value)}
                  containerStyle={styles.dropdown}
                  placeholder="Select gender"
                />
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBlockColor: '#ccc',
                    marginVertical: 10,
                    marginBottom: 20,
                  }}></View>
                {touched.gender && errors.gender && (
                  <Text style={styles.errorText}>{errors.gender}</Text>
                )}
              </View>
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
                    labelStyle={{fontFamily: fonts.CircularStdLight}}
                    maxLength={30}
                    onChangeText={handleChange('jobTitle')}
                    onBlur={handleBlur('jobTitle')}
                    value={values.jobTitle}
                    error={touched.jobTitle && errors.jobTitle}
                    inputStyle={{fontFamily: fonts.CircularStdBook}}
                    errorStyle={{fontFamily: fonts.CircularStdBook}}
                  />
                  <CustomTextInput
                    label={'Experience Years'}
                    labelStyle={{fontFamily: fonts.CircularStdLight}}
                    maxLength={10}
                    keyboardType="numeric"
                    onChangeText={handleChange('experienceYears')}
                    onBlur={handleBlur('experienceYears')}
                    value={values.experienceYears}
                    error={touched.experienceYears && errors.experienceYears}
                    inputStyle={{fontFamily: fonts.CircularStdBook}}
                    errorStyle={{fontFamily: fonts.CircularStdBook}}
                  />
                  <CustomTextInput
                    label={'Company Name'}
                    labelStyle={{fontFamily: fonts.CircularStdLight}}
                    maxLength={30}
                    onChangeText={handleChange('companyName')}
                    onBlur={handleBlur('companyName')}
                    value={values.companyName}
                    error={touched.companyName && errors.companyName}
                    inputStyle={{fontFamily: fonts.CircularStdBook}}
                    errorStyle={{fontFamily: fonts.CircularStdBook}}
                  />
                </>
              )}

              <LinearGradient
                colors={['#440217', '#CF577D', '#440217']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1.5}}
                locations={[0, 0.5, 1]}
                style={styles.button}>
                <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontFamily: fonts.CircularStdMedium,
                    }}>
                    {loading ? 'Submitting...' : 'Submit'}
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

export default ProfileUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioTextFocus: {
    fontFamily: fonts.CircularStdBook,
    color: '#3498DB',
  },
  radioText: {
    fontFamily: fonts.CircularStdBook,
  },
  welcomeText: {
    fontSize: SIZES.h2,
    fontFamily: fonts.CircularStdMedium,
    color: '#411004',
    marginBottom: '2%',
  },
  uploadButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    fontFamily: fonts.CircularStdBook,
    color: '#000',
  },
  button: {
    marginTop: 20,
    width: '100%',
    padding: SIZES.radius,
    borderRadius: SIZES.radius,
    shadowOffset: {width: -2, height: 4},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
  errorText: {
    color: 'red',
    fontFamily: fonts.CircularStdBook,
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
  },
});
