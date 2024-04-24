import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, TextInput, TouchableOpacity,View,KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../config';
import { fontSize,SIZES } from '../styles/config';
import { Formik } from 'formik'; // Import Formik
import * as Yup from 'yup';

const Post = () => {
  // Define the initial form values
  const initialValues = {
    jobTitle: '',
    numPeople: '',
    jobType: '',
    jobEligibility: '',
    salaryAmount: '',
    salaryPeriod: '',
    jobDescription: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job title is required'),
    numPeople: Yup.number().required('Number of people is required'),
    jobType: Yup.string().required('Job type is required'),
    jobEligibility: Yup.string().required('Eligibility is required'),
    salaryAmount: Yup.number().required('Salary amount is required'),
    salaryPeriod: Yup.string().required('Salary period is required'),
    jobDescription: Yup.string().required('Job description is required'),
  });

  // Handle form submission
  const onSubmit = (values, { resetForm }) => {
    // Handle your form submission logic here
    console.log(values);
    // Reset the form after submission
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Image source={require('../assets/logo.jpg')} style={styles.image} />
          <Text style={{ fontFamily: fonts.CircularStdBlack, fontSize: fontSize.amountFont, color: '#411004', marginTop: '2%' }}>POST JOB</Text>
          <TextInput
            placeholder="enter job title"   
            value={values.jobTitle}
            onChangeText={handleChange('jobTitle')}
            style={styles.input}
          />
          {touched.jobTitle && errors.jobTitle && (
            <Text style={{ color: 'red' }}>{errors.jobTitle}</Text>
          )}
          <TextInput
            placeholder="number of people you wish to hire for this job"
            value={values.numPeople}
            onChangeText={handleChange('numPeople')}
            style={styles.input}
          />
          {touched.numPeople && errors.numPeople && (
            <Text style={{ color: 'red' }}>{errors.numPeople}</Text>
          )}
          <TextInput
            placeholder="job type"
            value={values.jobType}
            onChangeText={handleChange('jobType')}
            style={styles.input}
          />
          {touched.jobType && errors.jobType && (
            <Text style={{ color: 'red' }}>{errors.jobType}</Text>
          )}
          <TextInput
            placeholder="jobEligibility"
            value={values.jobEligibility}
            onChangeText={handleChange('jobEligibility')}
            style={styles.input}
          />
          {touched.jobEligibility && errors.jobEligibility && (
            <Text style={{ color: 'red' }}>{errors.jobEligibility}</Text>
          )}
          {/* Add more inputs and error handling for each input */}
          <View style={{ flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'center', marginTop:'-1%' }}>
            <TextInput
              placeholder="salary amount"
              value={values.salaryAmount}
              onChangeText={handleChange('salaryAmount')}
              style={{ height: '100%', width: '38%', borderWidth: 2, borderColor: '#560310', padding: 10, borderRadius: SIZES.radius, marginRight: '4%' }}
            />
            <TextInput
              placeholder="per month"
              value={values.salaryPeriod}
              onChangeText={handleChange('salaryPeriod')}
              style={{ height: '100%', width: '38%', borderWidth: 2, borderColor: '#560310', padding: 10, borderRadius: SIZES.radius }}
            />
          </View>
          <TextInput
            placeholder="job description"
            value={values.jobDescription}
            onChangeText={handleChange('jobDescription')}
            style={{ height: '20%', width: '80%', borderWidth: 2, borderColor: '#560310', padding: 10, marginTop:'2%',marginBottom:'2%',  borderRadius: SIZES.radius // Enable multiline input
             }}
             textAlignVertical="top"
             
          />
          <LinearGradient
            colors={['#440217', '#CF577D', '#440217']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            locations={[0, 0.5, 1]}
            style={styles.button}
          >
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={{ textAlign: 'center', color: 'white', fontFamily: fonts.CircularStdMedium }}>Post</Text>
            </TouchableOpacity>
          </LinearGradient>
          </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    resizeMode: 'center',
    width: '50%',
    height: '20%',
    marginTop: 20,
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#560310',
    //padding: '2%',
    marginBottom: '3%',
    borderRadius: SIZES.radius,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: SIZES.radius,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
  

});

export default Post;
