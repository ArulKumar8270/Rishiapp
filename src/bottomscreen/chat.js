import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginResponseSelector } from '../redux/selectors/app.selector';
import { firestore } from '../componants/firebase';
import { COLORS, FONTSIZE, SPACING, BORDERRADIUS } from '../styles/config'; // Assuming you have a config file for styles
import Icons from 'react-native-vector-icons/Feather';

const ChatScreen = () => {
  const navigation = useNavigation();
  const loginResponse = useSelector(loginResponseSelector);
  const [companies, setCompanies] = useState([]);
  const userId = loginResponse?.data?.id;

  // Fetch companies list from Firestore
  useEffect(() => {
    if (userId) {
      const unsubscribe = firestore()
        .collection('chats')
        .doc(userId)
        .collection('companies')
        .orderBy('lastMessageAt', 'desc')
        .onSnapshot(querySnapshot => {
          const companiesList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCompanies(companiesList);
        });

      return () => unsubscribe();
    }
  }, [userId]);

  // Render each company item
  const renderCompanyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('ConversationScreen', {
          conversationId: item.id,
          companyId: item.companyId,
          companyName: item.companyName,
        })
      }
    >
      <View style={styles.companyInfo}>
        <Text style={styles.companyName}>{item.companyName}</Text>
        <Text style={styles.lastMessageText}>{item.lastMessage}</Text>
      </View>
      <View style={styles.messageTimeContainer}>
        <Text style={styles.timeText}>
          {item.lastMessageAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Formats timestamp */}
        </Text>
        <Icons name="chevron-right" size={FONTSIZE.size_20} color={COLORS.primaryGreyHex} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={companies}
        keyExtractor={item => item.id}
        renderItem={renderCompanyItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No conversations yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryGreyHex,
    padding: SPACING.space_15,
  },
  listContent: {
    paddingBottom: SPACING.space_20,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryWhiteHex,
    padding: SPACING.space_15,
    marginVertical: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_5,
  },
  lastMessageText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryGreyHex,
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryGreyHex,
    marginRight: SPACING.space_10,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.primaryGreyHex,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_20,
  },
});

export default ChatScreen;
