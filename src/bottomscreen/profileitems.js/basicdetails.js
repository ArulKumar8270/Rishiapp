import React, { useState } from 'react';
import { StyleSheet,ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TabView, TabBar } from 'react-native-tab-view';
import { CustomTextInput } from '../../assets/textinput';


const Basicdetails = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'fresher', title: 'Fresher' },
    { key: 'experience', title: 'Experience' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'fresher':
        return <FresherForm />;
      case 'experience':
        return <ExperienceForm />;
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'blue' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: focused ? 'blue' : 'black' }}>{route.title}</Text>
      )}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const FresherForm = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomForm isFresher={true} />
    </ScrollView>
  );
};

const ExperienceForm = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomForm isExperience={true} />
    </ScrollView>
  );
};

const CustomForm = ({ isExperience }) => {
  return (
    <Formik
      initialValues={{
        currentCity: '',
        selectState: '',
        email: '',
        mobileNumber: '',
        yearsOfExperience: '',
        monthsOfExperience: '',
        salary: '',
      }}
      validationSchema={yup.object().shape({
        currentCity: yup.string().required('Current City is required'),
        selectState: yup.string().required('Select State is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        mobileNumber: yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('Mobile Number is required'),
        yearsOfExperience: isExperience ? yup.string().required('Years of Experience is required') : yup.string(),
        monthsOfExperience: isExperience ? yup.string().required('Months of Experience is required') : yup.string(),
        salary: isExperience ? yup.string().required('Salary is required') : yup.string(),
      })}
      onSubmit={(values) => {
        // Handle form submission here
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <Text style={{ marginBottom: '1%' }}>Basic Details</Text>
          <Text style={{ marginBottom: '5%' }}>About yourself to help recruiters know you</Text>
          <Text style={{ marginBottom: '5%' }}>Work Status</Text>
          {/* Toggle buttons for work status */}
              <CustomTextInput
                label={'Current City'}
                maxLength={50}
                onChangeText={handleChange('currentCity')}
                onBlur={handleBlur('currentCity')}
                value={values.currentCity}
                error={touched.currentCity && errors.currentCity}
              />
              <CustomTextInput
                label={'Select State'}
                onChangeText={handleChange('selectState')}
                onBlur={handleBlur('selectState')}
                value={values.selectState}
                error={touched.selectState && errors.selectState}
              />
              <CustomTextInput
                label={'Email'}
                maxLength={50}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
              />
              <CustomTextInput
                label={'Mobile Number'}
                maxLength={10}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                value={values.mobileNumber}
                error={touched.mobileNumber && errors.mobileNumber}
              />
    
            {isExperience &&
             <>
             <CustomTextInput
               label={'Years of Experience'}
               maxLength={1}
               onChangeText={handleChange('yearsOfExperience')}
               onBlur={handleBlur('yearsOfExperience')}
               value={values.yearsOfExperience}
               error={touched.yearsOfExperience && errors.yearsOfExperience}
             />
             <CustomTextInput
               label={'Months of Experience'}
               maxLength={1}
               onChangeText={handleChange('monthsOfExperience')}
               onBlur={handleBlur('monthsOfExperience')}
               value={values.monthsOfExperience}
               error={touched.monthsOfExperience && errors.monthsOfExperience}
             />
             <CustomTextInput
               label={'Current City'}
               maxLength={50}
               onChangeText={handleChange('currentCity')}
               onBlur={handleBlur('currentCity')}
               value={values.currentCity}
               error={touched.currentCity && errors.currentCity}
             />
             <CustomTextInput
               label={'Select State'}
               maxLength={50}
               onChangeText={handleChange('selectState')}
               onBlur={handleBlur('selectState')}
               value={values.selectState}
               error={touched.selectState && errors.selectState}
             />
             <CustomTextInput
               label={'Email'}
               maxLength={50}
               onChangeText={handleChange('email')}
               onBlur={handleBlur('email')}
               value={values.email}
               error={touched.email && errors.email}
             />
             <CustomTextInput
               label={'Mobile Number'}
               maxLength={10}
               onChangeText={handleChange('mobileNumber')}
               onBlur={handleBlur('mobileNumber')}
               value={values.mobileNumber}
               error={touched.mobileNumber && errors.mobileNumber}
             />
             <View style={styles.salaryContainer}>
               <CustomTextInput
                 placeholder={'Eg 5,00,000'}
                 onChangeText={handleChange('salary')}
                 onBlur={handleBlur('salary')}
                 value={values.salary}
                 error={touched.salary && errors.salary}
               />
               <Text>Per year</Text>
             </View>
           </>
}
           
           
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    paddingHorizontal: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 10,
  },
  active: {
    color: 'blue',
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Basicdetails;
