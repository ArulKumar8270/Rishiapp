import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {CustomTextInput} from '../assets/textinput';
import configStyle from './configStyle';
import {fonts} from '../../config';
import LinearGradient from 'react-native-linear-gradient';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  subject: Yup.string().required('Subject is required'),
  jobDescription: Yup.string().required('Job description is required'),
});

const Contactus = () => {
  return (
    <View style={{flex: 1}}>
      <Text style={configStyle.heading1}>Contact Us</Text>
      <ScrollView style={[configStyle.container,{backgroundColor:'#3498db',marginTop:-10}]}>
        <View style={configStyle.card}>
          <Text style={configStyle.heading2}>Enquiry Now</Text>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phone: '',
              subject: '',
              jobDescription: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <CustomTextInput
                  label={'Your Full name'}
                  maxLength={30}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  error={touched.fullName && errors.fullName}
                />
                <CustomTextInput
                  label={'Your Email'}
                  maxLength={30}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={touched.email && errors.email}
                />
                <CustomTextInput
                  label={'Your Phone'}
                  maxLength={30}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  error={touched.phone && errors.phone}
                />
                <CustomTextInput
                  label={'Subject'}
                  maxLength={30}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  value={values.subject}
                  error={touched.subject && errors.subject}
                />
                <TextInput
                  style={[
                    styles.textInput,
                    touched.jobDescription &&
                      errors.jobDescription && {borderColor: 'red'},
                  ]}
                  multiline={true}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                  numberOfLines={4}
                  onChangeText={handleChange('jobDescription')}
                  onBlur={handleBlur('jobDescription')}
                  value={values.jobDescription}
                  placeholder="Job Description"
                />
                {touched.jobDescription && errors.jobDescription && (
                  <Text style={styles.errorText}>{errors.jobDescription}</Text>
                )}

                <LinearGradient
                  colors={['#440217', '#CF577D', '#440217']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1.5}}
                  locations={[0, 0.5, 1]}
                  style={configStyle.button}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontFamily: fonts.CircularStdMedium,
                      }}>
                      Sumbit
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
          </Formik>
        </View>
        <View style={configStyle.card}>
          <Text style={configStyle.heading2}>Contact Info</Text>
          <View style={{flexDirection:'row'}}>
          <FontAwesomeIcon icon={faPhone} style={{marginHorizontal:5,color:'#2874a6'}}/>
          <Text style={configStyle.body}>Call : +91 99003 59747</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <FontAwesomeIcon icon={faEnvelope} style={{marginHorizontal:5,color:'#2874a6'}}/>
          <Text style={configStyle.body}>rishigroubs@gmail.com</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <FontAwesomeIcon icon={faLocationDot} style={{marginHorizontal:5,color:'#2874a6'}}/>
          <Text style={configStyle.body}>Rishi technologies 848, Kamaraj Nagar 7 th street, Palakkarai, Kumbakonam.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Contactus;

const styles = StyleSheet.create({
  textInput: {
    height: 100, // Adjust the height as needed
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
