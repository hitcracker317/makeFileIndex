var fs = require('fs'); // File System(Node API)：ファイル操作
var path = require('path'); // Path(Node API)：パスの文字列操作
var cheerio = require('cheerio');
var dirTarget = './section1/'; // 対象フォルダ
var json = []; // ファイルに書き出す情報


// ファイル情報を取得
(function getFiles(dir){
    var files = fs.readdirSync(dir); // 指定フォルダ内のファイル、サブフォルダを取得
    files.forEach(function(file){ 
        var fullPath = path.join(dir, file); // フルパスを取得
        var stats = fs.statSync(fullPath) // ファイル（またはフォルダ）の情報を取得
        
        if(stats.isDirectory()){ // フォルダの場合
            getFiles(fullPath); // getFilesを再帰的に呼び出し
        } else 
        	if (stats.isFile && path.extname(file) == ".html" ) {
				
				var html = fs.readFileSync(fullPath,'utf8');
				var $ = cheerio.load(html);

				var data = {
                	fileName: file,
                	filePath: "./" + fullPath,
                	fileTitle: $('title').text()
                }
                json.push(data);
            }
        });
})(dirTarget);

//jsonファイルとして出力
fs.writeFileSync( 
    path.join("./", 'result.json'), // 対象フォルダに結果ファイルを出力
 	JSON.stringify(json) // 出力
); 
