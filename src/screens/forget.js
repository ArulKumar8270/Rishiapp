import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';

const Forget = ({ navigation }) => {
  const phoneInput = React.useRef(null);

  const formik = useFormik({
    initialValues: { mobilenumber: '' },
    validationSchema: Yup.object().shape({
      mobilenumber: Yup.string()
        .required("we can't find your id")
        .matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Must contain only digits')
        .max(13, 'Invalid phone Number')
    }),
    onSubmit: (values, { resetForm }) => {
      alert('Password reset link sent to ' + values.mobilenumber);
      resetForm();
      navigation.navigate('Resetpassword')
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/LOCK.jpg')} style={styles.image} />
      <Text style={{ color: '#411004', fontFamily: 'CircularStd-Black' }}>FORGET PASSWORD</Text>
      <Text numberOfLines={2} style={styles.text}>
        Enter your mobile number, and we'll send you a link to reset your password
      </Text>

      <PhoneInput
        ref={phoneInput}
        defaultCode="IN"
        containerStyle={{
          width: '80%',
          borderWidth: 2,
          borderColor: '#560310',
          margin: '2%',
          borderRadius: 10,
        }}
        textContainerStyle={styles.textInput}
        textInputProps={{
          placeholder: 'Mobile Number',
          keyboardType: 'phone-pad',
        }}
        onChangeFormattedText={(text) => {
          formik.handleChange('mobilenumber')(text);
        }}
      />
      {formik.touched.mobilenumber && formik.errors.mobilenumber && (
        <Text style={styles.errorText}>{formik.errors.mobilenumber}</Text>
      )}
      <LinearGradient
        colors={['#440217', '#CF577D', '#440217']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1.5 }}
        locations={[0, 0.5, 1]}
        style={styles.button}
      >
        <TouchableOpacity onPress={formik.handleSubmit}>
          <Text style={{ color: 'white', fontFamily: 'CircularStd-Black' }}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#411004', fontFamily: 'CircularStd-Light' }}>&#60; BACK TO LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: '1%',
    width: '2%',
    padding: '10%',
  },
  textInput: {
    fontSize: 16,
    paddingVertical: -2,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 2,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: '2%',
    marginTop: '10%',
    marginBottom: '10%',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
  text: {
    color: '#411004',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2%',
    fontFamily: 'CircularStd-Light',
  },
});

export default Forget;
