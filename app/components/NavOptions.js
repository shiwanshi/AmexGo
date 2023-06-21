import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { selectOrigin } from '../redux/slices/navSlice';
import { useSelector } from 'react-redux';

const data = [
  {
    id: '1224',
    title: 'Daily games',
    image: 'https://cdn-icons-png.flaticon.com/512/2780/2780137.png',
    screen: 'MapScreen',
  },
  {
    id: '4354',
    title: 'Monthly Wrapped',
    image:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/monthly-subscription-3396448-2827563.png',
    screen: 'monthScreen',
  },
];

const NavOptions = ({ handleDailyChallengeClick }) => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const onPressOption = (item) => {
    if (item.title === 'Daily games') {
      handleDailyChallengeClick();
      navigation.push(item.screen);
    } else {
      navigation.push(item.screen);
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-6 pb-6 pt-4 bg-gray-200 mr-4 w-40 rounded-lg`}
          onPress={() => onPressOption(item)}
          //disabled={!origin}
        >
          <View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={tw`flex-row items-center mt-3`}>
              <Text style={tw`text-lg font-bold text-black`}>{item.title}</Text>
              <Icon
                type="antdesign"
                name="arrowright"
                color="black"
                size={22}
                style={tw`ml-2`}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
