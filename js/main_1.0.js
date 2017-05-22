createHtml(data,0);
var new_filder = document.getElementById('new_filder');
var del_filder = document.getElementById('del_filder');
//新建文件夹按钮事件
new_filder.onclick = function(){
//	file_add_data(data[0].child);
//	console.log(data);

	createFiles(data);
	
//	right_list.innerHTML = '';
//	right_list.innerHTML = createFiles(wy.getChildrenById(data[0].child,0));
////				createFilder(right_list,);
//	left_list.innerHTML = '';
//	left_list.innerHTML =createTreeByString (data[0].child,0);
////				createList(left_list,data[0].child);
//createHtml(data,0);
}
//删除文件夹按钮事件
del_filder.onclick = function (){
	file_del_data (data);
	console.log(data);
//	right_list.innerHTML = '';
//	createFilder(right_list,data);
//	left_list.innerHTML = '';
//	createList(left_list,data);
createHtml(data,0);
}
//点击右边的文件夹 进入文件夹
comeIn();
function comeIn(){
	var fileImgs = document.querySelectorAll('.file-img');
	for (var i=0; i<fileImgs.length; i++) {
		fileImgs[i].onclick = function (){
			var thisId = this.dataset.id;
			console.log(thisId);
			var arr = wy.getChildrenById(data,Number.parseInt(thisId));
			var brr = wy.getItemById(data,Number.parseInt(thisId));
			if (brr.child) {
				right_list.innerHTML = '';
				right_list.innerHTML = createFiles(arr);
				comeIn();
			}else{
				right_list.innerHTML = '';
			}
			nav_list.innerHTML= '';
			nav_list.innerHTML=createBread (wy.getParentsById(data,Number.parseInt(thisId)).reverse());
		}
	}
}

//点击右边导航 后退文件夹
//			comeBack();
function comeBack(){
	var navAs = document.querySelectorAll('.option');
 	for (var i=0; i<navAs.length; i++) {
 		navAs[i].onclick = function (){
 			console.log('123');
 			var thisId=Number.parseInt(this.dataset.id);
 			console.log(thisId);
 			var arr = wy.getChildrenById(data,thisId);
 			var brr = wy.getParentsById(data,thisId).reverse();
 			if (!thisId) {
 				arr = wy.getChildrenById(data,thisId)[0].child;
 			}
 			console.log(arr);
			right_list.innerHTML = createFiles(arr);
			nav_list.innerHTML=createBread (brr);
			if (thisId){
				comeBack();
			}
 		}
 	}
}
//左边的H2点击事件
//		 	menuList(left_list);
function menuList(ul){
var children = ul.children;
if (children[0].firstElementChild.onclick) {
	return;
}
for (var i=0; i<children.length; i++) {
	var h2 = children[i].firstElementChild;
	h2.onclick = function (){
		var thisId = Number.parseInt(this.dataset.id);
		var arr = wy.getChildrenById(data,thisId);
		var brr = wy.getParentsById(data,thisId).reverse();
		nav_list.innerHTML=createBread (brr);
		console.log(arr);
		right_list.innerHTML = '';
		var nextSibling = this.nextElementSibling;
		var parentParent = this.parentNode.parentNode;
		var uls = parentParent.getElementsByTagName('ul');
	if(nextSibling){
		right_list.innerHTML = createFiles(arr);
		for(var i=0; i<uls.length; i++){
			if (uls[i] != nextSibling) {
				uls[i].classList.remove('active');
				uls[i].previousElementSibling.firstElementChild.classList.remove('more_active');
			}
		}
		this.firstElementChild.classList.toggle('more_active');
		nextSibling.classList.toggle('active');
				menuList(nextSibling);
			}
		}
	}
}
		
