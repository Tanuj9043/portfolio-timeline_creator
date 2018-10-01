let express = require('express');
let app = express();
let port = 8080 || process.env.PORT;
let request = require('request');
let bodyParser = require('body-parser');
var file = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',express.static('main'));
app.use('/home',express.static('home'));
app.use('/manual',express.static('manual'));
app.use('/temp1',express.static('temp1'));
app.use('/temp2',express.static('temp2'));
app.use('/download',express.static('portfolio'));

let accessToken;
let app_id=`1638910182865367`;
let app_secret=`e73e69eae76d0ffe768f2cacc093f6e1`;
let redirect_uri=`http://localhost:8080/handleAuth`;
let permission_list=`email+public_profile+user_about_me+user_education_history+user_work_history`;
let url = `https://www.facebook.com/dialog/oauth?client_id=${app_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${permission_list}`;

app.get('/authorize', function(req, res){
    res.redirect(url);
});

app.get('/handleAuth', function(req, res){
    var ccode = req.query.code;
    if(accessToken!=''){
	    request.post({
	    	url:'https://graph.facebook.com/v2.11/oauth/access_token',
	        formData:{
		        client_id: app_id,
		        client_secret: app_secret,
		        redirect_uri: 'http://localhost:8080/handleAuth',
		        code:ccode,
	    	}},
	    	function optionalCallback(err,httpResponse,body){
		    	//setting accessToken to a global variable
		        accessToken = JSON.parse(body).access_token;
		        //redirect to a display route
		        res.redirect('http://localhost:8080/home');
		    }
	    );
	}
	else{
		res.redirect('/authorize');
	}
});

app.get('/home/getdata', function(req,res){
	request.get(
		`https://graph.facebook.com/v2.11/me?fields=id,name,about,email,education,work&access_token=${accessToken}`,
		function(err,httpResponse,data){
			res.send(JSON.parse(data));
		} 
	);
});

let DATA;
app.use('/savedata', function(req,res){
	DATA = req.body;
	res.send("Sucess");
});

app.use('/putdata', function(req,res){
	res.send(DATA);
});

app.use('/generatepage', function(req,res){
	let data = req.body;
	file.writeFile('./portfolio/index.html',data.page, (err)=>{
		res.send("File Written!");
	});
});

app.listen(port, function(){
	console.log(`Server running on port ${port}`);
})
