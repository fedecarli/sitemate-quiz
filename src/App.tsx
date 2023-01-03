/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Linking,
  Share,
  Image,
  Dimensions,
} from 'react-native';
import newsService from './services/news';
import axios from 'axios';

const API_KEY = 'c4f5ba96d06e410c940954859e542d2b';
const {width} = Dimensions.get('screen');

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const [searchText, onChangeText] = React.useState('apple');
  const [news, setNews] = React.useState([]);

  const handleSearch = async () => {
    const {data} = await axios.get(
      `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${API_KEY}`,
    );
    console.log('data>>', JSON.stringify(data.articles));
    setNews(data.articles);
  };

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <Image source={{uri: item.urlToImage}} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text numberOfLines={3} style={styles.description}>
        {item.description}
      </Text>
      <TouchableOpacity onPress={() => handleLink(item.url)}>
        <Text style={styles.moreButton}>READ MORE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.mainSafeArea}>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={onChangeText}
            value={searchText}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleSearch}>
            <View style={styles.searchButton}>
              <Text style={styles.buttonText}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.title}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {backgroundColor: '#2e81da', flex: 0},
  mainSafeArea: {backgroundColor: '#fff', flex: 1},
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#2e81da',
    shadowColor: '#161616',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
  searchInput: {
    backgroundColor: '#fefefe40',
    width: '70%',
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchButton: {
    borderRadius: 4,
    backgroundColor: '#fefefe',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#2e81da',
    fontWeight: '700',
  },
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {width: 64, height: 64, borderRadius: 4},
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21,
    width: width - 108,
  },
  description: {height: 64, lineHeight: 16, marginTop: 15},
  moreButton: {fontWeight: '800', color: '#2e81da', fontSize: 11},
});

export default App;
