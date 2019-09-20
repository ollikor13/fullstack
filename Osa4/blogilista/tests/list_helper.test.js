const listHelper = require('../utils/list_helper')

describe('dummy', () => {
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
})

  describe('totalLikes', () => {
    test('totalLikes basictest', () => {
        const blogs = [{title: "hoi",author: "hihi",url: "www.sivu.fi",likes: 23},{title: "heh",author: "hah",url: "www.lol.com",likes: 7}]   

        result = listHelper.totalLikes(blogs)
        expect(result).toBe(30)
      })
    test('totalLikes when blogs is zero', () => {
        const blogs = []
      
        result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
      })
    test('totalLikes when there is only one blog', () => {
        const blogs = [{title: "hoi",author: "hihi",url: "www.sivu.fi",likes: 23}]   

        result = listHelper.totalLikes(blogs)
        expect(result).toBe(23)
      })
  })

  describe('Favorite', () => {
      test('favorite basictest', () =>{
        const blogs = [{title: "hoi",author: "hihi",url: "www.sivu.fi",likes: 23},{title: "heh",author: "hah",url: "www.lol.com",likes: 7},{title: "Testi",author: "Tekija",url: "www.google.com",likes: 320}]  
        console.log("Favorite blog is:",listHelper.favoriteBlog(blogs))
      })
      test('favorite all blogs have same likes', () =>{
        const blogs = [{title: "hoi",author: "hihi",url: "www.sivu.fi",likes: 23},{title: "heh",author: "hah",url: "www.lol.com",likes: 23},{title: "Testi",author: "Tekija",url: "www.google.com",likes: 23}]  
        console.log("Favorite blog when all have same likes:",listHelper.favoriteBlog(blogs))
      })
  })
  
describe('Most blogs', () => {
    test('Most blogs basictest', () =>{
      const blogs = [{title: "hoi",author: "hihi",url: "www.sivu.fi",likes: 23},
                     {title: "heh",author: "hah",url: "www.lol.com",likes: 7},
                     {title: "Testi",author: "Tekija",url: "www.google.com",likes: 320},
                     {title: "Testi2",author: "Tekija",url: "www.google.com",likes: 320},
                     {title: "Blogijuttu", author: "Tekija", url: "www.stackoverflow.com", likes: 123}
                    ]  
      console.log("Blogger with most blogs and the number of blogs:", listHelper.mostBlogs(blogs))
    })
})

  
describe('Most likes', () => {
  test('Blogger with most likes', () =>{
    const blogs = [{title: "hoi",author: "hihi",url: "www.sivu.fi",likes: 23},
                   {title: "heh",author: "hah",url: "www.lol.com",likes: 7},
                   {title: "Testi",author: "Tekija",url: "www.google.com",likes: 320},
                   {title: "Testi2",author: "Tekija",url: "www.google.com",likes: 320},
                   {title: "Blogijuttu", author: "hihi", url: "www.stackoverflow.com", likes: 123}
                  ]  
    console.log("Blogger with most likes:", listHelper.mostLikes(blogs))
  })
})