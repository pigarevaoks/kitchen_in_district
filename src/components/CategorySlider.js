import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import CategoryNav from './CategoryNav';
import { getFirstIndexInCategory } from '../utils'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class CategorySlider extends Component {

    state = {
        currentCategoryIndex: 0,
        slideIndex: 0
    }

    _renderImages = item => (
        item.images.map((image, index) => (
            <Image
                key={`image${index}`}
                source={{ uri: image }}
                style={{ width: deviceWidth, height: deviceHeight }}
            />           
        ))
    )
    
    _changeCategory = index => {
        this.setState({ currentCategoryIndex: index })
        this.scroll.scrollTo({ x: deviceWidth * getFirstIndexInCategory(this.props.data, index), y: 0, animated: true })
    }

    _onScroll = e => {
        const { currentCategoryIndex } = this.state
        const width = e.nativeEvent.layoutMeasurement.width
        const offset = e.nativeEvent.contentOffset.x
        const slideIndex = offset / width
        this.setState({ slideIndex: slideIndex })
        const firstIndexInCategory = getFirstIndexInCategory(this.props.data, currentCategoryIndex)
        const lastIndexInCategory = firstIndexInCategory + this.props.data[currentCategoryIndex].images.length
        if (slideIndex >= lastIndexInCategory) {
            this.setState({ currentCategoryIndex: currentCategoryIndex + 1 })
        } else if (slideIndex < firstIndexInCategory) {
            this.setState({ currentCategoryIndex: currentCategoryIndex - 1 })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CategoryNav 
                    data={this.props.data} 
                    active={this.state.currentCategoryIndex}
                    layout={styles.nav}
                    changeCategory={this._changeCategory}
                />
                <ScrollView
                    horizontal
                    ref={elem => this.scroll = elem}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                    onMomentumScrollEnd={this._onScroll}
                >
                {this.props.data.map((item, index) => (
                    <ScrollView
                        horizontal
                        key={`slider${index}`}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={10}
                        pagingEnabled
                    >
                        {this._renderImages(item)}
                    </ScrollView>
                ))}
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nav: {
        position: 'absolute',
        zIndex: 2,
    },
})