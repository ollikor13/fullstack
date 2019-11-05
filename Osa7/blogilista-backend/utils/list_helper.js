const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
        let total = 0
        if(blogs.length === 0){
            return total
        }else{
            for ( let i = 0, _len = blogs.length; i < _len; i++ ) {
                total += blogs[i].likes
            }
            return total
        }
}

const favoriteBlog = (blogs) => {
    let favorite = 0
    let favoritelikes = blogs[0].likes
    for ( let i = 0, _len = blogs.length; i < _len; i++ ) {
        if(blogs[i].likes > favoritelikes){
            favorite = i
        }
    }
    return blogs[favorite]
}

const mostBlogs = (blogs) => {
    let bloggers = []
    for ( let i = 0, _len = blogs.length; i < _len; i++ ) {
            bloggers.push(blogs[i].author)
    }
    if(bloggers.length == 0){
        return null
    }
    var modeMap = {}
    var maxEl = bloggers[0], maxCount = 1
    for(var i = 0; i < bloggers.length; i++){
        var el = bloggers[i]
        if(modeMap[el] == null){
            modeMap[el] = 1
        }
        else{
            modeMap[el]++
        } 
        if(modeMap[el] > maxCount){
            maxEl = el
            maxCount = modeMap[el]
        }
    }
return [maxEl, maxCount]
}

const mostLikes = (blogs) => {
    let likes = 0
    let blogger = ""
    
    let likesapu = 0
    let bloggerapu = ""
    
    for ( let j = 0, _len = blogs.length; j < _len; j++ ) {
        likesapu = blogs[j].likes
        bloggerapu = blogs[j].author
        for ( let i = j+1, _len = blogs.length; i < _len; i++ ) {
            if(blogs[i].author === bloggerapu){
                likesapu += blogs[i].likes
            }
        }
        if(likesapu > likes){
            likes = likesapu
            blogger = bloggerapu
        }
    }

    return [blogger, likes]
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }