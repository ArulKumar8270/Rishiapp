import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

const DropdownCity = ({value,style,placeholder}) => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.countrystatecity.in/v1/countries/IN/cities',
          {
            headers: {
              'X-CSCAPI-KEY': 'RGk2NGsyd0tvWnF6YVZoVHh3aHlBc1pPYkRlSUJCUm5qeDAwUkJHVQ=='
            }
          }
        );
        setCities(response.data);
        setFilteredCities(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input,style]}
        value={[searchText,value]}
        onChangeText={handleSearch}
        placeholder={placeholder}
      />
      {searchText !== '' && (
        <FlatList
          style={styles.dropdown}
          data={filteredCities}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSearch(item.name)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default DropdownCity;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 60, // Adjust this value according to your UI
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 10,
    maxHeight: 300,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    //borderBottomWidth: 0.5,
    //borderBottomColor: 'gray',
  },
});
