const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
const db = require('./data.js')
const enc = require('./enc.js')

const SECRET = process.env.SECRET || '90d79a2d32ce93389c14391edffe4bbe'

program
  .version('0.0.1 - Horangi Data Lake')
  .description('Man Made Data Lake');

program
  .command('addUser <name> <secret, [string]>')
  .alias('a')
  .description('Add a contact')
  .action(async (name, secret) => {
    const result = await db.get('users').find({name: name}).value()
    if(result) {
      console.log('name is already saved in database')
    } else {
      const encSecret = await enc.encrypt(secret, SECRET)
      const write = await db.get('users').push({ name, secret: encSecret }).write()
      console.log(`User ${name} added with encrypted secret ${encSecret}`)
    }
    // .push({firstname, secret: encKey}).write()
    // console.log(result)
  });

program
  .command('getUser <name>')
  .alias('r')
  .description('Get user')
  .action(async (name) => {
    const result = await db.get('users')
        .find({name})
        .value()
    if (result) {
      const decKey = await enc.decrypt(result.secret, SECRET)
      result.secret = decKey
      console.log(result)
    } else {
      console.log('User not found')
    }

  });

module.exports = {
    init: () => program.parse(process.argv)
}