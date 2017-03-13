//添加数据
function file_add_data (data) {
data.unshift({
	name:'新建文件夹',
	id : 'maxId+1',
	pid: '当前所在的pid',
	type: 'filder'
		});
}
//删除数据
function file_del_data (data){
var spans = right_list.querySelectorAll('span');
var arr1 = [];
var arr2 = [];
for (var i=0; i<spans.length; i++) {
	if (spans[i].classList.contains('active')) {
			arr1.push(i);
			arr2.push(data[i]);
		}
	}
	for (var j=0; j<arr1.length; j++) {
		data.splice(arr1[j]-i,1);
	}
}