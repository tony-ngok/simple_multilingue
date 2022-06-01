// https://phrase.com/blog/posts/nodejs-tutorial-on-creating-multilingual-web-app/

var fs = require('fs');
var http = require('http');
var url = require('url');
var glob = require('glob');
var language_dict = {};

// search for all languages JSON files
glob.sync('./lang/*.json').forEach(function(fich) {
    let dash = fich.split("/");
    if (dash.length == 3) {
        let dot = dash[2].split(".");
        if (dot.length == 2) {
            let lang = dot[0];
            fs.readFile(fich, function(err, data) {
                language_dict[lang] = JSON.parse(data.toString());
            });
        }
    }
});

// create server function
// use url module to obtain the URL entered by user (i.e. identify language chosen by user)
http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var lang = 'en';

    let dash = q.pathname.split("/");
    if (dash.length >= 2) {
        let code = dash[1];
        if (code != '' && language_dict.hasOwnProperty(code)) {
            lang = code;
        }
    }
  
    // use Regex to replace all instances with corresponding values based on key
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        let data_string = data.toString();
        for (var key of Object.keys(language_dict[lang])) {
            let pattern = new RegExp("{{" + key + "}}", "g");
            data_string = data_string.replace(pattern, language_dict[lang][key]);
        }

        res.write(data_string);
        return res.end();
    });
}).listen(8080);
