import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 400,
        height: 400,
    },
});

function LandingPage({ navigation })  {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('./images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

export default LandingPage;
