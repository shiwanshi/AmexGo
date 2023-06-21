import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ProgressBarAndroid, Image, FlatList } from 'react-native';
import { VictoryPie } from 'victory-native';

const graphicColor = ['#D1EAF0', '#0D52BD', '#89CFEF', '#000080'];
const wantedGraphicData = [
  { x: 'Food', y: 90 },
  { x: 'Shop', y: 35 },
  { x: 'Travel', y: 55 },
  { x: 'Misc', y: 30 },
];

const defaultGraphicData = [
  { x: 'Liquid', y: 0 },
  { x: 'Iced', y: 0 },
  { x: 'Total', y: 100 },
];

const categories = ['All', 'Food', 'Shop', 'Travel', 'Misc'];

const foodImages = [
  { url: 'https://cdn.urbanpiper.com/media/gallery_images/2023/02/20/logo_chilis-01.png', label: 'Flat 25% discount on the total bill value' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/PizzaExpressBlack.svg/1200px-PizzaExpressBlack.svg.png', label: 'Flat 25% discount on the total bill value' },
];

const travelImages = [
  { url: 'https://companies.naukri.com/itchotels-careers/wp-content/uploads/sites/1004/2014/08/ITC-HOTELS-OG-TAG-LOGO.jpg', label: 'Get Exclusive offers at ITC on Stay' },
  { url: 'data:image/jpeg;base64,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', label: 'Card members can avail 15% off  ' },
];

function Home() {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [progress, setProgress] = useState({});
  const [showFoodImages, setShowFoodImages] = useState(false);
  const [showTravelImages, setShowTravelImages] = useState(false);

  useEffect(() => {
    setGraphicData(getDataByCategory(selectedCategory));
    setShowFoodImages(selectedCategory === 'Food');
    setShowTravelImages(selectedCategory === 'Travel');
  }, [selectedCategory]);

  const getDataByCategory = (category) => {
    if (category === 'All') {
      return wantedGraphicData;
    }
    return wantedGraphicData.filter((data) => data.x === category);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleAddButtonClick = (category) => {
    const newProgress = { ...progress };
    newProgress[category] = newProgress[category] ? newProgress[category] + 1 : 1;
    setProgress(newProgress);
  };

  const handleRemoveButtonClick = (category) => {
    const newProgress = { ...progress };
    if (newProgress[category]) {
      newProgress[category] = newProgress[category] - 1;
      if (newProgress[category] === 0) {
        delete newProgress[category];
      }
      setProgress(newProgress);
    }
  };

  const getCategoryColor = (category) => {
    const index = categories.indexOf(category);
    return graphicColor[index % graphicColor.length];
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png' }}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <View style={styles.chartContainer}>
        <VictoryPie
          animate={{ easing: 'exp' }}
          data={graphicData}
          innerRadius={20}
          labelRadius={75} // Adjust the labelRadius value as per your preference
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#00000',
              strokeWidth: 2,
              fill: ({ datum, index }) => getCategoryColor(datum.x),
            },
            labels: {
              fill: 'black',
              fontWeight: 'bold',
              fontSize: 14,
            },
          }}
        />
      </View>
      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.selectedFilterButton,
            ]}
            onPress={() => handleCategoryFilter(category)}
          >
            <Text style={[styles.filterText, selectedCategory === category && styles.selectedFilterText]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {categories.map((category) => (
        <View key={category} style={[styles.progressContainer, selectedCategory !== category && styles.hidden]}>
          <Text style={styles.categoryText}>{category}</Text>
          {(category === 'All' || category === selectedCategory) && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.decreaseButton]}
                onPress={() => handleRemoveButtonClick(category)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={() => handleAddButtonClick(category)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
          {progress[category] && (
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress[category] / 10}
              style={styles.progressBar}
            />
          )}
          {category === 'Food' && showFoodImages && (
            <View style={styles.foodImagesContainer}>
              <FlatList
                data={foodImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.foodImageContainer}>
                    <Image source={{ uri: item.url }} style={styles.foodImage} />
                    <Text style={styles.foodImageText}>{item.label}</Text>
                  </View>
                )}
                horizontal={false}
              />
            </View>
          )}
          {category === 'Travel' && showTravelImages && (
            <View style={styles.travelImagesContainer}>
              <FlatList
                data={travelImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.travelImageContainer}>
                    <Image source={{ uri: item.url }} style={styles.travelImage} />
                    <Text style={styles.travelImageText}>{item.label}</Text>
                  </View>
                )}
                horizontal={false}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 100,
    marginTop:0,

  },
  chartContainer: {
    marginBottom: 20,
    
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#23297A',
    marginRight: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#23297A',
  },
  filterText: {
    color: '#23297A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  progressContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryText: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#23297A',
  },
  decreaseButton: {
    backgroundColor: '#23297A',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  progressBar: {
    width: 150,
    height: 10,
  },
  hidden: {
    display: 'none',
  },
  foodImagesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  foodImageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 15,
    marginBottom: 20,
  },
  foodImageText: {
    fontSize: 15,
    marginTop: 27,
  },
  travelImagesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  travelImageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  travelImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 15,
    marginBottom: 20,
  },
  travelImageText: {
    fontSize: 15,
    marginTop: 27,
  },
});

export default Home
