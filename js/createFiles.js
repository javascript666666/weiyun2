//生成右侧树形菜单
function createFiles(data){
	var str = '';
	for (var i=0; i<data.length; i++) {
		str +=`<li class="list-file"><span class="file-checkbox">✔</span><div class="file-img" data-id = "${data[i].id}" data-pid = "${data[i].pid}"></div><div class="file-name"><span class="file-show-name">${data[i].name}</span><input class="file-change-name"></div></li>`
	}
	return str;
}