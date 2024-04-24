import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, Alert, Button, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CameraIcon, CropIcon, Dprofile, GalleryIcon, LocationIcon, MailIcon, PencilIcon, RemoveIcon, SuiteCaseIcon, TelephoneIcon } from '../assets/svg';
import { CustomTextInput, DummyTextInput } from '../assets/textinput';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { SIZES, fontSize } from '../styles/config';
import { fonts } from "../../config";
import ImagePicker from 'react-native-image-crop-picker';
import Basicdetails from './profileitems.js/basicdetails';
import DropDownPicker from 'react-native-dropdown-picker';
import Dropdown from '../assets/components/custom_dropdown';
import CustomDropDown from '../assets/components/custom_dropdown';
//import { TabView, TabBar } from 'react-native-tab-view';

const Profile = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const Pictureref = useRef(null);
  const Detailref = useRef(null)
  const windowHeight = Dimensions.get('window').height;
  //detail
  //
  const [userData, setUserData] = useState([
    {
      id: 1, Name: 'name',
      image: require('../assets/dp.png'),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, diam eget pellentesque luctus.'
    }
  ]);
  const [selectedImage, setSelectedImage] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [formValues, setFormValues] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to update user data
  const updateUser = (id, name, headline) => {
    const updatedData = userData.map(item => {
      if (item.id === id) {
        return { ...item, Name: name, description: headline };
      }
      return item;
    });
    setUserData(updatedData);
  };

  //open gallery function
  const Opengallery = () => {
    if (Pictureref.current) {
      Pictureref.current.open()
    }
  }

  //function set profile picture
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        setSelectedImage(image.path);
        setHeight(height);
        setWidth(width);
        console.log(image);
      })
      .catch((error) => {
        console.log(error);
      });
    Pictureref.current.close()
  };
  const handleCameraPicker = () => {
    ImagePicker.openCamera({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        setSelectedImage(image.path);
        setHeight(height);
        setWidth(width);
      })
      .catch((error) => {
        console.log(error);
      });
    Pictureref.current.close()
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
        .then((image) => {
          setSelectedImage(image.path);
          setHeight(250);
          setWidth(170);
          console.log(image);
        })
        .catch((error) => {
          console.log(error);
        });
      Pictureref.current.close()
    }
  };
  // Function to handle form submission
  const handleProfileSubmit = (values) => {
    // Handle rfom submissionhandleSubmit(values);
    console.log(values);
    bottomSheetRef.current.close()
    // Optionally, you can call bottomSheetRef.current.close() to close the bottom sheet after submission
  };
  const handleDetailSubmit = (values) => {
    // Handle rfom submissionhandleSubmit(values);
    Detailref.current.close()
    console.log('---------------------Details-------------------------', values);

    // Optionally, you can call bottomSheetRef.current.close() to close the bottom sheet after submission
  };


  const validationSchema = yup.object().shape({
    name: yup.string().required('Enter your name'),
    headline: yup.string().required('Enter your profile headline'),
  });

  const profilitems = ({ item, updateUser }) => (
    <SafeAreaView>
      <View style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: '10%',
        marginHorizontal: 20
      }}>
        <Image source={selectedImage ? { uri: selectedImage } : require('../assets/dp.png')} style={styles.dp} />
        <Text style={styles.profilename}>{item.Name}</Text>
        <TouchableOpacity style={{ marginTop: -17, marginVertical: 10, marginLeft: 'auto' }} onPress={() => bottomSheetRef.current.open()}><PencilIcon height={15} width={15} color={'#2E86C1'} /></TouchableOpacity>
        <Text style={styles.profileheadline}>{item.description}</Text>
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
        }}
      >
        <Formik
          initialValues={{ name: '', headline: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleProfileSubmit(values);
            updateUser(item.id, values.name, values.headline); // Update user data
            actions.setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, touched, errors }) => (
            <View style={styles.Rbcontainer}>
              <View>
                <Text style={styles.rbSheetheading}>Profile picture</Text>
                <Text style={styles.rbsheetcontent}>profile with photo was has 40% higher chances of getting noticed by recruiters</Text>
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                  <TouchableOpacity activeOpacity={1} onPress={Opengallery}>
                    <Image source={selectedImage ? { uri: selectedImage } : require('../assets/dp.png')} style={[styles.dp, { height: 100, width: 100 }]} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.rbSheetheading}>Introduction</Text>
              <Text style={styles.rbsheetcontent}>Introduce yourself to the recruiters</Text>
              <CustomTextInput
                variant="underline"
                labelStyle={{ fontFamily: fonts.CircularStdLight }}
                label={'Name'}
                //placeholder="Enter your name"
                onChangeText={(value) => {
                  console.log('------------------------------------------', value)
                  setFieldValue('name', value)
                  handleChange('name')
                }}
                // onBlur={handleBlur('name')}
                error={touched.name && errors.name}
                errorStyle={{ fontFamily: fonts.CircularStdBook }}
                maxLength={37}
                value={values.name}
                containerStyle={styles.TextinputContainer}
                inputStyle={{ fontFamily: fonts.CircularStdBook, }}
              />
              <CustomTextInput
                variant="underline"
                labelStyle={{ fontFamily: fonts.CircularStdLight }}
                label={'Profile Headline'}
                //placeholder="Enter your profile headline"
                onChangeText={handleChange('headline')}
                // onBlur={handleBlur('headline')}
                error={touched.headline && errors.headline}
                errorStyle={{ fontFamily: fonts.CircularStdBook }}
                maxLength={100}
                value={values.headline}
                containerStyle={styles.TextinputContainer}
                inputStyle={{ fontFamily: fonts.CircularStdBook, }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginVertical: 40, marginTop: 'auto' }}>
                <TouchableOpacity onPress={() => bottomSheetRef.current.close()}><Text style={{ fontFamily: fonts.CircularStdMedium, color: '#0277BD', marginTop: 13 }}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={{ fontFamily: fonts.CircularStdMedium, color: '#fff' }}>Save</Text></TouchableOpacity>
              </View>
              <RBSheet
                ref={Pictureref}
                height={200}
                openDuration={250}
                customStyles={{
                  container: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  },
                }}
              >
                <View style={[styles.Rbcontainer, { justifyContent: 'space-between' }]}>
                  <TouchableOpacity onPress={handleImagePicker}>
                    <View style={{ flexDirection: 'row' }}><GalleryIcon height={28} width={28} /><Text style={styles.imagepicker}>Choose from Library</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCameraPicker}>
                    <View style={{ flexDirection: 'row' }}><CameraIcon height={25} width={25} /><Text style={styles.imagepicker}>Take a Photo</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCropImage}>
                    <View style={{ flexDirection: 'row' }}><CropIcon height={25} width={25} /><Text style={styles.imagepicker}>Crop Image</Text></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setSelectedImage(null)
                    Pictureref.current.close()
                  }}><View style={{ flexDirection: 'row' }}><RemoveIcon height={25} width={25} color={'red'} /><Text style={[styles.imagepicker, { color: 'red' }]}>Remove</Text></View>
                  </TouchableOpacity>
                </View>
              </RBSheet>
            </View>
          )}
        </Formik>
      </RBSheet>
    </SafeAreaView>
  );

  //basic details :
  const [basicDetails, setBasicDetails] = useState([{
    id: 2,
    label: 'Basic details',
    jobType: 'Work Status',
    location: 'chennai',
    email: 'dummy@gmail.com',
    mobilenumber: 1234567890
  }])
  //-------------------update detail--------------------------
  const updateDetails = (id, currentCity, email, mobilenumber, workStatus) => {
    const updatedDetailsData = basicDetails.map(item => {
      if (item.id === id) {
        return { ...item, label: 'Basic details', jobType: workStatus, location: currentCity, email: email, mobilenumber: mobilenumber };
      }
      return item;
    });

    setBasicDetails(updatedDetailsData);
  };
  //-----------------------------------------------------------
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const availabilityOptions = [
    { label: '15 days or less', value: '15 days or less' },
    { label: '1 month', value: '1 month' },
    { label: '2 months', value: '2 months' },
    { label: '3 months', value: '3 months' },
    { label: 'more than 3 months', value: 'more than 3 months' }
  ]
  //------------------freshers and experience ckeck function---------------------------

  const [isFreshersChecked, setFreshersChecked] = useState(false);
  const [isExperienceChecked, setExperienceChecked] = useState(false);

  const handleFreshersCheck = () => {
    setFreshersChecked(true);
    setExperienceChecked(false);
  };

  const handleExperienceCheck = () => {
    setFreshersChecked(false);
    setExperienceChecked(true);
  };
  const BasicRender = ({ item }) => (
    <SafeAreaView>
      <View style={styles.basicitem}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.profileTitle}>{item.label}</Text>
          <TouchableOpacity onPress={() => Detailref.current.open()}><PencilIcon height={15} width={15} color={'#2E86C1'} /></TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 4 }}>
          <SuiteCaseIcon height={20} width={20} color={'#ABB2B9'} />
          <View>
            {item.jobType ? (<View><Text style={styles.ProfilItems}>{item.jobType}</Text></View>) : (<View><Text style={styles.ProfilItems}>Work Status</Text></View>)}
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 4 }}><LocationIcon height={22} width={22} color={'#ABB2B9'} /><Text style={styles.ProfilItems}>{item.location}</Text></View>
        <View style={{ flexDirection: 'row', marginVertical: 4 }}><MailIcon height={20} width={20} color={'#ABB2B9'} /><Text style={styles.ProfilItems}>{item.email}</Text></View>
        <View style={{ flexDirection: 'row', marginVertical: 4 }}><TelephoneIcon height={15} width={15} color={'#ABB2B9'} /><Text style={styles.ProfilItems}>{item.mobilenumber}</Text></View>
      </View>
      {/* ----------------------------------rb sheet of details--------------------------------------------- */}
      <RBSheet
        ref={Detailref}
        height={windowHeight}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>

        <SafeAreaView style={styles.Rbcontainer}>
          <Formik
            initialValues={{
              workStatus: '',
              currentCity: '',
              mobileNumber: '',
              email: '',
              // availability: ''
            }}
            validationSchema={yup.object().shape({
              workStatus: yup.string(),
              currentCity: yup.string().required('Current city is required'),
              mobileNumber: yup.string().required('Mobile number is required').matches(/^\d+$/, 'Mobile number must contain only numbers').max(10, 'Mobile number must be 10 digits'),
              email: yup.string().email('Invalid email').required('Email is required'),
              // availability: yup.string().required('Availability is required')
            })}
            onSubmit={(values, actions) => {
              handleDetailSubmit(values);
              updateDetails(item.id, values.currentCity, values.email, values.mobileNumber, values.workStatus);
              // Update user data
              actions.setSubmitting(false);
            }}

          >

            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <View>
                <View>
                  <Text style={styles.rbSheetheading}>Basic Details</Text>
                  <Text style={styles.rbsheetcontent}>About to yourself to help recruiters know you</Text>
                </View>
                <View>
                  <Text style={{ fontFamily: fonts.CircularStdBlack, fontSize: SIZES.h3, color: '#17202A', marginTop: '5%' }}>Work status</Text>
                  <Field name="workStatus">
                    {({ field, form }) => (
                      <RadioButton.Group
                        onValueChange={form.handleChange('workStatus')}
                        value={field.value}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <RadioButton value="fresher" color="#2E86C1" />
                          <Text style={styles.rbsheetcontent}>Fresher</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <RadioButton value="experience" color="#2E86C1" />
                          <Text style={styles.rbsheetcontent}>Experience</Text>
                        </View>
                      </RadioButton.Group>
                    )}
                  </Field>
                </View>
                <View style={{ marginVertical: 20 }}>
                  <CustomTextInput
                    onChangeText={handleChange('currentCity')}
                    onBlur={handleBlur('currentCity')}
                    label={'Current city'}
                    value={values.currentCity}
                    error={touched.currentCity && errors.currentCity}
                    maxLength={50}
                    labelStyle={{ fontFamily: fonts.CircularStdLight }}
                    inputStyle={{ fontFamily: fonts.CircularStdBook, }}
                  />
                  <CustomTextInput
                    label={'Mobile number'}
                    onChangeText={handleChange('mobileNumber')}
                    onBlur={handleBlur('mobileNumber')}
                    value={values.mobileNumber}
                    keyboardType="numeric"
                    error={touched.mobileNumber && errors.mobileNumber}
                    errorStyle={{ fontFamily: fonts.CircularStdBook }}
                    maxLength={10}
                    labelStyle={{ fontFamily: fonts.CircularStdLight }}
                    inputStyle={{ fontFamily: fonts.CircularStdBook, }}
                  />
                  <CustomTextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    label={'Email'}
                    value={values.email}
                    keyboardType="email-address"
                    error={touched.email && errors.email}
                    errorStyle={{ fontFamily: fonts.CircularStdBook }}
                    maxLength={50}
                    labelStyle={{ fontFamily: fonts.CircularStdLight }}
                    inputStyle={{ fontFamily: fonts.CircularStdBook, }}
                  />
                  <Text style={{ fontFamily: fonts.CircularStdBlack, fontSize: SIZES.h3, color: '#17202A', marginTop: '5%' }}>Avalibility</Text>
                  <View style={{
                    borderColor: '#B4B4B4',
                    borderWidth: 2,
                    borderRadius: 10,
                    marginVertical: 10
                  }}>
                    {/* -------------------------dropdown-------------------------------------------------- */}
                    <CustomDropDown
                      label="Availability"
                      labelStyle={{ fontFamily: fonts.CircularStdBook }}
                      inputStyle={{ fontFamily: fonts.CircularStdBook }}
                      value={values.availability}

                      onChangeText={(text) => {
                        setFieldValue('availability', text)
                      }}
                      dropDownlabel={'label'}
                      errorText={errors.availability}
                      dropDownData={availabilityOptions}
                      errorTextStyle={{ color: 'red' }}
                      headerStyle={{ fontFamily: fonts.CircularStdBlack, fontSize: SIZES.h3, color: '#17202A' }}
                      itemTextStyle={{ fontFamily: fonts.CircularStdBook }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginVertical: 40, marginTop: '35%' }}>
                  <TouchableOpacity onPress={() => Detailref.current.close()}><Text style={{ fontFamily: fonts.CircularStdMedium, color: '#0277BD', marginTop: 13 }}>Cancel</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={{ fontFamily: fonts.CircularStdMedium, color: '#fff' }}>Save</Text></TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </RBSheet>
    </SafeAreaView>
  )
  const [experiencedata, setExperiencedata] = useState([
    {
      id: 3,
      label: 'Experience',
      comapany: 'Company Name',
      Totalyears: 'Eg 0.0',
      NoticePeried: 'Eg 1 month'
    }
  ]
  )
  const Experienceref = useRef(null)
  const [value, setValue] = useState('');
  //------------------------experience details---------------------
  const updateExperience = (id, comapany, experience, noticePeriod) => {
    const updatedExperienceData = experiencedata.map(item => {
      if (item.id === id) {
        return { ...item, label: 'Experience', comapany: comapany, Totalyears: experience, NoticePeried: noticePeriod };
      }
      return item;
    });

    setExperiencedata(updatedExperienceData);
  };
  const handleExperienceSubmit = (values) => {
    // Handle rfom submissionhandleSubmit(values);
    Experienceref.current.close()
    console.log('---------------------Details-------------------------', values);
    // Optionally, you can call bottomSheetRef.current.close() to close the bottom sheet after submission
  };

  const renderexperience = ({ item }) => (
    <SafeAreaView>
      <View style={styles.basicitem}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.profileTitle}>{item.label}</Text>
          <TouchableOpacity onPress={() => Experienceref.current.open()}><PencilIcon height={15} width={15} color={'#2E86C1'} /></TouchableOpacity>
        </View>
        <Text style={{ marginVertical: 4, fontFamily: fonts.CircularStdBlack, color: '#000000' }}>Company Name</Text>
        <Text style={styles.ProfilItems}>{item.comapany}</Text>
        <Text style={{ marginVertical: 4, fontFamily: fonts.CircularStdBlack, color: '#000000' }}>Total years of experience</Text>
        <Text style={styles.ProfilItems}>{item.Totalyears}</Text>
        <Text style={{ marginVertical: 4, fontFamily: fonts.CircularStdBlack, color: '#000000' }}>Notice Period</Text>
        <Text style={styles.ProfilItems}>{item.NoticePeried}</Text>
      </View>
      <RBSheet
        ref={Experienceref}
        height={windowHeight}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <SafeAreaView style={styles.Rbcontainer}>
          <Formik
            initialValues={{
              experience: '',
              company: '',
              totalSalary: '',
              noticePeriod: ''
            }}
            validationSchema={yup.object().shape({
              experience: yup.string().required('Experience is required'),
              company: yup.string().required('Company name is required'),
              totalSalary: yup.string().required('Total annual salary is required'),
              noticePeriod: yup.string().required('Notice period is required'),
            })}
            onSubmit={(values, actions) => {
              handleExperienceSubmit(values);
              updateExperience(item.id, values.experience, values.company, values.noticePeriod);
              // Update user data
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <>
                <View>
                  <Text style={styles.rbSheetheading}>Experience Details</Text>
                  <Text style={styles.rbsheetcontent}>About your experience details to help recruiters know you</Text>
                </View>
                <Text style={{ marginBottom: -10, marginTop: 10, fontFamily: fonts.CircularStdBook, color: '#3498DB' }}>Experience</Text>
                <CustomTextInput
                  placeholder={'Eg 2.6 years'}
                  value={values.experience}
                  onChangeText={handleChange('experience')}
                  error={touched.experience && errors.experience}
                  maxLength={10}
                  inputStyle={{ fontFamily: fonts.CircularStdBook, }}
                  errorStyle={{ fontFamily: fonts.CircularStdBook }}

                />
                <Text style={{ marginBottom: -10, marginTop: 10, fontFamily: fonts.CircularStdBook, color: '#3498DB' }}>Company</Text>
                <CustomTextInput
                  placeholder={'Company name'}
                  value={values.company}
                  onChangeText={handleChange('company')}
                  error={touched.company && errors.company}
                  maxLength={50}
                  inputStyle={{ fontFamily: fonts.CircularStdBook, }}
                  errorStyle={{ fontFamily: fonts.CircularStdBook }}

                />
                <Text style={{ marginBottom: -10, marginTop: 10, fontFamily: fonts.CircularStdBook, color: '#3498DB' }}>Total annual salary</Text>
                <CustomTextInput
                  placeholder={'Eg 4,00,000'}
                  value={values.totalSalary}
                  onChangeText={handleChange('totalSalary')}
                  error={touched.totalSalary && errors.totalSalary}
                  maxLength={20}
                  inputStyle={{ fontFamily: fonts.CircularStdBook, }}
                  errorStyle={{ fontFamily: fonts.CircularStdBook }}

                />
                <Text style={{ fontFamily: fonts.CircularStdBlack, fontSize: SIZES.h3, color: '#17202A', marginTop: '5%' }}>Notice period</Text>
                <RadioButton.Group
                  value={values.noticePeriod}
                  onValueChange={(newValue) => handleChange('noticePeriod')(newValue)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="15 Days or less" color="#2E86C1" />
                    <Text style={styles.rbsheetcontent}>15 Days or less</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="1 month" color="#2E86C1" />
                    <Text style={styles.rbsheetcontent}>1 month</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="2 month" color="#2E86C1" />
                    <Text style={styles.rbsheetcontent}>2 month</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="3 month" color="#2E86C1" />
                    <Text style={styles.rbsheetcontent}>3 month</Text>
                  </View>
                </RadioButton.Group>
                {errors.noticePeriod && touched.noticePeriod && <Text style={{ color: 'red' ,fontFamily: fonts.CircularStdBook}}>{errors.noticePeriod}</Text>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginVertical: 40, marginTop: '35%' }}>
                  <TouchableOpacity onPress={() => Experienceref.current.close()}><Text style={{ fontFamily: fonts.CircularStdMedium, color: '#0277BD', marginTop: 13 }}>Cancel</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={{ fontFamily: fonts.CircularStdMedium, color: '#fff' }}>Save</Text></TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </SafeAreaView>
      </RBSheet>
    </SafeAreaView>
  )
  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={userData}
        renderItem={({ item }) => profilitems({ item, updateUser })}
        keyExtractor={(item) => item.id.toString()}
      />
      <FlatList
        data={basicDetails}
        renderItem={({ item }) => BasicRender({ item, updateDetails })}
        keyExtractor={(item) => item.id.toString()}
      />
      <FlatList
        data={experiencedata}
        renderItem={({ item }) => renderexperience({ item, updateExperience })}
        keyExtractor={(item) => item.id.toString()} />

      <Text>Profile</Text>
    </ScrollView>
  );
};
20
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
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
    borderColor: '#ccc'
  },
  dp: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    //borderColor: '#2874A6',
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
    marginVertical: 20
  },
  profilename: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.body2,
    marginTop: 10,
    color: '#560310'
  },
  profileheadline: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body3,
    textAlign: 'center'
  },
  imagepicker: {
    marginHorizontal: 5,
    marginTop: 4,
    fontFamily: fonts.CircularStdMedium,
    color: '#000000'
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  toggleText: {
    //fontSize: 16,
    //fontWeight: 'bold',
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 10
  },
  rbSheetheading: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.h1, marginVertical: 5,
    color: '#17202A'
  },
  rbsheetcontent: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body3
  },
  active: {
    color: 'blue',
  },
  profileTitle: {
    fontFamily: fonts.CircularStdBlack,
    fontSize: SIZES.h3,
    marginBottom: 20,
    color: '#560310'
  },
  ProfilItems: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body3,
    marginLeft: 4
  }
});

export default Profile;

