var data = [
		{
			name: '根目录',
			id: 0,
			type: 'filder',
			checked: false,
			child: [
				{
					name: '我的文件夹',
					id: 1,
					pid: 0,
					type: 'filder',
					checked: false,
					child: [
						{
							name: '我的小说',
							id: 2,
							pid: 1,
							type: 'filder',
							checked: false,
						},
						{  
							name: '我的电影',
							id: 3,
							pid: 1,
							type: 'filder',
							checked: false,
							child: [
								{
									name: '棒子电影',
									id: 4,
									pid: 3,
									type: 'filder',
									checked: false,
								},
								{
									name: '欧美电影',
									id: 5,
									pid: 3,
									type: 'filder',
									checked: false,
									child: [
										{
											name: '越狱第一部',
											id: 6,
											pid: 5,
											type: 'filder',
											checked: false
										},
										{
											name: '越狱第二部',
											id: 7,
											pid: 5,
											type: 'filder',
											checked: false
										},
										{
											name: '越狱第三部',
											id: 8,
											pid: 5,
											type: 'filder',
											checked: false
										}
									]
								},
								{
									name: '日本动画片',
									id: 9,
									pid: 3,
									type: 'filder',
									checked: false,
									child: [
										{
											name: '火影',
											id: 10,
											pid: 9,
											type: 'filder',
											checked: false
										},
										{
											name: '海贼王',
											id: 11,
											pid: 9,
											type: 'filder',
											checked: false
										},
										{
											name: '死神来了',
											id: 12,
											pid: 9,
											type: 'filder',
											checked: false
										}
									]
								}
							]
						},
						{
							name: 'JS文件夹',
							id: 13,
							pid: 1,
							type: 'filder',
							checked: false,
							child: [
								{
									name: 'HTML文件夹',
									id: 14,
									pid: 13,
									type: 'filder',
									checked: false
								},
								{
									name: 'JS文件夹',
									id: 15,
									pid: 13,
									type: 'filder',
									checked: false,
									child: [
										{
											name: 'ECMAScript',
											id: 16,
											pid: 15,
											type: 'filder',
											checked: false
										},
										{
											name: 'DOM',
											id: 17,
											pid: 15,
											type: 'filder',
											checked: false
										},
										{
											name: 'BOM',
											id: 18,
											pid: 15,
											type: 'filder',
											checked: false
										}
									]
								}
							]
						}
					]
				},{
					name: '临时文件夹',
					id: 19,
					pid: 0,
					type: 'filder',
					checked: false,
					child: [
						{
							name: '工作',
							id: 20,
							pid: 19,
							type: 'filder',
							checked: false
						},
						{
							name: '学习',
							id: 21,
							pid: 19,
							type: 'filder',
							checked: false
						},
						{
							name: '下载',
							id: 22,
							pid: 19,
							type: 'filder',
							checked: false,
							child: [
								{
									name: '视频',
									id: 23,
									pid: 22,
									type: 'filder',
									checked: false
								},
								{
									name: '音乐',
									id: 24,
									pid: 22,
									type: 'filder',
									checked: false
								},
							]
						}
					]
				}
			]
		}
	];
////=====================================
//		var  wy= {};
//		//获取到一组数据data中指定的id的对应的数据	
//		wy.getDataById = function (data,id) {
//			var item = null;
//			for (var i=0; i<data.length; i++) {
//				if (data[i].id === id) {
//					item = data[i];
//					break;
//				}
//				if (!item && data[i].child) {
//					item = this.getDataById(data[i].child,id);
//					if (item) {
//						break;
//					}
//				}
//			}
//			return item;
//		}
////		console.log(getDataById(data,17));
//		
//		
//		//获取到一组数据data中指定的id的所有子集	
//		wy.getChildById = function  (data,id) {
//			var obj = [];
//			var arr = [];
//			if (getDataById(data,id).child) {
//				obj = this.getDataById(data,id).child;
//			}
//			
//			for (var i=0; i<obj.length; i++) {
//				arr.push(obj[i]);
//			}
//			return arr;
//		}
//		console.log(getChildById(data,3));
//		function getChildById(data,id){
//			var targetData = this.getDataById(data,id);
//			if (targetData && targetData.child) {
//				return targetData.child;
//			}
//		};
//		
//		//通过指定的id获取到自己以及自己所有的父级
//		wy.getParentsById = function (data,id) {
//			var items = [];
//			var obj=this.getDataById(data,id);
//			items.push(obj);
//			items.concat(getParentsById())
//			return items;
//		}