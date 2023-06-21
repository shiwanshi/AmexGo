import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
    const data = [
        { name: 'Amy', id: 1 },
        { name: 'Alia', id: 2 },
        { name: 'Juli', id: 3 },
        { name: 'Emily', id: 4 },
        { name: 'David', id: 5 },
        { name: 'Pooja', id: 6 },
        { name: 'David', id: 7 },
        { name: 'Jane', id: 8 },
        { name: 'John', id: 9 },
      ];
    
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Leaderboard</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data.map((item, index) => (
          <View key={index} style={styles.box}>
            <Icon name="star" size={40} color="yellow" style={styles.icon} />
            <Text style={styles.name}>{item.name}</Text>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headingText: {
    paddingTop:20,
    fontSize: 40,
    fontWeight: 'bold',
    color:'blue'
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  box: {
    flexDirection: 'row',
    width: 350,
    height: 100,
    backgroundColor: '#89CFEF',
    marginVertical: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  name: {
    textAlign:'center',
    paddingLeft:80,
    
    color: 'blue',
    fontSize: 40,
  },

});

export default App;