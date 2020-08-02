const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const sum = likes.reduce((a, b) => a + b, 0)
    return sum
}

module.exports = {
    dummy,
    totalLikes
}