function createBread (data) {
	var str = '';
	for (var i=0; i<data.length; i++) {
	str += `<li class="option_item"><a href="javaScript:;" data-id="${data[i].id}" data-pid="${data[i].pid}" class="option">${data[i].name}</a></li>`
	}
	return str;
}