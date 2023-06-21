import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity ,Alert} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();
  const showAlert = () => {
    Alert.alert(
      'Spin The Wheel',
      'Redirecting...',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
  };


  const options = [
    {
      id: '1',
      title: 'Spin The Wheel',
      image: 'https://cdn-icons-png.flaticon.com/512/6645/6645363.png',
      screen: 'Option1Screen',
    },
    {
      id: '2',
      title: 'Flappy Bird',
      image: 'data:image/jpeg;base64,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',
      screen: 'Option2Screen',
    },
    {
      id: '3',
      title: 'Wordle',
      image: 'https://static.wikia.nocookie.net/logopedia/images/4/45/Wordle_2022_Icon.png/revision/latest?cb=20220514191523',
      screen: 'Option3Screen',
    },
  ];

  return (
    <View style={styles.container}>
                    <View style={tw`p-5`}>
        <Image
          source={{ uri: 'https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png' }}
          style={styles.logo}
        />
        <View style={tw`mb-3`}>
          <Text>...</Text>
        </View>
        </View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionContainer}
          //onPress={() => navigation.push(option.screen)}
          onPress={showAlert}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: option.image }} style={styles.optionImage} />
          </View>
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Icon
            type="antdesign"
            name="arrowright"
            color="black"
            size={22}
            style={styles.optionArrowIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    marginLeft:20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionArrowIcon: {
    marginTop: 5,
  },
});

export default MapScreen;
