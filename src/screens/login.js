import React ,{useState}from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView,ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-number-input';
import { SIZES, fontSize } from '../styles/config';
import { fonts } from '../../config';
import { NewIcon } from '../assets/svg';
import HomeBody from './HomeBody';

const validationSchema = Yup.object().shape({
  MobileNumber: Yup.string().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Must contain only digits')
  .max(13, 'Invalid phone Number')
    .required('*Mobile Number is required'),
  Password: Yup.string().required('*Password is required'),
});

const Login = ({ navigation }) => {
  const phoneInput = React.useRef(null);
  const handleLogin = () => {
    setLoading(true);
    // Perform any asynchronous operation here (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      Login()
      
    }, 2000); // Example: Simulate a 2-second loading time
  };
  const Login = async (request) => {
    try {
      const response = await fetch('https://yourapi.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request }),
      });
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Dashbord');
      },1000); 
      
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };
  const [loading, setLoading] = useState(false);
  return (

    <Formik
      initialValues={{ MobileNumber: '', Password: '' }}
      validationSchema={validationSchema}
      onSubmit={values => {
        let request = {
          userName: values.MobileNumber,
          password: values.Password,
        };
        Login(request);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <SafeAreaView style={styles.formContainer}>
          <View style={styles.innerContainer}>
            <Image source={require('../assets/logo.jpg')} style={styles.image1} />
            <Image source={require('../assets/PROFILE.jpg')} style={styles.image2} />
            <Text style={{ fontSize: fontSize.textLarge, marginRight: '50%', fontFamily: fonts.CircularStdLight, color: '#411004', marginBottom: '2%' }}>
              Welcome Back!
            </Text>
            <Text style={styles.text}>LOGIN INTO YOUR ACCOUNT</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={values.MobileNumber}
              defaultCode="IN"
              layout="first"
              withShadow
              autoFocus
              containerStyle={{
                width: '80%',
                
                borderWidth: 2,
                borderColor: '#560310',
                margin: '2%',
                borderRadius: 10,
              }}
              textContainerStyle={styles.textInput}
              onChangeFormattedText={(text) => setFieldValue('MobileNumber', text)}
            />
            {touched.MobileNumber && errors.MobileNumber && (
              <Text style={styles.errorText}>{errors.MobileNumber}</Text>
            )}
            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={handleChange('Password')}
              onBlur={handleBlur('Password')}
              value={values.Password}
              secureTextEntry={true}
            />
            {touched.Password && errors.Password && (
              <Text style={styles.errorText}>{errors.Password}</Text>
            )}
            <LinearGradient
              colors={['#440217', '#CF577D', '#440217']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1.5 }}
              locations={[0, 0.5, 1]}
              style={styles.button}
            >
              <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={{ textAlign: 'center', color: 'white', fontFamily: fonts.CircularStdMedium }}>Login</Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity style={{ marginLeft: '50%' }} onPress={() => {
             setLoading(true)
             navigation.navigate('Forget')
             setLoading(false)
            }
             }>
              <Text style={{ color: '#411004', fontFamily: fonts.CircularStdBook }}>Forgot password</Text>
            </TouchableOpacity>
            <Text style={{ color: '#411004', fontFamily: fonts.CircularStdBook, marginTop: '10%', marginBottom: '2%' }}>or login with</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Image source={require('../assets/go.jpg')} style={styles.image3} />
              <Image source={require('../assets/ip.jpg')} style={styles.image3} />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
              <Text style={{ color: '#411004', fontFamily: fonts.CircularStdBook }}>Don't have an account? Sign up for free</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    //position:'absolute',
    padding:'null',
  },
  innerContainer: {
    flex: 1,
   // justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image1: {
    height: '20%',
    width: '50%',
    marginTop: '10%',
    resizeMode: 'center',
  },
  image2: {
    height: '10%',
    width: '20%',
    resizeMode: 'center',
    marginBottom: '5%',
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#560310',
    padding: '2%',
    marginBottom: '3%',
    borderRadius: SIZES.radius,
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: SIZES.radius,
    marginBottom: '4%',
    borderRadius: SIZES.radius,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
  image3: {
    height: 50,
    width: 50,
    marginHorizontal: '1%',
  },
  text: {
    fontSize: fontSize.textLarge,
    marginRight: '25%',
    paddingBottom: SIZES.radius,
    fontFamily: fonts.CircularStdBlack,
    color: '#411004',
    marginLeft: 5,
    marginBottom: 5,
  },
  textInput: {
    paddingVertical: -2,
    borderRadius: 10,
    backgroundColor:'white'
  },
  errorText: {
    color: 'red',
    fontSize: fontSize.textLarge,
    fontFamily: fonts.CircularStdBook,
    marginLeft: '30%',
    marginBottom: '2%',
    marginTop: '-2%',
  },
});

export default Login;
