import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  Button,
  ScrollView,
  ImageBackground,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {RadioButton} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  CameraIcon,
  CropIcon,
  Doc,
  Dprofile,
  GalleryIcon,
  LocationIcon,
  MailIcon,
  PencilIcon,
  RemoveIcon,
  SuiteCaseIcon,
  TelephoneIcon,
} from '../assets/svg';
import {CustomTextInput, DummyTextInput} from '../assets/textinput';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {SIZES, fontSize} from '../styles/config';
import {fonts} from '../../config';
import ImagePicker from 'react-native-image-crop-picker';
import Basicdetails from './profileitems.js/basicdetails';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import CustomDropDown from '../assets/components/custom_dropdown';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
//import { TabView, TabBar } from 'react-native-tab-view';

const Profile = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const Pictureref = useRef(null);
  const Detailref = useRef(null);
  const windowHeight = Dimensions.get('window').height;
  //detail
  //
  const [userData, setUserData] = useState([{
    id:1,
    Firstname:'Firstname',
    Lastname:'Lastname',
    description:'headline'
  }
  ]);
  const [selectedImage, setSelectedImage] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [formValues, setFormValues] = useState(null);
  const [selectedOption, setSelectedOption] = React.useState('fresher');
  const [resume, setResume] = React.useState(null);
  //----------------------------------------- Function to update user data---------------------------------------------------//
  const updateUser = (id, Firstname,  Lastname) => {
    const updatedData = userData.map(item => {
      if (item.id === id) {
        return {...item,Firstname: Firstname,  Lastname:  Lastname};
      }
      return item;
    });
    console.log('update---------------999999---------------dData',updatedData)

    setUserData(updatedData);
  };


  //open gallery function
  const Opengallery = () => {
    if (Pictureref.current) {
      Pictureref.current.open();
    }
  };
  console.log('==================================',userData)

  //function set profile picture
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width,
      height,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        setHeight(height);
        setWidth(width);
        console.log(image);
      })
      .catch(error => {
        console.log(error);
      });
    Pictureref.current.close();
  };
  const handleCameraPicker = () => {
    ImagePicker.openCamera({
      width,
      height,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        setHeight(height);
        setWidth(width);
      })
      .catch(error => {
        console.log(error);
      });
    Pictureref.current.close();
  };
  const handleCropImage = () => {
    if (selectedImage) {
      ImagePicker.openCropper({
        path: selectedImage,
        width,
        height,
        cropping: true,
        cropperCircleOverlay: false, // Set to true if you want a circular crop
        freeStyleCropEnabled: true,
      })
        .then(image => {
          setSelectedImage(image.path);
          setHeight(250);
          setWidth(170);
          console.log(image);
        })
        .catch(error => {
          console.log(error);
        });
      Pictureref.current.close();
    }
  };
  // Function to handle form submission
  const handleProfileSubmit = async values => {
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',values)
    try {
      const response = axios.post(
        `https://rishijob.com/backend/api/v1/customers/${values.id}`,
      );
      console.log('-------------------------', response);
      
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    console.log(values);
    bottomSheetRef.current.close();
   
  };
 
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
  const Gender = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];

  const validationSchema = yup.object().shape({
  
    Firstname: yup.string().required('Enter your Firstname'),
    Lastname: yup.string().required('Enter your Lasttname'),
    qualification: yup.string().required('Enter your Qualification'),
    gender: yup.string().required('Enter your Gender'),
    headline: yup.string().required('Headline is Required'),
    mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\d+$/, 'Mobile number must contain only numbers')
     .max(10, 'Mobile number must be 10 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
    obTitle:selectedOption === 'experience' ? yup.string().required('Job Title is required') : yup.string(),
    experience:  selectedOption === 'experience' ? yup.number().required('Experience Years is required') : yup.number(),
    companyName:selectedOption === 'experience' ? yup.string().required('Company Name is required') : yup.string(),
    totalSalary:selectedOption === 'experience' ? yup.string().required('salary is required') : yup.string(),
  });

  const profilitems = ({item, updateUser}) => (
   
    <ImageBackground
      source={require('../assets/Background.png')}
      style={{
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
          height: 10,
          width: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // Apply elevation for Androi
      }}>
        { console.log('----------item-------',item)}
      <View
        style={{
          alignItems: 'center',
          //backgroundColor: '#fff',
          padding: 10,
          marginTop: '10%',
          marginHorizontal: 20,
        }}>
        <Image
          source={
            selectedImage ? {uri: selectedImage} : require('../assets/dp.png')
          }
          style={styles.dp}
        />
        <>{item.Firstname?<Text style={styles.profilename}>{item.Firstname}</Text>:<Text style={styles.profilename}>FirstName</Text>}</>
        
        <Text style={styles.profilename}>{item.Lastname}</Text>
        <TouchableOpacity
          style={{marginTop: -17, marginVertical: 10, marginLeft: 'auto'}}
          onPress={() => bottomSheetRef.current.open()}>
          <PencilIcon height={15} width={15} color={'#fff'} />
        </TouchableOpacity>
        <Text style={[styles.profileheadline, {color: '#fff'}]}>
          {item.description}
        </Text>
      </View>

      <RBSheet
        ref={bottomSheetRef}
        height={windowHeight}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <Formik
          initialValues={{
            Firstname: "",
            Lastname: '',
            qualification: '',
            gender: '',
            headline: '',
            mobileNumber: '',
            email: '',
            jobTitle: '',
            experience: '',
            companyName: '',
            totalSalary: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log('-----------------------',values)
            //handleSubmit(values)
            handleProfileSubmit(values);
            updateUser(item.id,values); // Update user data
            actions.setSubmitting(false);
            bottomSheetRef.current.close();
          }}>
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <ScrollView>
              <View style={styles.Rbcontainer}>
                <View>
                  <Text style={styles.rbSheetheading}>Profile picture</Text>
                  <Text style={styles.rbsheetcontent}>
                    profile with photo was has 40% higher chances of getting
                    noticed by recruiters
                  </Text>
                  <View style={{alignItems: 'center', marginVertical: 20}}>
                    <TouchableOpacity activeOpacity={1} onPress={Opengallery}>
                      <Image
                        source={
                          selectedImage
                            ? {uri: selectedImage}
                            : require('../assets/dp.png')
                        }
                        style={[styles.dp, {height: 100, width: 100}]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <SafeAreaView style={[styles.card, styles.shadowProp]}>
                <Text style={styles.rbSheetheading}>Introduction</Text>
                <Text style={styles.rbsheetcontent}>
                  Introduce yourself to the recruiters
                </Text>
                <CustomTextInput
                  variant="underline"
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  label={'First Name'}
                  //placeholder="Enter your name"
                  onChangeText={value => {
                    setFieldValue('name', value);
                    handleChange('name');
                  }}
                  // onBlur={handleBlur('name')}
                  error={touched.name && errors.name}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                  maxLength={37}
                  value={values.name}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                />
                <CustomTextInput
                  variant="underline"
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  label={'Last Name'}
                  //placeholder="Enter your profile headline"
                  onChangeText={handleChange('Lastname')}
                   onBlur={handleBlur('Lastname')}
                  error={touched.Lastname && errors.Lastname}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                  maxLength={100}
                  value={values.Lastname}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                />
                <CustomTextInput
                  variant="underline"
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  label={'Profile Headline'}
                  //placeholder="Enter your profile headline"
                  onChangeText={handleChange('headline')}
                   onBlur={handleBlur('headline')}
                  error={touched.headline && errors.headline}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                  maxLength={100}
                  value={values.headline}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                />
                <CustomTextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  label={'Email'}
                  value={values.email}
                  keyboardType="email-address"
                  error={touched.email && errors.email}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                  maxLength={50}
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                />
                <View>
             <Text style={{fontFamily:fonts.CircularStdBook, color:'#3498DB',marginBottom:5}}>Gender</Text>
             <Dropdown
               data={Gender}
               labelField="label"
               valueField="value"
               value={values.gender}

               onChange={item => setFieldValue('gender', item.value)}
               containerStyle={styles.dropdown}
               placeholder="Select gender"
             />
             <View style={{borderBottomWidth:1, borderBlockColor:'#ccc',marginVertical:10,marginBottom:20}}>              
             </View>
             {touched.gender && errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
           </View>
               <CustomTextInput
                  variant="underline"
                  labelStyle={{fontFamily: fonts.CircularStdLight}}
                  label={'Qualification'}
                  //placeholder="Enter your profile headline"
                  onChangeText={handleChange('qualification')}
                  onBlur={handleBlur('qualification')}
                  error={touched.qualification && errors.qualification}
                  errorStyle={{fontFamily: fonts.CircularStdBook}}
                  maxLength={100}
                  value={values.qualification}
                  inputStyle={{fontFamily: fonts.CircularStdBook}}
                />
                <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleResumeUpload}>
        <Text style={styles.uploadButtonText}>
          {resume ? resume[0].name : 'Upload Resume'}
        </Text>
      </TouchableOpacity>
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
                  <View>
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
                        onChangeText={handleChange('experience')}
                        onBlur={handleBlur('experience')}
                        value={values.experience}
                        error={touched.experience && errors.experience}
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
                      <CustomTextInput
                        label={'TotalSalary'}
                        labelStyle={{fontFamily: fonts.CircularStdLight}}
                        maxLength={30}
                        onChangeText={handleChange('totalSalary')}
                        onBlur={handleBlur('totalSalary')}
                        value={values.totalSalary}
                        error={touched.totalSalary && errors.totalSalary}
                        inputStyle={{fontFamily: fonts.CircularStdBook}}
                        errorStyle={{fontFamily: fonts.CircularStdBook}}
                      />
                    </>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30,
                    marginVertical: 40,
                    marginTop: 'auto',
                  }}>
                  <TouchableOpacity
                    onPress={() => bottomSheetRef.current.close()}>
                    <Text
                      style={{
                        fontFamily: fonts.CircularStdMedium,
                        color: '#0277BD',
                        marginTop: 13,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleProfileSubmit}>
                    <Text
                      style={{
                        fontFamily: fonts.CircularStdMedium,
                        color: '#fff',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
                <RBSheet
                  ref={Pictureref}
                  height={200}
                  openDuration={250}
                  customStyles={{
                    container: {
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    },
                  }}>
                  <View
                    style={[
                      styles.Rbcontainer,
                      {justifyContent: 'space-between'},
                    ]}>
                    <TouchableOpacity onPress={handleImagePicker}>
                      <View style={{flexDirection: 'row'}}>
                        <GalleryIcon height={28} width={28} />
                        <Text style={styles.imagepicker}>
                          Choose from Library
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCameraPicker}>
                      <View style={{flexDirection: 'row'}}>
                        <CameraIcon height={25} width={25} />
                        <Text style={styles.imagepicker}>Take a Photo</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCropImage}>
                      <View style={{flexDirection: 'row'}}>
                        <CropIcon height={25} width={25} />
                        <Text style={styles.imagepicker}>Crop Image</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedImage(null);
                        Pictureref.current.close();
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <RemoveIcon height={25} width={25} color={'red'} />
                        <Text style={[styles.imagepicker, {color: 'red'}]}>
                          Remove
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </RBSheet>
              </View>
            </ScrollView>
          )}
        </Formik>
      </RBSheet>
    </ImageBackground>
  );

  //basic details :
  const [basicDetails, setBasicDetails] = useState([
    {
      id: 2,
      label: 'Basic details',
      firstname: 'Work Status',
      lastname: 'chennai',
      email: 'dummy@gmail.com',
      // mobilenumber: 1234567890,
      // resume: 'dummy.pdf',
    },
  ]);
  //-------------------update detail--------------------------
  const updateDetails = (
    id,
    Firstname,
    Lastname,
    email
    
  ) => {
    const updatedDetailsData = basicDetails.map(item => {
      if (item.id === id) {
        return {
          ...item,
          label: 'Basic details',
          firstname:Firstname,
          lastname:Lastname,
          email: email,
          //mobilenumber: mobilenumber,
        };
      }
      return item;
    });

    setBasicDetails(updatedDetailsData);
  };
  const BasicRender = ({item}) => (
    <SafeAreaView>
      <View style={styles.basicitem}>
        <Text style={styles.profileTitle}>{item.label}</Text>
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          <SuiteCaseIcon height={20} width={20} color={'#ABB2B9'} />
          <View>
            {item.firstname ? (
              <View>
                <Text style={styles.ProfilItems}>{item.firstname}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.ProfilItems}>first name</Text>
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          {/* <LocationIcon height={22} width={22} color={'#ABB2B9'} /> */}
          <Text style={styles.ProfilItems}>{item.lastname}</Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          {/* <MailIcon height={20} width={20} color={'#ABB2B9'} /> */}
          <Text style={styles.ProfilItems}>{item.email}</Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          <TelephoneIcon height={15} width={15} color={'#ABB2B9'} />
          <Text style={styles.ProfilItems}>{item.mobilenumber}</Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          <Doc height={20} width={20} color={'#ABB2B9'} />
          <Text style={styles.ProfilItems}>{item.resume}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  const [experiencedata, setExperiencedata] = useState([
    {
      id: 3,
      label: 'Experience',
      comapany: 'Company Name',
      Totalyears: 'Eg 0.0',
      NoticePeried: 'Eg 1 month',
    },
  ]);
  const Experienceref = useRef(null);
  const [value, setValue] = useState('');
  //------------------------experience details---------------------
  const updateExperience = (id, comapany, experience, noticePeriod) => {
    const updatedExperienceData = experiencedata.map(item => {
      if (item.id === id) {
        return {
          ...item,
          label: 'Experience',
          comapany: comapany,
          Totalyears: experience,
          NoticePeried: noticePeriod,
        };
      }
      return item;
    });

    setExperiencedata(updatedExperienceData);
  };
  const handleExperienceSubmit = values => {
    // Handle rfom submissionhandleSubmit(values);
    Experienceref.current.close();
    console.log(
      '---------------------Details-------------------------',
      values,
    );
    // Optionally, you can call bottomSheetRef.current.close() to close the bottom sheet after submission
  };

  const renderexperience = ({item}) => (
    <SafeAreaView>
      <View style={styles.basicitem}>
        <Text style={styles.profileTitle}>{item.label}</Text>
        <Text
          style={{
            marginVertical: 4,
            fontFamily: fonts.CircularStdBlack,
            color: '#000000',
          }}>
          Company Name
        </Text>
        <Text style={styles.ProfilItems}>{item.comapany}</Text>
        <Text
          style={{
            marginVertical: 4,
            fontFamily: fonts.CircularStdBlack,
            color: '#000000',
          }}>
          Total years of experience
        </Text>
        <Text style={styles.ProfilItems}>{item.Totalyears}</Text>
        <Text
          style={{
            marginVertical: 4,
            fontFamily: fonts.CircularStdBlack,
            color: '#000000',
          }}>
          Notice Period
        </Text>
        <Text style={styles.ProfilItems}>{item.NoticePeried}</Text>
      </View>
    </SafeAreaView>
  );
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'BasicDetails', title: 'Basic Details'},
    {key: 'ProfessionalDetails', title: 'Professional Details'},
    {key: 'EducationDetails', title: 'Education Details'},
  ]);
  const BasicdetailRoute = () => (
    <ScrollView style={{flex: 1, marginBottom: 50}}>
      <FlatList
        data={basicDetails}
        renderItem={({item}) => BasicRender({item, updateDetails})}
        keyExtractor={item => item.id.toString()}
      />
      <FlatList
        data={experiencedata}
        renderItem={({item}) => renderexperience({item, updateExperience})}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  );
  const professiondetailRoute = () => (
    <View>
      <Text>helo</Text>
    </View>
  );
  const EducationalDetailsRoute = () => (
    <View>
      <Text></Text>
    </View>
  );
  const renderScene = SceneMap({
    BasicDetails: BasicdetailRoute,
    ProfessionalDetails: professiondetailRoute,
    EducationDetails: EducationalDetailsRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#560310'}}
      style={{backgroundColor: '#fff'}}
      labelStyle={{
        color: '#000',
        fontFamily: fonts.CircularStdBlack,
        fontSize: SIZES.body5,
      }}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        renderItem={({item}) => profilitems({item, updateUser})}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: '10%',
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  basicitem: {
    // flexDirection:'column',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: '5%',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dp: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    //borderColor: '#2874A6',
    backgroundColor: '#fff',
  },
  Rbcontainer: {
    flex: 1,
    marginVertical: 30,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#0277BD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
  },
  TextinputContainer: {
    marginVertical: 5,
  },
  profilename: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.body2,
    marginTop: 10,
    color: '#fff',
  },
  profileheadline: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body3,
    textAlign: 'center',
  },
  imagepicker: {
    marginHorizontal: 5,
    marginTop: 4,
    fontFamily: fonts.CircularStdMedium,
    color: '#000000',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  headerBackground: {
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
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
  toggleText: {
    //fontSize: 16,
    //fontWeight: 'bold',
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 10,
  },
  rbSheetheading: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.h1,
    marginVertical: 5,
    color: '#17202A',
  },
  rbsheetcontent: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body3,
  },
  active: {
    color: 'blue',
  },
  profileTitle: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.h3,
    marginBottom: 20,
    color: '#560310',
  },
  ProfilItems: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body3,
    marginLeft: 4,
  },
  headerText: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.h3,
    color: '#17202A',
    marginTop: '5%',
  },
  uploadContainer: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    paddingVertical: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  fileName: {
    fontFamily: fonts.CircularStdBook,
    marginTop: 10,
    color: '#17202A',
  },
  flatList: {
    flex: 1, // Take up available space
    padding: 0, // No padding
    margin: 0, // No margin
  },
  tabView: {
    flex: 2.1, // Take up available space
    padding: 0, // No padding
    margin: 0, // No margin
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
    color: '#3498DB',
  },
  radioText: {
    fontFamily: fonts.CircularStdBook,
    marginRight: 10,
  },
});

export default Profile;
