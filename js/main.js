
//获取全选按钮
var check = document.getElementById('check');
//获取新建文件夹按钮 
var addFilder = document.getElementById('new_filder');
//获取删除文件按钮
var delFilder = document.getElementById('del_filder');
//获取重命名按钮
var reName = document.getElementById('re-name');
//获取提示信息
var timeDelay = document.querySelector('.time-delay');
var deleOk = document.querySelector('.dele-ok');
//var createOk = document.querySelector('.create-ok');
var selecSure = document.querySelector('.selec-sure');
var deleSure = document.querySelector('.dele-sure');
var delNo = document.querySelector('.del-no');
var delYes = document.querySelector('.del-yes');
var coverSure = document.querySelector('.cove-sure');
var coverNo = document.querySelector('.cover-no');
var coverYes = document.querySelector('.cover-yes');
var renameSure = document.querySelector('.rename-sure');
var renameNo = document.querySelector('.rename-no');
var renameYes = document.querySelector('.rename-yes');
//初次页面渲染
createHtml(data,0);
//左侧树形结构的点击事件
leftList.onclick = function(e){
	var target = e.target;
	var current = target.dataset.id*1;
	navList.innerHTML=createBread (wy.getParentsById(data,current).reverse());
	
	check.checked = false;
	for (var i=0; i< currentData.length; i++) {
		currentData[i].checked = false;
	}
	n=0;

	currentData = rightListCreateHTML (data, current);
	console.log(currentData);


	if (target.nodeName.toUpperCase() ==='A' || 'SPAN' ) {
		var h2s = document.querySelectorAll('h2');
		for (var i=0;i<h2s.length; i++) {
			h2s[i].classList.remove('active');
		}
		target.parentNode.classList.add('active');
	}
	if (target.nodeName.toUpperCase() === 'H2' ){
		for (var i=0;i<h2s.length; i++) {
			h2s[i].classList.remove('active');
		}
		target.classList.add('active');
	}
}

//右侧文件夹的点击事件
	var n = 0;
rightList.onclick = function(e){
	var target = e.target;
	var current = target.dataset.id*1;
	if (target.nodeName.toUpperCase() ==='LI' || target.classList.contains('file-img')) {
		var current = target.dataset.id*1;
		console.log(target);
		createHtml(data,current);
	}
//-----------------------------------单次点击选择
	if (target.nodeName.toUpperCase() === 'SPAN' && target.classList.contains('file-checkbox')) {
		target.classList.toggle('active');
		target.parentNode.classList.toggle('active');
			for (var i=0; i<currentData.length; i++) {
				if (currentData[i].id == target.dataset.id  && currentData[i].checked === false) {
					console.log(111);
					currentData[i].checked = true;
					n++;
				}else if (currentData[i].id == target.dataset.id  && currentData[i].checked === true) {
					console.log(222);
					currentData[i].checked = false;
					n--;
				}
			}
			if (n == currentData.length) {
				check.checked = true;
			}else{
				check.checked = false;
			}
			console.log(currentData);
			console.log(n);
	}
}
//------------------------------------双击重名铭	
var isReNameing = false;
rightList.ondblclick = function(e){
	 reNameFn (e);
}
function reNameFn (e){
	isReNameing = true;
	var target = e.target;
	if (target.nodeName.toUpperCase() === 'SPAN' && target.classList.contains('show')) {
		var input = target.nextElementSibling;
		input.classList.toggle('show');
		input.focus();
		input.select();
		keyEvent(input);
		target.classList.toggle('show');
		current = target.parentNode.parentNode.dataset.id*1;
		var obj = wy.getItemById(data,current);
		console.log(obj);
		target.nextElementSibling.onblur = function(){
			if (notCanUseName(target.nextElementSibling, wy.getChildrenById(data,obj.pid))) {
				console.log('文件夹重名');
				alertMessage('文件夹重名!', 'fail');
				return;
			}
			obj.name =target.nextElementSibling.value.trim()? target.nextElementSibling.value.trim() : target.innerHTML;
			console.log(obj);
			current = obj.pid;
			createHtml(data,current);
			alertMessage('文件重命名完成!', 'suc');
			isReNameing = false;
		}
	}
}
//------------------------------点击重命名按钮 重命名 
reName.onclick = function(){
	isReNameing = true;
	var rightChild = rightList.children;
	var len = rightChild.length;
	var m = 0;
	var index = 0;
	var target;
	for (var i=0; i<len; i++) {
		if (rightChild[i].classList.contains('active')) {
			m++;
			index = i;
		}
	}
	if (m == 1) {
		//清除选中
		for (var i=0; i< currentData.length; i++) {
			currentData[i].checked = false;
		}
		n=0;
		rightChild[index].classList.remove('active');
		rightChild[index].firstElementChild.classList.remove('active');
		//重命名选中
		target = rightChild[index].lastElementChild.firstElementChild;
		var input = target.nextElementSibling;
		keyEvent(input);
		input.classList.toggle('show');
		input.focus();
		input.select();
		target.classList.toggle('show');
		current = target.parentNode.parentNode.dataset.id*1;
		var obj = wy.getItemById(data,current);
		console.log(obj);
		input.onblur = function(){
			if (notCanUseName(input, wy.getChildrenById(data,obj.pid))) {
				console.log('文件夹重名');
				alertMessage('文件夹重名!', 'fail');
				return;
			}
			obj.name =input.value.trim()? input.value.trim() : target.innerHTML;
			console.log(obj);
			current = obj.pid;
			createHtml(data,current);
			alertMessage('文件重命名成功!', 'suc');
			isReNameing = false;
		}
	}
	if (m > 1) {
		console.log('请选一个文件  一次只能重名一个文件！');
		alertMessage('只能选一个文件!', 'fail');
		
	}
	if (m == 0) {
		console.log('请选中要重命名的文件');
		alertMessage('请选中要重命名的文件!', 'fail');
	}
}

//------------------------------右侧文件夹面点击事件
navList.onclick = function(e){
	var target = e.target;
	var current = target.dataset.id*1;
	createHtml(data,current);
}
//----------------------------------------------- 新建文件夹
var creatFlag =false;
addFilder.onclick = function (e){
	if (creatFlag) {
		console.log('请完成当前创建');
		alertMessage('请完成当前创建文件!', 'fail');
		return;
	}
	//当前正在创建文件夹 新建文件夹按钮无效！
	creatFlag =true;
	//-----在选中时 新建文件 清除选中
	check.checked = false;
	for (var i=0; i< currentData.length; i++) {
			currentData[i].checked = false;
			rightList.children[i].classList.remove('active');
			rightList.children[i].firstElementChild.classList.remove('active');
	}
	n=0;
	//----------新建
	var current = navList.lastElementChild.dataset.id*1;
	var li = document.createElement('li');
	li.className = 'list-file';
	li.id = 'maxid +1';
	li.pid = 'pid';
	var span = document.createElement('span');
	span.className = 'file-checkbox';
	span.innerHTML = '✔';
	li.appendChild(span);
	var div = document.createElement('div');
	div.className = 'file-img';
	div.id = 'maxid +1';
	div.pid = 'pid';
	li.appendChild(div);
	var div = document.createElement('div');
	div.className = 'file-name';
	var input = document.createElement('input');
	input.className = 'file-change-name';
	input.value = '';
	div.appendChild(input);
	li.appendChild(div);
	rightList.insertBefore(li,rightList.firstElementChild);
	input.focus();
	keyEvent(input);
	input.onblur = function(){
		if (input.value.trim() ==='') {
			rightList.removeChild(li);
			alertMessage('取消文件创建!', 'fail');
			creatFlag = false;
			return;
		}
		if (notCanUseName(input,currentData)) {
			console.log('文件夹重名，请修改文件夹名！');
			alertMessage('文件夹重名，请修改文件夹名!', 'fail');
			input.focus();
			input.select();
			return;
		}else{
			//根据新建文件夹的内容 生成新数据 并存在原数据中；
			var newData = {
				checked:false,
				child:[],
				id: ++num,
				name: input.value.trim(),
				pid:current,
				type: 'filder'
			}
			console.log(newData);
			var newArr = wy.getItemById(data,current).child;
			newArr.unshift(newData);
			console.log(newArr);
			createHtml(data,current);
			alertMessage('文件创建成功!', 'suc');
			creatFlag = false;
		}
	}
}
//判断是否重名
function notCanUseName(input,currentData){
	for (var i=0; i<currentData.length; i++) {
		if (input.value.trim() === currentData[i].name && input.parentNode.parentNode.dataset.id != currentData[i].id ) {
			input.focus();
			input.select();
			return true;
		}
	}
	return false;
}
	
//---------------------------------------------文件全选

check.onclick = function(){
	var checked = check.checked;
	console.log(checked);
	if (checked) {
		n = currentData.length;
	}else{
		n=0;
	}
	for (var i=0; i< currentData.length; i++) {
			currentData[i].checked = checked;
	}
	console.log(n);
	var current = navList.lastElementChild.dataset.id*1;
	rightListCreateHTML(data,current);
}




//----------------------------------------------- 删除文件夹
delFilder.onclick = function(){
	var trueNum = 0;
	for (var i=0; i< currentData.length; i++) {
		if (currentData[i].checked ) {
			trueNum ++;
		}
	}
	if (!trueNum) {
		console.log('请选择要删除的文件');
		alertMessage('请选择要删除的文件!', 'fail');
		return;
	}
	var pid = currentData[0].pid;
	for (var i=0; i< currentData.length;i++) {
			if (currentData[i].checked) {
				currentData.splice(i--,1);
			}
		}
	
	check.checked = false;
	n = 0;
	createHtml(data,pid);
	alertMessage('文件删除成功!', 'suc');
}

//-----------------------------右键新建
var menu = document.querySelector('.menu');
document.oncontextmenu = function(e){
	var H = 250;
	e.preventDefault();
	var target = e.target;
	var l = e.pageX - fq.getRect(target.offsetParent,'left');
	var t = e.pageY - fq.getRect(target.offsetParent,'top');
	if (l >= rightList.clientWidth - fq.css(menu,'width')) {
		l = l - fq.css(menu,'width') ;
	}
	if (t >= right_list.clientHeight - H) {
		var flag = true;
	}
	fq.css(menu,{left:l,top:t,display: 'block'});
	if (target.classList.contains('right_list')) {
		if (flag) {
			fq.animation(menu,{height:H,top:t-H},'backOut');
		}else{
			fq.animation(menu,{height:H},'backOut');
		}
	}
}
document.onclick = function(){
	fq.animation(menu,{height:0},200,'backIn',function(){
		fq.css(menu,{display:''});
	});
}
//-----------------------------框选文件夹
var div = document.createElement('div');
div.className = 'file-check-div';
rightList.onmousedown = function(e){
	console.log(e.buttons)
	if (creatFlag || isReNameing || e.buttons !== 1) {
		return;
	}
	e.preventDefault();
	var target = e.target;
	var x1 = e.pageX - fq.getRect(this,'left');
	var y1 = e.pageY - fq.getRect(this,'top');
	if (target.classList.contains('right_list')) {
		document.onmousemove = function(e){
			var x2 = e.pageX  - fq.getRect(rightList,'left') ;
			var y2 = e.pageY - fq.getRect(rightList,'top') ;
			//限制框选范围
			if (e.pageX > fq.getRect(rightList,'right') || e.pageX < fq.getRect(rightList,'left')) {
				x2 = fq.getRect(rightList,'width');
			}
			if (e.pageY < fq.getRect(rightList,'top') ||  e.pageY > fq.getRect(rightList,'bottom')) {
				y2 = fq.getRect(rightList,'height');
			}
			var w = Math.abs(x1-x2-2);  
			var	h = Math.abs(y2-y1);
			div.style.left = Math.min(x1,x2) + 'px';
			div.style.top = Math.min(y1,y2) + 'px';
			div.style.width = w + 'px';
			div.style.height = h + 'px';
			rightList.appendChild(div);
			//拖拽中的碰撞检测
			var moveDiv = rightList.lastElementChild;
			var rightChild = rightList.children;
			var len = rightChild.length;
			for (var i=0; i<len-1; i++) {
				if (fq.duang(moveDiv,rightChild[i])) {
					rightChild[i].classList.add('active');
					rightChild[i].firstElementChild.classList.add('active');
				}else{
					rightChild[i].classList.remove('active');
					rightChild[i].firstElementChild.classList.remove('active');
				}
			}
		}
		document.onmouseup = function(){
			if (rightList.lastElementChild && rightList.lastElementChild.classList.contains('file-check-div')) {
				rightList.removeChild(rightList.lastElementChild);
			}
			n= 0;//默认框选 之前没有选中   
			for (var i=0; i<rightList.children.length; i++) {
				if (rightList.children[i].classList.contains('active')) {
					currentData[i].checked = true;
					n++;
				}
				console.log(n);
				if (n >= rightList.children.length) {
					check.checked = true;
				}else{
					check.checked = false;
				}
			}
			document.onmouseup = document.onmousemove = null;
			e.cancelBubble = true;
			e.preventDefault();
		}
	}
}


//-------------------------------布局转换       bable-preset-se2015(代码兼容性)  webpack(自动化工具) MDN(这个学习好) 

//-----------------------------拖拽移动到
//var moveFile = document.querySelector('#move_file');
//var offsetData =[];
//var lis = rightList.getElementsByClassName('list-file');
//for (var i=0; i<lis.length; i++) {
//	offsetData.push([lis[i].offsetLeft,lis[i].offsetTop]);
//}
//console.log(offsetData);
//for (var i=0; i<offsetData.length; i++) {
//	fq.css(lis[i],{
//		margin: 0,
//		display: 'position',
//			left: offsetData[i][0],
//			top: offsetData[i][1]
//	})
//	dragMove(lis[i]);
//}
//
//
//function dragMove(obj){
//	obj.onmousedown = function(e){
//		e.preventDefault();
//		var dx = e.pageX - fq.getRect(this,'left');
//		var dy = e.pageY - fq.getRect(this, 'top');
//		document.onmousemove = function(e){
//			var target = e.target;
//			if (target.nodeName.toUpperCase() === 'LI' && target.classList.contains('list-file')) {
//				var l = e.pageX -dx - fq.getRect(obj.offsetParent,'left');
//				var t = e.pageY - dy - fq.getRect(obj.offsetParent, 'top');
//				if (l<=0) l=0;
//				if (t)
//				target.style.left = l + 'px';
//				target.style.top = t + 'px';
//			}
//		}
//		document.onmouseup = function(){
//			document.onmousmove = document.onmouseup = null;
//		}
//	}
//}
//---------------------------点击移动到
// 判断选中的个数循环时 >2 break 可以减少循环；
var moveFile = document.querySelector('#move_file ');
var moveTo = document.querySelector('#moveTo');
var btns = document.querySelectorAll('#moveTo button');
var moveToFile = document.querySelector('#moveTo .moveToFile');
var moveCurrent = 0;
var pid =0;
var coverRename = false;
// -------------------------移动到DIV   的拖拽
	var moveTitle = document.querySelector('.move_title');
	moveTitle.onmousedown = function(e){
		e.preventDefault();
		var dx = e.pageX - fq.getRect(this,'left');
		var dy = e.pageY - fq.getRect(this,'top');
		document.onmousemove = function(e){
			  var l = e.pageX - dx ;
	          var t = e.pageY - dy ;
	         moveTitle.offsetParent.style.left = l + 'px';
	         moveTitle.offsetParent.style.top = t + 'px';
		}
		 document.onmouseup = function (){
           document.onmouseup =  document.onmousemove = null;
        }
	}
moveFile.onclick = function(){
	var trueNum = 0;
	for (var i=0; i< currentData.length; i++) {
		if (currentData[i].checked ) {
			trueNum ++;
		}
	}
	if (!trueNum) {
		console.log('请选择要移动的文件');
		alertMessage('请选择要移动的文件!', 'fail');
		return;
	}

	if (moveCurrent == 0 && trueNum == data[0].child.length) {
		console.log('无法移动，重新选取移动文件');
		alertMessage('无法移动选中文件，重新选取移动文件！', 'fail');
		return
	}
	var preCurrent = 0;
	moveToFile.innerHTML = createTreeByString (data,preCurrent);
	preCurrent = navList.lastElementChild.dataset.id*1;
	moveTo.classList.add('active');
	//文件夹移动到蔗罩的点击事件
	var current = 0;
	moveToFile.onclick = function(e){
		var target = e.target;
	 	moveCurrent = current = target.dataset.id*1;
		pid = target.dataset.pid*1;
		if (target.nodeName.toUpperCase() ==='A' || 'SPAN' ) {
			var h2s = document.querySelectorAll('h2');
			for (var i=0;i<h2s.length; i++) {
				h2s[i].classList.remove('active');
			}
			target.parentNode.classList.add('active');
			pid = target.dataset.pid*1;
		}
		if (target.nodeName.toUpperCase() === 'H2' ){
			for (var i=0;i<h2s.length; i++) {
				h2s[i].classList.remove('active');
			}
			target.classList.add('active');
			pid = target.dataset.pid*1;
		}
		console.log(pid);
	}
	
	//----------------取消移动
	btns[0].onclick = function(){
		check.checked = false;
		for (var i=0; i< currentData.length; i++) {
			currentData[i].checked = false;
		}
		n=0;
		
		moveTo.classList.remove('active');
		createHtml(data,preCurrent);
		alertMessage('取消移动', 'fail');
		//消除选择项
		
		}
	//当覆盖时  是否覆盖
	var coverFlag = false;
	btns[1].onclick = function(){
		for (var i=0; i<currentData.length; i++) {
			console.log(pid,currentData[i].pid,moveCurrent,currentData[i].id)
			if (currentData[i].checked) {
				 if (currentData[i].pid == moveCurrent /*|| (pid&& pid == currentData[i].pid) ||  moveCurrent == currentData[i].id || (Number.isNaN (pid)  && 0 == currentData[i].pid )*/ ) {
					console.log('不能移动到该文件夹');
					alertMessage('不能移动到该文件夹!', 'fail');
					return;
				}
			}
			
		}
		
		var moveToData = wy.getItemById(data,current).child;//要移动到文件夹中的数据
		for (var i=0; i<moveToData.length; i++) {
			for (var j=0; j<currentData.length; j++) {
				if (currentData[j].checked) {
					if (currentData[j].name === moveToData[i].name) {
						coverSure.classList.add('active');
						coverFlag = true;
					}
				}
			}
		}
		if (!coverFlag) {  //没有重名文件时候执行
			for (var j=0; j<currentData.length; j++) {   //currentData  要移动的文件夹中的数据 .checked true为要移动的文件
				if (currentData[j].checked) {
					currentData[j].checked = false;   
					currentData[j].pid = current;
					moveToData.unshift(currentData.splice(j--,1)[0]);
				}
			}
			check.checked = false;
			n=0;
			moveTo.classList.remove('active');
			createHtml(data,preCurrent);
		}else{
			coverYes.onclick = Cover;
			coverNo.onclick = NoCover;
		}
		function Cover(){
				console.log(moveToData,currentData)
				for (var i=0; i<moveToData.length; i++) {
					for (var j=0; j<currentData.length; j++) {
						if (currentData[j].checked) {
							currentData[j].pid = current;
							console.log(currentData[j].checked);
							console.log(moveToData[i].name,currentData[j].name);
							if (moveToData[i].name === currentData[j].name  ) {
									currentData[j].checked = false;
								if(coverRename){
									currentData[j].name = moveToData[i].name +'复制' ;
									moveToData.unshift(currentData.splice(j--,1)[0]);
									console.log(data);
									coverRename = false;
								}else{
									currentData[j].name = moveToData[i].name ;
									moveToData.splice(i--,1);
									moveToData.unshift(currentData.splice(j--,1)[0]);
									console.log(data);
								}
								
							}
						}
					}
				}
				console.log(moveToData[0].name);
				for (var k=1; k<moveToData.length; k++) {
					if (moveToData[k-1].name ===  moveToData[k].name) {
						moveToData[k-1].name = moveToData[k-1].name + '(复制)';
					}
				}
				check.checked = false;
				n=0;
				moveTo.classList.remove('active');
				createHtml(data,preCurrent);
				coverSure.classList.remove('active');
				coverFlag = false;
				console.log(data);
				createHtml(data,preCurrent);
			};
		function NoCover(){
			console.log(moveToData,currentData)
			for (var i=0; i<moveToData.length; i++) {
				for (var j=0; j<currentData.length; j++) {
					if (currentData[j].checked) {
						currentData[j].pid = current;
						if (moveToData[i].name === currentData[j].name  ) {
							renameSure.classList.add('active');
						}
					}
				}
			}
			coverSure.classList.add('active');
		}
			//取消重命名 默认为覆盖不命名
		renameNo.onclick = function(){
			coverRename = true;
			Cover();
			renameSure.classList.remove('active');
			
		};
		//命名  移动后理解命名
		renameYes.onclick = function(){
			isReNameing = true;
			coverSure.classList.remove('active');
			renameSure.classList.remove('active');
			for (var j=0; j<currentData.length; j++) {   //currentData  要移动的文件夹中的数据 .checked true为要移动的文件
				if (currentData[j].checked) {
					currentData[j].checked = false;   
					currentData[j].pid = current;
					moveToData.unshift(currentData.splice(j--,1)[0]);
				}
			}
			check.checked = false;
			n=0;
			moveTo.classList.remove('active');
			createHtml(data,moveCurrent);
			var target = rightList.children[0].lastElementChild.firstElementChild;
			target.nextElementSibling.classList.toggle('show');
			target.nextElementSibling.focus();
			target.nextElementSibling.select();
			target.classList.toggle('show');
			var input = target.nextElementSibling;
			keyEvent(input);
			current = target.parentNode.parentNode.dataset.id*1;
			var obj = wy.getItemById(data,current);
			console.log(obj);
			target.nextElementSibling.onblur = function(){
				if (notCanUseName(target.nextElementSibling, wy.getChildrenById(data,obj.pid))) {
					console.log('文件夹重名');
					alertMessage('文件夹重名!', 'fail');
					return;
				}
				obj.name =target.nextElementSibling.value.trim()? target.nextElementSibling.value.trim() : target.innerHTML;
				console.log(obj);
				current = obj.pid;
				createHtml(data,current);
				alertMessage('文件重命名成功!', 'suc');
				isReNameing = false;
			}
		}
	}
}	
//----------------------------按字母顺序排序  时间排序用id
//在生成结构前 data.sort() 对数据进行排序

//----------------------------提示框
// 提示框
function alertMessage(val, type){
  var tip = document.querySelector('.create-ok');
  if(tip.move) return;
  tip.innerHTML = val;
  tip.classList.add(type);
  fq.animation(tip, {top: 14}, 300, function (){
    setTimeout(() => {
      fq.animation(this, {top: -70}, 100, function (){
        this.classList.remove(type);
      });
    }, 1000);
  });
}

//--------------------------键盘按回车input失去焦点
function keyEvent(input){
	window.onkeydown = function(e){
		if (e.keyCode === 13) {
			input.blur();
		}
	}
}
keyEvent();