export const getFirstIndexInCategory = (categories, index) => {
    return categories.slice(0, index).reduce((accum, curr) => accum + curr.images.length, 0)
}