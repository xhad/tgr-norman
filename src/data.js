const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: []})
  .write()


module.exports = db
// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()
 
// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()
// db.get('posts')
//   .find({ id: 1 })
//   .value()
