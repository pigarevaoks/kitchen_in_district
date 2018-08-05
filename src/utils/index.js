export const getCategotiesCount = data => data.length - 1

export const getSlidesCount = data => data.reduce((accum, curr) => accum + curr.images.length, 0)

export const getFirstIndexInCategory = (categories, index) => {
    return categories.slice(0, index).reduce((accum, curr) => accum + curr.images.length, 0) + 1
}

export const getLastIndexInCategory = (categories, index) => {
    return getFirstIndexInCategory(categories, index) + categories[index].images.length
}

export const getFirstImage = data => data[0].images[0]

export const getLastImage = data => {
    const dataImage = data[data.length - 1].images.length - 1
    return data[data.length - 1].images[dataImage] 
}

