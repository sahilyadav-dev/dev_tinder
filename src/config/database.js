const database = require("mongoose")



async function connect(){
  await database.connect("mongodb+srv://shly35155:2zU1p9qqnvurS7mn@firstdatabase.icejsjc.mongodb.net/DevTinder")
}



module.exports = connect

