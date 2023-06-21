import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [coins, setCoins] = useState(0); 
  
  const handleDailyChallengeClick = () => {
    const randomCount = Math.floor(Math.random() * 10) + 1; 
    setCoins(coins + randomCount); 
  };

  return (
    <Screen style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          source={{ uri: 'https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png' }}
          style={styles.logo}
        />
        <View style={tw`mb-3`}>
          <Text>...</Text>
        </View>
        <NavOptions handleDailyChallengeClick={handleDailyChallengeClick} />
        <NavFavourites />
        {/* Render the coin counter */}
        <View style={styles.coinCounter}>
          <Text style={styles.coinLabelText}>Coins</Text>
          <Text style={styles.coinText}>{coins}</Text>
        </View>
      </View>
    </Screen>
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
  coinCounter: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 5,
    borderRadius: 10,
  },
  coinLabelText: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
  coinText: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
