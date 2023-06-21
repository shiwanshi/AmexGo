import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { selectOrigin } from '../redux/slices/navSlice'
import { useSelector } from 'react-redux'

const data = [
    {
        id: '1224',
        title: 'LeaderBoard',
        image: 'https://cdn-icons-png.flaticon.com/512/3150/3150116.png',
        screen: 'SuccessScreen'
    },
    {
        id: '4354',
        title: 'Shop Local',
        image: 'https://cdn-icons-png.flaticon.com/512/5131/5131616.png',
        screen: 'EatsScreen'
    },
]

const NavOptions = () => {
    const navigation = useNavigation()
    const origin = useSelector(selectOrigin)

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={tw`p-2 pl-6 pb-6 pt-4 bg-gray-200 mr-4 mt-10 w-40 rounded-lg`}
                    onPress={() => navigation.push(item.screen)}
                    //disabled={!origin}
                >
                    <View>
                        <Image 
                                source={{ uri: item.image }}
                                style={styles.image}
                            />
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
            keyExtractor={item => item.id.toString()}
            horizontal
      />
    )
}

export default NavOptions

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    }
})
