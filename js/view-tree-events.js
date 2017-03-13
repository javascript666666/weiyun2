//左侧树形菜单添加点击事件
function menuList(ul){
	var children = ul.children;
	if (children[0].firstElementChild.onclick) {
		return;
	}
	for (var i=0; i<children.length; i++) {
		var h2 = children[i].firstElementChild;
		h2.onclick = function (){
			console.log(this.dataset);
			var nextSibling = this.nextElementSibling;
			var parentParent = this.parentNode.parentNode;
			var uls = parentParent.getElementsByTagName('ul');
		if(nextSibling){
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