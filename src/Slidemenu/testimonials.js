import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import configStyle from './configStyle';

const testimonials = [
  {
    id: '1',
    image: 'https://rishijob.com/Images/avatar.webp', // Use a placeholder image or actual image URL
    name: 'Ashok.p',
    review: 'I like the work culture and the the support from the seniors lots of learning to update your skills.',
  },
  {
    id: '2',
    image: 'https://rishijob.com/Images/avatar.webp',
    name: 'Joseph.M',
    review: 'Its a leading company and their are many things to learn more and got growth as per your working experience...',
  },
  {
    id: '3',
    image: 'https://rishijob.com/Images/avatar.webp',
    name: 'Vivek.G',
    review: 'Job security is completely hopeless, suddenly HR force to submit letter. even 2 month advanced information all so not happen. it become a rude approach.',
  },
  {
    id: '4',
    image: 'https://rishijob.com/Images/avatar.webp',
    name: 'Ramesh.A',
    review: 'Salary on time is only key of this organisation what most of the popel feel good',
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity>
    <View style={styles.testimonialItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={configStyle.heading2}>{item.name}</Text>
        <Text style={configStyle.body}>{item.review}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={configStyle.heading1}>Testimonials</Text>
      <FlatList
        data={testimonials}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      </ScrollView>
    </View>
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  testimonialItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  }
});
