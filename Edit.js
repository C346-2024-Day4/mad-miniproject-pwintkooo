import React, {useState} from 'react';
import {View, Text, Button, StatusBar, TextInput, StyleSheet, Alert} from "react-native";
import {dataSource} from "./Data.js";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: "row"
    },
    button: {
        margin: 10,
        flex: 1
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

function Edit({navigation, route}) {
    const [name, setName] = useState(route.params.name);
    const [price, setPrice] = useState(route.params.price);
    const [review, setReview] = useState(route.params.review);
    const [img, setImg] = useState(route.params.img);
    const [stock, setStock] = useState(route.params.stock);

    const handleSave = () => {
        if (!name || !price || !review || !img) {
            Alert.alert("Please fill out all fields")
            return;
        }
        let indexNum = 0;
        if (route.params.category === "Team Jersey Shirts") {
            indexNum = 1;
        } else if (route.params.category === "Hoodies") {
            indexNum = 2;
        }
        dataSource[indexNum].data[route.params.index].name = name;
        dataSource[indexNum].data[route.params.index].price = price;
        dataSource[indexNum].data[route.params.index].review = review;
        dataSource[indexNum].data[route.params.index].stock = stock;
        dataSource[indexNum].data[route.params.index].img = img;
        navigation.navigate("Home")
    }

    const handleDelete = () => {
        let indexNum = 0;
        if (route.params.category === "Team Jersey Shirts") {
            indexNum = 1;
        } else if (route.params.category === "Hoodies") {
            indexNum = 2;
        }
        Alert.alert("Are you sure?", "",
            [{text: "Yes", onPress:()=>{
                    dataSource[indexNum].data.splice(route.params.index, 1);
                    navigation.navigate("Home")
                }},
                    {text: "No"}
            ])
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
                    <TextInput style={styles.textInput}
                               onChangeText={text => setName(text)}
                               value={name}

                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Price:</Text>
                    <TextInput style={styles.textInput}
                               onChangeText={text => setPrice(text)}
                               value={price}
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Review:</Text>
                    <TextInput style={styles.textInput}
                               onChangeText={text => setReview(text)}
                               value={review}
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.subTitle}>Image:</Text>
                    <TextInput style={styles.textInput}
                               onChangeText={text => setImg(text)}
                               value={img}
                    />
                </View>
                <RNPickerSelect
                    onValueChange={value => setStock(value)}
                    items={[
                        {label: 'Available', value: 'Available'},
                        {label: 'Out of Stocks', value: 'Out of Stocks'}
                    ]}
                    value={stock}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="SAVE"
                            color="green"
                            onPress={handleSave}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="DELETE"
                            color="green"
                            onPress={handleDelete}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Edit;
