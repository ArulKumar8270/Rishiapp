import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onClose}>
      <View style={styles.content}>
        <Text>Bottom Sheet Content</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SearchBar;
