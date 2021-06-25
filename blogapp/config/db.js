if(process.mongoURI='production'){
    module.exports = {mongoURI:"mongodb+srv://rafaellisboa:facti@mural.dn0lt.mongodb.net/blogapp?retryWrites=true&w=majority"}
  }else{
    module.exports = {mongoURI:'mongodb://localhost/blogapp'}
  }