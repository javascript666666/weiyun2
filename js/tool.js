//微云函数库
			var wy = {};
			//根据id找到指定的数据
			wy.getItemById = function (data,id){
				var item = null;
				for (var i=0;i<data.length;i++) {
					if (data[i].id ===id) {
						item = data[i];
						break;
					}
					if (!item && data[i].child) {
						item = this.getItemById(data[i].child,id);
						if (item) {
							break;
						}
					}
				}
				return item;
			}
			// 通过指定的id获取到自己以及自己所有的父级
			wy.getParentsById = function(data, id){
			  var items = [];
			  var current = this.getItemById(data, id);
			  if(current){
			    items.push(current);
			    items = items.concat(this.getParentsById(data, current.pid));
			  }
//			  console.log(items);
			  return items;
			};
			//根据指定的层级pid找到数据的所有子集
			wy.getChildrenById = function(data,id){
				if (id === 0) {
					return data;
				}
				var parent = this.getItemById(data,id);
				if (parent) {
					return parent.child;
				}
				return undefined;
			}