import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image, Button, FlatList, StatusBar, StyleSheet, Alert} from "react-native";
import {dataSource} from './Data.js';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    item: {
        width: '50%',
        marginBottom: 10
    },
    imgStyle: {
        width: 180,
        height: 200,
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "#DFFFD6"
    },
    opacityStyle: {
        flexDirection: 'column'
    },
    nameStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    textStyle: {
        fontSize: 18,
    },
    textContainer: {
        margin: 8,
        width: 110,
    },
    button: {
        marginBottom: 20
    },
    title: {
        textTransform: "uppercase",
        backgroundColor: "green",
        padding: 10,
        color: "white",
        fontSize: 20,
        fontFamily: "serif",
        fontWeight: "bold",
        textAlign: "center",
    },
})

function Home({navigation}) {
    const [type, setType] = useState('Sneakers');
    const filteredData = dataSource.find((category) =>
        category.type === type)?.data;

    const renderItem = ({item, index}) => {
        const handleItemEdit = () => {
            navigation.navigate("Edit",
                {index: index, category: type , name: item.name, price: item.price, review: item.review, img: item.img, stock: item.stock})
        }
        return (
            <TouchableOpacity style={styles.item} onPress={handleItemEdit}>
                <View>
                    <Image source={{uri: item.img}} style={styles.imgStyle} resizeMode="contain"/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameStyle}>{item.name}</Text>
                    <Text style={styles.textStyle}>S$ {item.price}</Text>
                    <Text style={styles.textStyle}>{item.review}/5</Text>
                    <Text style={[styles.textStyle, {color: item.stock === 'Available' ? 'blue' : 'red'}]}>{item.stock}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const addButton = () => {
        navigation.navigate("Add")

    }

    const calculateButton = () => {
        const stockSummary = dataSource.map((category) => {
            const availableCount = category.data.filter(item => item.stock === "Available").length;
            const outOfStockCount = category.data.filter(item => item.stock === "Out of Stocks").length;
            const total = category.data.length;
            const availablePercent = (availableCount*100/total).toFixed(2);
            return {
                type: category.type,
                available: availableCount,
                outOfStock: outOfStockCount,
                availablePercent: availablePercent
            };
        });
        Alert.alert(
            "Stock Summary",
            stockSummary.map(category =>
                `Category: ${category.type}\nAvailable: ${category.available}\nOut of Stock: ${category.outOfStock}\nAvailable Stock %: ${category.availablePercent}%\n`
            ).join('\n'),
            [{ text: "OK" }]
        );
    }

    return(
        <View>
            <StatusBar/>
            <FlatList
                contentContainerStyle={styles.container}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>Welcome to SHOPSPOT</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setType(value)}
                            items={dataSource.map(category => (
                                {label: category.type, value: category.type}
                            ))}
                            value={type}
                            style={{
                                viewContainer: {
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: "#DFFFD6"
                                }
                            }}
                        />
                    </View>
                }
                data={filteredData}
                renderItem={renderItem}
                numColumns={2}
                ListFooterComponent={
                    <View>
                        <View style={styles.button}>
                            <Button title="ADD ITEM" color='green' onPress={addButton}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="CALCULATE STOCK STATUS" color='green' onPress={calculateButton}/>
                        </View>
                    </View>
                }
            />
        </View>
    );
}

export default Home;
