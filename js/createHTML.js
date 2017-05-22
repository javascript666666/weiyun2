var leftList = document.getElementById('left_list');
var navList = document.getElementById('nav_list');
var rightList = document.getElementById('right_list');
var currentData = null;//定义一个当前右面文件夹的数据
var leftList = document.querySelector('#left_list');
//获取右侧文件夹图标结构父容器
var rightList = document.querySelector('#right_list');
//获取右上侧 文件夹导航 结构父容器
var navList = document.querySelector('#nav_list');
function createHtml(data,id){
	//获取左侧树形结构父容器
	//创建左侧树形结构
	leftList.innerHTML =createTreeByString (data,id);
	//创建右侧导航结构
	navList.innerHTML=createBread (wy.getParentsById(data,id).reverse());
	//创建右侧文件夹结构
	rightListCreateHTML(data,id);
	return currentData = wy.getChildrenById(data,id);
}
function rightListCreateHTML (data, id) {
		rightList.innerHTML =createFiles(wy.getChildrenById(data,id));
		var currentData = null;
		return currentData = wy.getChildrenById(data,id);
}