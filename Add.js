import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, StatusBar, Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {dataSource} from "./Data.js";

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    titleBox: {
        height: 40,
        backgroundColor: 'blue',
        justifyContent: "center",
    },
    title: {
        color: 'white',
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20
    },
    textBox: {
        marginTop: 10,
        gap: 5
    },
    subTitle: {
        fontSize: 18
    },
    textInput: {
        borderWidth: 1,
        fontSize: 16
    }
})

function Add({navigation}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [review, setReview] = useState('');
    const [img, setImg] = useState('');
    const [stock, setStock] = useState('Available');
    const [type, setType] = useState('Sneakers');

    const handleButton = () => {
        if (!name || !price || !review || !img) {
            Alert.alert("Please fill out all fields")
            return;
        }

        let indexNum = 0;
        if (type === "Team Jersey Shirts") {
            indexNum = 1;
        } else if (type === "Hoodies") {
            indexNum = 2;
        }
        const newItem = {
            name: name, price: price, review: review, img: img, stock: stock
        };
        dataSource[indexNum].data.push(newItem);

        return(
            navigation.navigate("Home")
        )
    }

    return(
        <View>
            <StatusBar/>
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Item Details</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Name:</Text>
                    <TextInput style={styles.textInput} placeholder='Enter item name...'
                               onChangeText={text => setName(text)}
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Price:</Text>
                    <TextInput style={styles.textInput} placeholder='Enter price...'
                               onChangeText={text => setPrice(text)}
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Review:</Text>
                    <TextInput style={styles.textInput} placeholder="Enter item's review..."
                               onChangeText={text => setReview(text)}
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Stock Status:</Text>
                    <TextInput style={styles.textInput} placeholder={stock} editable={false}/>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Image:</Text>
                    <TextInput style={styles.textInput} placeholder='Enter image url...'
                               onChangeText={text => setImg(text)}
                    />
                </View>
                <RNPickerSelect
                    onValueChange={(value) => setType(value)}
                    items={dataSource.map(category => (
                        {label: category.type, value: category.type}
                    ))}
                    value = {type}
                />
                <Button title="SUBMIT" color="green" onPress={handleButton}/>
            </View>
        </View>
    );
}

export default Add;
