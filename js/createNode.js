//生成文件夹图片 的字符串
function createFiles(data){
	var str = '';
	for (var i=0; i<data.length; i++) {
		str +=`<li class="list-file"><span class="file-checkbox">✔</span><div class="file-img" data-id = "${data[i].id}" data-pid = "${data[i].pid}"></div><div class="file-name"><span class="file-show-name">${data[i].name}</span><input class="file-change-name"></div></li>`
	}
	return str;
}

//生成左侧树形结构的 字符串函数 
function createTreeByString (data,id){
	var str = '';
	for (var i=0; i<data.length; i++) {
		var cls = data[i].child ? 'no_more more':'no_more';
		str +=`<li class="li_class">
				<h2 data-id="${data[i].id }" data-pid="${data[i].pid}">
					<a href="javaScript:;" class="${cls}"></a>
					<span class="text" id="0">${data[i].name}</span>
				</h2>`;
		str += data[i].child ? 
				`<ul class="li_item">${createTreeByString(data[i].child,id)}</ul>`
				:'' ;
		str +='</li>';
	}
	return str;
}

//生成右侧文件夹导航 的字符串函数 
function createBread (data) {
	var str = '';
	for (var i=0; i<data.length; i++) {
	str += `<li class="option_item"><a href="javaScript:;" data-id="${data[i].id}" data-pid="${data[i].pid}" class="option">${data[i].name}</a></li>`
	}
	return str;
}