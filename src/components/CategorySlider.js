import React, { Component } from 'react'
import { 
    View, 
    StyleSheet, 
    Image, 
    Dimensions, 
    ScrollView 
} from 'react-native'
import { getFirstIndexInCategory, getLastIndexInCategory, getCategotiesCount, getSlidesCount, getFirstImage, getLastImage } from '../utils'
import CategoryNav from './CategoryNav';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class CategorySlider extends Component {

    state = {
        currentCategoryIndex: 0,
        slideIndex: 0
    }

    componentDidMount() {
        this.scrollView.scrollTo({ x: deviceWidth, y: 0 })
    }

    _renderImages = item => (
        item.images.map((image, index) => (
            <Image
                key={`image${index}`}
                source={{ uri: image }}
                style={styles.image}
            />           
        ))
    )

    _renderFirstSlide = () => (
        <ScrollView key={`slider_first`} horizontal>
            <Image
                key={`image_first`}
                source={{ uri: getLastImage(data) }}
                style={styles.image}
            />
        </ScrollView>
    )      
    

    _renderLastSlide = () => (
        <ScrollView key={`slider_last`} horizontal>
            <Image
                key={`image_last`}
                source={{ uri: getFirstImage(data) }}
                style={styles.image}
            />
        </ScrollView>
    )   
    
    
    _changeCategory = index => {
        this.setState({ currentCategoryIndex: index })
        this.scrollView.scrollTo({ x: deviceWidth * (getFirstIndexInCategory(this.props.data, index)), y: 0, animated: true })
    }

    _onScroll = e => {
        const { currentCategoryIndex } = this.state
        const { data } = this.props

        const slideIndex = e.nativeEvent.contentOffset.x / deviceWidth
        this.setState({ slideIndex: slideIndex })
        const firstIndexInCategory = getFirstIndexInCategory(data, currentCategoryIndex)
        const lastIndexInCategory = getLastIndexInCategory(data, currentCategoryIndex)
        const slidesCount = getSlidesCount(data)
        const categotiesCount = getCategotiesCount(data)

        if (slideIndex >= lastIndexInCategory) {
            this.setState({ currentCategoryIndex: currentCategoryIndex + 1 })
        } else if (slideIndex < firstIndexInCategory) {
            this.setState({ currentCategoryIndex: currentCategoryIndex - 1 })
        }

        if (slideIndex === slidesCount + 1) {
            this.setState({ currentCategoryIndex: 0, slideIndex: 0 })
            this.scrollView.scrollTo({ x: deviceWidth, y: 0, animated: false })
        }

        if (slideIndex === 0) {
            this.setState({ currentCategoryIndex: categotiesCount, slideIndex: slidesCount })
            this.scrollView.scrollTo({ x: slidesCount * deviceWidth, y: 0, animated: false })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CategoryNav 
                    layout={styles.nav}
                    data={this.props.data} 
                    active={this.state.currentCategoryIndex}
                    changeCategory={this._changeCategory}
                />
                <ScrollView
                    horizontal
                    ref={elem => this.scrollView = elem}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                    onMomentumScrollEnd={this._onScroll}
                >   
                    {this._renderFirstSlide()}
                    {this.props.data.map((item, index) => (
                        <ScrollView key={`slider${index}`} horizontal>
                            {this._renderImages(item)}
                        </ScrollView>
                    ))}
                    {this._renderLastSlide()}
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
    image: {
        width: deviceWidth, 
        height: deviceHeight
    }
})