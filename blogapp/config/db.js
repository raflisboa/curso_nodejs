if(process.env.Node_ENV=='production'){
    module.exports = {mongoURI:"mongodb+srv://rafaellisboa:facti@cluster0.qaelq.mongodb.net/mural?retryWrites=true"}
  }else{
    module.exports = {mongoURI:'mongodb://localhost/blogapp'}
  }
