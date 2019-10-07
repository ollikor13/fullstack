/* eslint-disable linebreak-style */

const blogs = [
  {
    likes: 130,
    title: 'Testikaks',
    author: 'Jonkun nimi',
    url: 'www.google.com',
    user: {
      username: 'ODSMO',
      name: 'Olli',
      id: '5d7f49f2bf85a026f0102db9'
    },
    id: '5d80f0111ae7f72b28496ad4'
  },
  {
    likes: 124,
    title: 'tokentesti',
    author: 'Olli',
    url: 'www.youtube.com',
    user: {
      username: 'ODSMO',
      name: 'Olli',
      id: '5d7f49f2bf85a026f0102db9'
    },
    id: '5d82105292492c2bd0cad1b8'
  },
  {
    likes: 124,
    title: 'tokentesti2',
    author: 'Olli',
    url: 'www.youtube.com',
    user: {
      username: 'ODSMO',
      name: 'Olli',
      id: '5d7f49f2bf85a026f0102db9'
    },
    id: '5d82108f1cc59825c844cf7a'
  },
  {
    likes: 1234,
    title: 'tokentesti3',
    author: 'Olli',
    url: 'www.fullstackopen.com',
    user: {
      username: 'ODSMO',
      name: 'Olli',
      id: '5d7f49f2bf85a026f0102db9'
    },
    id: '5d8354c0fb544b29a4b4b79f'
  },
  {
    likes: 0,
    title: 'Blogin nimi',
    author: 'Olli',
    url: 'www.google.com',
    user: {
      username: 'ODSMO',
      name: 'Olli',
      id: '5d7f49f2bf85a026f0102db9'
    },
    id: '5d933280d74ede21547651d6'
  },
  {
    likes: 1,
    title: 'Errorblogi',
    author: 'OlliK',
    url: 'www.nettisivu.fi',
    user: {
      username: 'ODSMO',
      name: 'Olli',
      id: '5d7f49f2bf85a026f0102db9'
    },
    id: '5d9334b4d74ede21547651d7'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}
export default { getAll }