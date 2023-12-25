const express = require('express')
const path = require('path')
const app = express();
const linkPreview = require('link-preview-js');

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/url', (req, res) => {
  const url = req.body.preview;
  var output;
  const options = {
    headers: {
        'User-Agent': 'Googlebot',
    },
    };

    linkPreview.getLinkPreview(url, options)
    .then(data => {
        // if(!data) return res.render(home)
        console.log(data)
        return res.render('home', {data : data})
        // console.log(data)
    })
    .catch(error => {
        console.error(error);
        res.render('home', {error : true, origUrl : url})
    });
    
  // console.log(output)
  // console.log(url);
  
})

app.listen(8000,() => {
  console.log('serving on port 8000')
})