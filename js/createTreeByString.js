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
