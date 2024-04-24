import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Text, TextInput, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { DownDropDownArrow, Dropdown, MyIcon } from '../svg';

const CustomDropDown = ({
  label,
  value,
  onChangeText,
  errorText,
  dropDownlabel,
  dropDownData,
  searchRequired = false,
  containerStyle,
  onDonePress,
  errorTextStyle,
  inputStyle,labelStyle,
  headerStyle,
  listContainer,
  itemTextStyle
}) => {
  const refRBSheet = useRef();
  const [selectedItem, setSelectedItem] = useState(value);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState(dropDownData);

  useEffect(() => {
    setSearchFilter(dropDownData);
  }, [dropDownData]);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = dropDownData.filter(item => item[dropDownlabel].toLowerCase().includes(text.toLowerCase()));
    setSearchFilter(filtered);
  };

  const onItemSelect = (item) => {
    setSelectedItem(item);
    onChangeText(item);
    refRBSheet.current.close();
    if (onDonePress) {
      onDonePress(item);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => refRBSheet.current.open()}
    >
      <View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <TextInput
          style={inputStyle}
          label={label}
          isDropdown={true}
          value={selectedItem ? selectedItem[dropDownlabel] : ''}
          containerStyle={containerStyle}
          placeholder={`Choose ${label}  `}
          onChangeText={onChangeText}
          editable={false}
          labelStyle={labelStyle}
          rightIconOnPress={() => refRBSheet.current.open()}
        />
         <TouchableOpacity style={styles.iconContainer} activeOpacity={1} onPress={() => refRBSheet.current.open()}>
          <Dropdown height={15} width={15} color={'black'}/>
        </TouchableOpacity></View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={300}
          customStyles={{
            container: {
              backgroundColor:'#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}
        >
          <View style={[styles.modalHeader]}>
            <Text style={[styles.selectLabel,headerStyle]}>
              Select {label}
            </Text>
            {searchRequired && (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  value={search}
                  placeholder={`Search for ${label}`}
                  onChangeText={handleSearch}
                />
              </View>
            )}
          </View>
          <FlatList
            data={searchFilter}
            extraData={searchFilter}
            contentContainerStyle={[styles.listContainer,listContainer]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => onItemSelect(item)}
              >
               
                <Text style={[styles.itemText,itemTextStyle]}>{item[dropDownlabel]}</Text>
              </TouchableOpacity>
            )}
          />
          {errorText && (
        <Text
          style={[{color: 'red',
          fontSize: 10,
          marginTop: 5,
          textAlign: 'right',}, errorTextStyle]}
          text={errorText}
        />
      )}
        </RBSheet>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
   
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,

  },
  listItem: {
    paddingVertical: 15,
    //borderBottomWidth: 1,
    //borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  iconContainer:{
   marginTop:16,
   marginHorizontal:10
  }
});

export default CustomDropDown;
