import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import HomeBody from './HomeBody';
import { fonts } from '../../config';
import { CustomTextInput } from '../assets/textinput';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES } from '../styles/config';

// Validation schema for form fields
const validationSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Job Title is required'),
    jobCategory: Yup.string().required('Job Category is required'),
    salaryFrom: Yup.number().required('Salary From is required').min(0, 'Salary must be positive'),
    salaryTo: Yup.number().required('Salary To is required').min(0, 'Salary must be positive').moreThan(Yup.ref('salaryFrom'), 'Salary To must be greater than Salary From'),
    experience: Yup.string().required('Experience is required'),
    location: Yup.string().required('Location is required'),
    jobType: Yup.string().required('Job Type is required'),
    hiringCandidates: Yup.number().required('Hiring Candidates is required').min(1, 'Must hire at least 1 candidate'),
    jobDescription: Yup.string().required('Job Description is required'),
  });

const CreateJob = ({ navigation }) => {
  const searchsheet = useRef();
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoBinary, setLogoBinary] = useState(null);

  const handleSubmit = useCallback(async (values) => {
    console.log('',values)
    setLoading(true);
    try {
      const request = {
        jobTitle: values.jobTitle,
        jobCategory: values.jobCategory,
        salaryFrom:  values.salaryFrom,
        salaryTo:values.salaryTo,
        experience: values.experience,
        jobLocation: values.location,
        jobType: values.jobType,
        hiringCandidates: values.hiringCandidates,
        jobdesCription: values.jobDescription,
        companyId:  values.jobDescription,
       companyLogo :null,
       companyName : values.jobDescription,
       
      };

      const response = await axios.post(`https://rishijob.com/backend/api/v1/courses`, request);
      console.log('------------------',response.data)
      setLoading(false);
      if (response.data.success) {
        navigation.navigate('Jobs',{response});
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

  const jobCategories = [
    { label: 'Real Estate Business', value: 'Real Estate Business' },
    { label: 'Business Development', value: 'Business Development' },
    { label: 'Share Market Analysis', value: 'Share Market Analysis' },
    { label: 'Weather & Environment', value: 'Weather & Environment' },
    { label: 'Finance & Banking Service', value: 'Finance & Banking Service'},
    { label: 'IT & Network Service', value: 'IT & Network Service'},
    { label: 'Restaurant Service', value: 'Restaurant Service'},
    { label: 'Defence & Fire Service', value: 'Defence & Fire Service'},
    { label: 'Home Delivery Service', value: 'Home Delivery Service'},
  ];

  const jobTypes = [
    { label: 'Full-Time', value: 'Full-Time' },
    { label: 'Part-Time', value: 'Part-Time' },
    { label: 'Internship', value: 'Internship' },
  ];

  return (
    <HomeBody
      navigation={navigation}
      title={'Create Job'}
      postJobDashbord={true}
      isMainPage={true}
      isLoading={loading}
      
    >
      <Formik
        initialValues={{
         
                jobTitle: '',
                jobCategory: '',
                salaryFrom: '',
                salaryTo: '',
                experience: '',
                location: '',
                jobType: '',
                hiringCandidates: '',
                jobDescription: ''
            
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
           <SafeAreaView style={[styles.card, styles.shadowProp]}>
           <ScrollView>
        <Text style={styles.headerText}>Company Profile</Text>
           <CustomTextInput
             label="Job Title"
             maxLength={50}
             onChangeText={handleChange('jobTitle')}
             onBlur={handleBlur('jobTitle')}
             value={values.jobTitle}
             error={touched.jobTitle && errors.jobTitle}
           />
           <View style={styles.inputContainer}>
             <Text style={styles.label}>Job Category</Text>
             <Dropdown
               data={jobCategories}
               labelField="label"
               
               valueField="value"
               value={values.jobCategory}
               onChange={item => setFieldValue('jobCategory', item.value)}
               containerStyle={styles.dropdown}
               placeholder="Select Job Category"
             />
             {touched.jobCategory && errors.jobCategory && <Text style={styles.errorText}>{errors.jobCategory}</Text>}
           </View>
           <CustomTextInput
             label="Salary From"
             onChangeText={handleChange('salaryFrom')}
             maxLength={30}
             onBlur={handleBlur('salaryFrom')}
             value={values.salaryFrom}
             keyboardType="numeric"
             error={touched.salaryFrom && errors.salaryFrom}
           />
           <CustomTextInput
             label="Salary To"
             maxLength={30}
             onChangeText={handleChange('salaryTo')}
             onBlur={handleBlur('salaryTo')}
             value={values.salaryTo}
             keyboardType="numeric"
             error={touched.salaryTo && errors.salaryTo}
           />
           <CustomTextInput
             label="Experience"
             maxLength={30}
             onChangeText={handleChange('experience')}
             onBlur={handleBlur('experience')}
             value={values.experience}
             error={touched.experience && errors.experience}
           />
           <CustomTextInput
             label="Location"
             maxLength={100}
             onChangeText={handleChange('location')}
             onBlur={handleBlur('location')}
             value={values.location}
             error={touched.location && errors.location}
           />
           <View style={styles.inputContainer}>
             <Text style={styles.label}>Job Type</Text>
             <Dropdown
               data={jobTypes}
               labelField="label"
               valueField="value"
               value={values.jobType}

               onChange={item => setFieldValue('jobType', item.value)}
               containerStyle={styles.dropdown}
               placeholder="Select Job Type"
             />
             {touched.jobType && errors.jobType && <Text style={styles.errorText}>{errors.jobType}</Text>}
           </View>
           <CustomTextInput
             label="Hiring Candidates"
             onChangeText={handleChange('hiringCandidates')}
             onBlur={handleBlur('hiringCandidates')}
             maxLength={30}
             value={values.hiringCandidates}
             keyboardType="numeric"
             error={touched.hiringCandidates && errors.hiringCandidates}
           />
           <CustomTextInput
             label="Job Description"
             onChangeText={handleChange('jobDescription')}
             onBlur={handleBlur('jobDescription')}
             maxLength={30}
             value={values.jobDescription}
             multiline={true}
             numberOfLines={4}
             error={touched.jobDescription && errors.jobDescription}
           />
            <View style={{    width: '100%',}}>
              <LinearGradient
                colors={['#440217', '#CF577D', '#440217']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.5 }}
                locations={[0, 0.5, 1]}
                style={styles.button}
              >
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={{  textAlign: 'center',
    color: 'white',
    fontFamily: fonts.CircularStdMedium,}}>Update</Text>
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
        paddingHorizontal: 15,
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
      inputContainer: {
        marginBottom: 15,
        marginTop:10
      },
      label: {
        fontSize: 16,
        fontFamily: fonts.CircularStdBook,
        color: '#2C3E50',
        marginBottom: 5,
      },
      dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
      },
      errorText: {
        color: 'red',
        fontSize: 12,
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
});

export default CreateJob;
