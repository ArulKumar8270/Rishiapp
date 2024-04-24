import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fonts } from '../../config';
import { fontSize,SIZES } from './styles/config'

const Sigin = ({ navigation }) => {
  const initialValues = { Newpassword: '', Confirmpassword: '' };

  const validationSchema = Yup.object().shape({
    Newpassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    Confirmpassword: Yup.string()
      .oneOf([Yup.ref('Newpassword'), null], `Passwords does't match`)
      .required('Password is required'),
  });

  const handleFormSubmit = (values) => {
    // You can handle password verification here if needed.
    // For demonstration purposes, we'll just navigate to the 'Otp' screen.
    navigation.navigate('Otp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/MESSAGEICON.jpg')} style={styles.image} />
      <Text style={styles.text}>READY TO TACK THE NEXT STEPS?</Text>
      <Text style={{ marginTop:'5%',marginBottom: '10%', color: '#411004',fontFamily:fonts.CircularStdBook }}>create an account or sign in.</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Enter new password"
              style={styles.input}
              secureTextEntry={true}
              keyboardType="default"
              onChangeText={handleChange('Newpassword')}
              onBlur={handleBlur('Newpassword')}
              value={values.Newpassword}
            />
            {touched.Newpassword && errors.Newpassword && (
              <Text style={{ color: 'red',fontFamily:fonts.CircularStdBook }}>{errors.Newpassword}</Text>
            )}

            <TextInput
              placeholder="Enter confirm password"
              secureTextEntry={true}
              keyboardType="default"
              style={styles.input}
              onChangeText={handleChange('Confirmpassword')}
              onBlur={handleBlur('Confirmpassword')}
              value={values.Confirmpassword}
            />
            {touched.Confirmpassword && errors.Confirmpassword && (
              <Text style={{ color: 'red',fontFamily:fonts.CircularStdBook }}>{errors.Confirmpassword}</Text>
            )}
            <LinearGradient
              colors={['#440217', '#CF577D', '#440217']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1.5 }}
              locations={[0, 0.5, 1]}
              style={styles.button}
            >
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={{ color: 'white' , fontFamily:fonts.CircularStdBlack}}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color:'#411004', fontFamily:fonts.CircularStdBook}}>&#60;BACK TO LOGIN</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
    height: '5%',
    width: '29%',
    padding:'5%',
    //marginTop: '30%',
    marginBottom: '5%',
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#560310',
    padding: '2%',
    margin: '2%',
    borderRadius: 10,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: '2%',
    margin: '2%',
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
  text: {
    fontSize: 18 ,
    color: '#411004',
    textAlign: 'center',
    fontFamily:fonts.CircularStdBlack
  },
});

export default Sigin;
