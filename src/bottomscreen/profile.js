import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {PencilIcon} from '../assets/svg';
import {fonts} from '../../config';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SIZES} from '../styles/config';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {
  loginResponseSelector,
  UserDataSelector,
} from '../redux/selectors/app.selector';

const Profile = ({navigation}) => {
  const loginResponse = useSelector(loginResponseSelector);
  const userDataResponse = useSelector(UserDataSelector);

  const userDetails = {
    name: loginResponse?.data?.firstName || '',
    qualification: loginResponse?.data?.qualification || '',
    gender: loginResponse?.data?.gender || '',
    phoneNumber: loginResponse?.data?.phoneNumber || '',
    email: loginResponse?.data?.email || '',
    resume: loginResponse?.data?.resume || '',
  };

  const userUpdatedDetails = userDataResponse
    ? {
        name: userDataResponse?.firstName || '',
        qualification: userDataResponse?.qualification || '',
        gender: userDataResponse?.gender || '',
        phoneNumber: userDataResponse?.phoneNumber || '',
        email: userDataResponse?.email || '',
        resume: userDataResponse?.resume?.name || '',
        companyName: userDataResponse?.companyName || '',
        experience: userDataResponse?.experience || '',
      }
    : null;

  const renderUser = ({item}) => (
    <View>
      <Text style={styles.Detailtext}>{item.name}</Text>
      <Text style={styles.Detailtext}>{item.qualification}</Text>
      <Text style={styles.Detailtext}>{item.gender}</Text>
      <Text style={styles.Detailtext}>{item.phoneNumber}</Text>
      <Text style={styles.Detailtext}>{item.email}</Text>
      <Text style={styles.Detailtext}>{item.resume}</Text>
    </View>
  );

  const prorender = ({item}) => (
    <View>
      <Text style={styles.Detailtext}>
        {item.experience ? `${item.experience} years` : 'No experience'}
      </Text>
    </View>
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'basic', title: 'Basic Details'},
    {key: 'professional', title: 'Professional Details'},
  ]);

  const BasicDetailsRoute = () => (
    <View style={styles.FlatList}>
      <FlatList
        data={[userUpdatedDetails || userDetails]}
        renderItem={renderUser}
        keyExtractor={(item, index) => index.toString()}
        style={styles.FlatListItems}
      />
    </View>
  );

  const ProfessionalDetailsRoute = () => (
    <View style={styles.professionalDetailsContainer}>
      <Text
        style={{
          fontFamily: fonts.CircularStdBlack,
          fontSize: SIZES.body1,
          color: '#660000',
        }}>
        Experience details
      </Text>
      <View style={styles.FlatList}>
        <FlatList
          data={[userUpdatedDetails || userDetails]}
          renderItem={prorender}
          keyExtractor={(item, index) => index.toString()}
          style={styles.FlatListItems}
        />
      </View>
    </View>
  );

  const renderScene = SceneMap({
    basic: BasicDetailsRoute,
    professional: ProfessionalDetailsRoute,
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Background.png')}
        style={styles.imageBackground}>
        {userUpdatedDetails?.gender === 'male' && loginResponse.gender === 'male' ? (
          <Image source={require('../assets/male.png')} style={styles.dp} />
        ) : (
          <Image source={require('../assets/female.png')} style={styles.dp} />
        )}

        <View style={styles.nameContainer}>
          <Text style={styles.text}>
            {userUpdatedDetails?.name || userDetails.name}
          </Text>
          <Text style={styles.text}>
            {userUpdatedDetails?.lastName || loginResponse?.data?.lastName}
          </Text>
        </View>
        <View style={styles.emailContainer}>
          <View>
            <Text style={styles.text}>
              {userUpdatedDetails?.email || userDetails.email}
            </Text>
            <Text style={styles.text}>
              {userUpdatedDetails?.phoneNumber || userDetails.phoneNumber}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ProfileUpdate')}>
            <PencilIcon height={20} width={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
          />
        )}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    alignItems: 'center',
    padding: 20,
  },
  dp: {
    width: 80,
    height: 80,
    borderRadius: 40, // corrected to make it circular
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.CircularStdBlack,
  },
  Detailtext: {
    fontFamily: fonts.CircularStdBook,
    fontSize: SIZES.body1,
    color: '#000',
    marginVertical: 10,
  },
  FlatList: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    margin: 20,
    borderRadius: 30,
  },
  professionalDetailsContainer: {
    flex: 1,
    padding: 20,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  indicator: {
    backgroundColor: '#000',
  },
  label: {
    color: '#660000',
    fontFamily: fonts.CircularStdBlack,
  },
});
