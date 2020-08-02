const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const sum = likes.reduce((a, b) => a + b, 0)
    return sum
}

const favouriteBlog = (blogs) => {
    var index = 0
    var mostLikes = 0

    for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes
            index = i
        }
    }
    const favouriteBlog = blogs[index]
    JSON.stringify(favouriteBlog)

    return favouriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}