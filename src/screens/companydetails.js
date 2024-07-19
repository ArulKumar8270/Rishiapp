import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { assets } from '../../react-native.config'
import { SIZES } from '../styles/config'
import { BackIcon, BookmarkIcon, LocationIcon, MyIcon, PagesIcon, PinIcon, SharIcon, SuiteCaseIcon, WalletIcon } from '../assets/svg'
import { fonts } from '../../config'
import { ScrollView } from 'react-native-gesture-handler'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'

const CompanyDetails = ({ navigation,route }) => {
const {params} = route;
const [loading, setLoading] = useState(false);
const handleApplyjob = useCallback(async () => {
  setLoading(true);
  try {
    let request = {
      userName : params.item.userName,
      jobTitle : params.item.jobTitle,
      jobCategory : params.item.jobTitle,
      companyName :params.item.companyName,
      companyId : params.item.companyId,
      jobStatus : params.item.jobStatus,
      name : params.item.name,
      phoneNumber : params.item.phoneNumber,
      email : params.item.email,
      jobLocation : params.item.jobLocation,
      experienceType : params.item.experienceType,
      experience :params.item.experience,
      oldCompanyName : params.item.oldCompanyName,
      resume :params.item.resume
    };
    const response = await axios.post('https://rishijob.com/backend/api/v1/jobs',request)
    if(response.data.success)
      {
        navigation.navigate('AppliedSucsuss')
      }
    setLoading(false)
  } catch (error) {
    setLoading(false);
    console.error('error----------------------', error);
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Server error:', error.response.data);
      Alert.alert('Login Failed', error.response.data.message || 'An error occurred. Please try again.');
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.request);
      Alert.alert('Login Failed', 'No response from the server. Please check your internet connection and try again.');
    } else {
      // Something else happened in setting up the request
      console.error('Error:', error.message);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  }
}, [navigation]);
  const renderHeader = () => {
    return (
      <ImageBackground source={require('../assets/Background.png')}
        style={{
          padding: 15,
          shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // Apply elevation for Androi
    elevation: 6
        }}>  
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Dashbord')} style={{ marginTop: 5 }}>
            <BackIcon height={22} width={22} color={'#fff'} />
          </TouchableOpacity>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.iconalign}
                onPress={() => console.log('shar')}
              >
                <SharIcon color={'#fff'} height={20} width={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconalign}
                onPress={() => console.log('saved')}
              >
                <BookmarkIcon color={'#fff'} height={20} width={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Image source={require('../assets/zoho.png')} style={styles.logoImage} />
          <Text style={{ color: '#fff', fontFamily: fonts.CircularStdBlack, fontSize: SIZES.h2, marginBottom: 5 }}>{params.item.jobTitle}</Text>
          <Text style={{ color: '#fff', fontFamily: fonts.CircularStdBook, fontSize: SIZES.h3, marginBottom: 5 }}>{params.item.company}</Text>
          <Text style={{ color: '#fff', fontFamily: fonts.CircularStdBook, fontSize: SIZES.h3, marginBottom: 5 }}>{params.item.jobCategory}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#fff', fontFamily: fonts.CircularStdBook, fontSize: SIZES.h3, marginBottom: 5 }}>Applicants</Text>
            <Text style={{ color: '#fff', fontFamily: fonts.CircularStdBook, fontSize: SIZES.h3, marginBottom: 5 }}>Posted date:{params.item.updatedAt}</Text>
          </View>
        </View> 
      </ImageBackground>

    )
  }
  const jobDetail=[{
    id:1,
    experience:params.item.experience,
    Opennings:params.item.Opennings,
    location:params.item.jobLocation,
    salaryPA:params.item.salaryPA,
    interviewType:params.item.interviewType,
    MustSkill:params.item.MustSkill,
    BasicSkills:params.item.BasicSkills
  }]
  const rendardata=({item})=>(
    <SafeAreaView style={styles.basicitem}>
      <View>
        <View style={{flexDirection:'row',marginVertical:5}}><SuiteCaseIcon height={20} width={20} color={'#D98880'}/><Text style={styles.JobRollItems}>{item.experience}</Text></View>
        <View style={{flexDirection:'row',marginVertical:5}}><MyIcon height={20} width={20} color={'#D98880'}/><Text style={styles.JobRollItems}>{item.Opennings}</Text></View>
        <View style={{flexDirection:'row',marginVertical:5}}><LocationIcon height={23} width={23} color={'#D98880'}/><Text style={styles.JobRollItems}>{item.location}</Text></View>
        <View style={{flexDirection:'row',marginVertical:5}}><WalletIcon height={20} width={20} color={'#D98880'}/><Text style={styles.JobRollItems}>{item.salaryPA}</Text></View>
        <View style={{flexDirection:'row',marginVertical:5}}><PinIcon height={20} width={20} color={'#D98880'}/><Text style={styles.JobRollItems}>{item.interviewType}</Text></View>
        <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Must Skill</Text>
        <Text style={[styles.JobRollItems,{marginVertical:4}]}>{item.MustSkill}</Text>
        <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Basic Skills</Text>
        <Text style={[styles.JobRollItems,{marginVertical:4}]}>{item.BasicSkills}</Text>
      </View>
    </SafeAreaView>
  )
  const discription=[{
    id:2,
    label:'What You will do',
    Discription:params.item.description
  }]
  const discriptionrender=({item})=>(
    <SafeAreaView style={styles.basicitem}>
      <View>
        <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>{item.label}</Text>
        <Text style={[styles.JobRollItems,{marginVertical:4}]}>{item.Discription}</Text>
      </View>
    </SafeAreaView>
  )
  const Jobdata=[{
    id:3,
    IndustryType:params.item.IndustryType,
    Department:params.item.Department,
    Role:params.item.Role,
    EmploymentType:params.item.EmploymentType,
    Education:params.item.Education
  }]
  const jobdatarender=({item})=>(
    <SafeAreaView style={styles.basicitem}>
      <View>
       <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Industr
       yType</Text>
       <Text style={[styles.JobRollItems,{marginVertical:4}]}>{params.item.jobCategory}</Text>
       <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Department</Text>
       <Text style={[styles.JobRollItems,{marginVertical:4}]}>{params.item.jobTitle}</Text>
       <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Role</Text>
       <Text style={[styles.JobRollItems,{marginVertical:4}]}>{params.item.jobTitle}</Text>
       <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Employment Type</Text>
       <Text style={[styles.JobRollItems,{marginVertical:4}]}>{item.EmploymentType}</Text>
       <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Education</Text>
       <Text style={[styles.JobRollItems,{marginVertical:4}]}>{item.Education}</Text>
      </View>
    </SafeAreaView>
  )
  const AboutCompany=[{
    id:4,
    CompanyDetails:'Company Details',
    CompanyName:'Company name'
}]
const AboutCompanyRender=({item})=>(
  <SafeAreaView style={styles.basicitem}>
    <View>
      <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>Company Details</Text>
      <Text style={[styles.JobRollItems,{marginVertical:4}]}>{params.item.companyId}</Text>
      <Text style={{fontFamily:fonts.CircularStdBlack,fontSize:SIZES.body3,color:'#000'}}>CompanyName</Text>
      <Text style={[styles.JobRollItems,{marginVertical:4}]}>{params.item.companyName}</Text>
    </View>
  </SafeAreaView>
)
const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'jobDetails', title: 'Job Details' },
    { key: 'aboutCompany', title: 'About Company' },
  ]);
  const JobDetailsRoute = () => (
    <ScrollView>
      <FlatList
        data={jobDetail}
        renderItem={rendardata}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.sectionTitle}>Job Descriptions</Text>
      <FlatList
        data={discription}
        renderItem={discriptionrender}
        keyExtractor={(item) => item.id.toString()}
      />
      <FlatList
        data={Jobdata}
        renderItem={jobdatarender}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );

  const AboutCompanyRoute = () => (
    <ScrollView>
      <FlatList
        data={AboutCompany}
        renderItem={AboutCompanyRender}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );

  const renderScene = SceneMap({
    jobDetails: JobDetailsRoute,
    aboutCompany: AboutCompanyRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#560310' }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: '#000', fontFamily: fonts.CircularStdBlack }}
    />
  );

  return (
    
    <SafeAreaView style={styles.container}>
        {renderHeader()}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
           />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:20}}>
           <PagesIcon height={20} width={20} color={'#411004'}/>
          <Text style={{ color: '#411004', fontFamily: fonts.CircularStdBlack, fontSize: SIZES.body3 }}>Send me job like this</Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['#440217', '#CF577D', '#440217']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1.5 }}
          locations={[0, 0.5, 1]}
          style={styles.button}
        >
          <TouchableOpacity onPress={()=>handleApplyjob()}>
            <Text style={{ textAlign: 'center', color: 'white', fontFamily: fonts.CircularStdMedium }}>Apply</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
  </SafeAreaView>
  )
}

export default CompanyDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '20%',
    paddingHorizontal: 20,
  },
  logoImage: {
    height: 50,
    borderRadius: 10,
    aspectRatio: 1,
    borderColor: '#85C1E9',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  companyName: {
    color: '#fff',
    fontFamily: fonts.CircularStdBook,
    fontSize: 18,
  },
  jobRole: {
    color: '#fff',
    fontFamily: fonts.CircularStdBlack,
    fontSize: 24,
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 10,
    marginHorizontal: 10,
    fontFamily: fonts.CircularStdBlack,
    fontSize: 20,
    color: '#560310',
  },
  iconalign: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicitem: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  JobRollItems: {
    fontFamily: fonts.CircularStdBook,
    fontSize: 16,
    marginLeft: 4,
    color: '#000',
  },
  button: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: SIZES.radius,
    marginVertical:10,
    borderRadius: SIZES.radius,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
  },
})