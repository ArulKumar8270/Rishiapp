import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import HomeBody from './HomeBody';
import { fonts } from '../../config';
import { CustomTextInput } from '../assets/textinput';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES } from '../styles/config';

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Job Title is required'),
  companyEmail: Yup.string().email('Invalid email').required('Company Email is required'),
  companyWebsite: Yup.string().url('Invalid URL').required('Company Website is required'),
  companyAddress: Yup.string().required('Company Address is required'),
  totalEmployees: Yup.number().required('Total Employees is required').min(1, 'Must be at least 1'),
});

const Post = ({ navigation }) => {
  const searchsheet = useRef();
  const windowHeight = Dimensions.get('window').height;
  const [isLoading, setLoading] = useState(false);

  return (
    <HomeBody
      navigation={navigation}
      title={'Home'}
      postJobDashbord={true}
      isMainPage={true}
      isLoading={isLoading}
    >
      <Formik
        initialValues={{
          jobTitle: '',
          companyEmail: '',
          companyWebsite: '',
          companyAddress: '',
          totalEmployees: '',
          logo: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setLoading(true);
          console.log(values);
          setLoading(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          // <View style={styles.form}>
          //   <Text>Job Title</Text>
          //   <TextInput
          //     style={styles.input}
          //     onChangeText={handleChange('jobTitle')}
          //     onBlur={handleBlur('jobTitle')}
          //     value={values.jobTitle}
          //   />
          //   {touched.jobTitle && errors.jobTitle && <Text style={styles.error}>{errors.jobTitle}</Text>}

          //   <Text>Company Email</Text>
          //   <TextInput
          //     style={styles.input}
          //     onChangeText={handleChange('companyEmail')}
          //     onBlur={handleBlur('companyEmail')}
          //     value={values.companyEmail}
          //     keyboardType="email-address"
          //   />
          //   {touched.companyEmail && errors.companyEmail && <Text style={styles.error}>{errors.companyEmail}</Text>}

          //   <Text>Company Website</Text>
          //   <TextInput
          //     style={styles.input}
          //     onChangeText={handleChange('companyWebsite')}
          //     onBlur={handleBlur('companyWebsite')}
          //     value={values.companyWebsite}
          //     keyboardType="url"
          //   />
          //   {touched.companyWebsite && errors.companyWebsite && <Text style={styles.error}>{errors.companyWebsite}</Text>}

          //   <Text>Company Address</Text>
          //   <TextInput
          //     style={styles.input}
          //     onChangeText={handleChange('companyAddress')}
          //     onBlur={handleBlur('companyAddress')}
          //     value={values.companyAddress}
          //   />
          //   {touched.companyAddress && errors.companyAddress && <Text style={styles.error}>{errors.companyAddress}</Text>}

          //   <Text>Total Employees</Text>
          //   <TextInput
          //     style={styles.input}
          //     onChangeText={handleChange('totalEmployees')}
          //     onBlur={handleBlur('totalEmployees')}
          //     value={values.totalEmployees}
          //     keyboardType="numeric"
          //   />
          //   {touched.totalEmployees && errors.totalEmployees && <Text style={styles.error}>{errors.totalEmployees}</Text>}

          //   <Button
          //     title="Upload Logo"
          //     onPress={() => {
          //       // Add your file picker logic here
          //     }}
          //   />
          //   <Button onPress={handleSubmit} title="Update" />
          // </View>
          <SafeAreaView style={[styles.card, styles.shadowProp]}>
          <Text style={styles.headerText}>Company Profile</Text>
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
          <CustomTextInput
            label={'Company Email'}
            labelStyle={{fontFamily: fonts.CircularStdLight}}
            maxLength={30}
            onChangeText={handleChange('companyEmail')}
            onBlur={handleBlur('companyEmail')}
            value={values.companyEmail}
            error={touched.companyEmail && errors.companyEmail}
            inputStyle={{fontFamily: fonts.CircularStdBook}}
            errorStyle={{fontFamily: fonts.CircularStdBook}}
          />
          <CustomTextInput
            label={'Company Website'}
            labelStyle={{fontFamily: fonts.CircularStdLight}}
            maxLength={100}
            onChangeText={handleChange('companyWebsite')}
            onBlur={handleBlur('companyWebsite')}
            value={values.companyWebsite}
            error={touched.companyWebsite && errors.companyWebsite}
            inputStyle={{fontFamily: fonts.CircularStdBook}}
            errorStyle={{fontFamily: fonts.CircularStdBook}}
          />
          <CustomTextInput
            label={'Company Address'}
            labelStyle={{fontFamily: fonts.CircularStdLight}}
            maxLength={100}
            onChangeText={handleChange('companyAddress')}
            onBlur={handleBlur('companyAddress')}
            value={values.companyAddress}
            error={touched.companyAddress && errors.companyAddress}
            inputStyle={{fontFamily: fonts.CircularStdBook}}
            errorStyle={{fontFamily: fonts.CircularStdBook}}
          />
          <CustomTextInput
            label={'Total Employees'}
            labelStyle={{fontFamily: fonts.CircularStdLight}}
            maxLength={10}
            onChangeText={handleChange('totalEmployees')}
            onBlur={handleBlur('totalEmployees')}
            value={values.totalEmployees}
            error={touched.totalEmployees && errors.totalEmployees}
            inputStyle={{fontFamily: fonts.CircularStdBook}}
            errorStyle={{fontFamily: fonts.CircularStdBook}}
          />
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#440217', '#CF577D', '#440217']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1.5}}
              locations={[0, 0.5, 1]}
              style={styles.button}>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
    padding: '10%',
    backgroundColor: '#fff',
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
    marginTop: 20,
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
});

export default Post;
