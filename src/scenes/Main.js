import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CategorySlider } from '../components';
import { data } from '../../public/data.js';

export default class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <CategorySlider data={data} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
});