import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export default class CategoryNav extends React.Component {

    _onPressButton = index => this.props.changeCategory(index)

    render() {
        return (
            <View style={[styles.container, this.props.layout]}>          
                {this.props.data.map((item, index) => (
                    <TouchableOpacity key={index} activeOpacity={1} onPress={() => this._onPressButton(index)}>
                        <Text style={[styles.item, this.props.active === index && styles.active]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%', 
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    item: {
        color: '#fff',
        opacity: 0.8,
        fontSize: 20,
        paddingHorizontal: 10
    },
    active: {
        opacity: 1,
    }
});