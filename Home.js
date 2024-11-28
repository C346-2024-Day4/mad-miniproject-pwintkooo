import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Image, Button, FlatList, StatusBar, StyleSheet} from "react-native";
import {dataSource} from './Data.js';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 30
    },
    item: {
        width: '50%',
        marginBottom: 10
    },
    imgStyle: {
        width: 180,
        height: 200,
    },
    opacityStyle: {
        flexDirection: 'column'
    },
    nameStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textStyle: {
        fontSize: 16,
    },
    textContainer: {
        margin: 8,
        width: 110,
    },
    button: {
        margin: 10
    }
})

function Home({navigation}) {
    const [type, setType] = useState('Sneakers');
    const filteredData = dataSource.find((category) => category.type === type)?.data;

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.item} onPress={handleItemEdit}>
                <View>
                    <Image source={{uri: item.img}} style={styles.imgStyle}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameStyle}>{item.name}</Text>
                    <Text style={styles.textStyle}>{item.price}</Text>
                    <Text style={styles.textStyle}>{item.review}</Text>
                    <Text style={styles.textStyle}>{item.stock}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const handleButton = () => {
        return(
            navigation.navigate("Add")
        )
    }

    const handleItemEdit = () => {
        return(
            navigation.navigate("Edit")
        )
    }

    return(
        <ScrollView>
            <StatusBar/>
            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                items={dataSource.map(category => (
                    {label: category.type, value: category.type}
                ))}
                value={type}
            />
            <View style={styles.container}>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    contentContainerStyle={styles.itemContainer}
                />
            </View>
            <View style={styles.button}>
                <Button title="ADD ITEM" color='green' onPress={handleButton}/>
            </View>
        </ScrollView>
    );
}

export default Home;
