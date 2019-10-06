/*拓扑排序
 * 只能对有向无环图进行拓扑排序。
 * 拓扑排序是G中所有结点的一种线性次序，该次序满足如下条件：如果图G包含边(u,v)，则结点u在拓扑排序中处于v的前面。
 * 方法：在深度优先搜索中按完成时间从大到小排序，即完成时间越晚的越靠近前面。
 * 深度优先搜索中每完成一个就插入列表的最前面，最后形成的列表满足拓扑排序。
 * */
	
function topologicalSort(G){
	let topList=[];
	for(let u of G.V){
		u.color="white";
		u.pre=null;
	}
	let time=0;
	for(let u of G.V){
		if(u.color=="white"){
			[topList,time]=dfsVisit(G,u,topList,time);
		}
	}
	return topList;
}

function dfsVisit(G,u,topList,time){
	time++;
	u.d=time;
	u.color="gray";
	for(let v of u.connect){
		if(v.color=="white"){
			v.pre=u;
			[topList,time]=dfsVisit(G,v,topList,time);
		}
	}
	u.color="black";
	time++;
	u.f=time;
	topList.unshift(u);
	console.log("("+u.d+"/"+u.f+")");
	return [topList,time];
}

function Node(key){
	this.key=key;
	this.connect=[];
}

/*测试-----*/

/*图G描述了一个人的穿衣依赖关系，比如先穿袜子再穿鞋，通过拓扑排序求穿衣顺序*/

let G={
	V:[]
}
let n1=new Node("内裤");
let n2=new Node("袜子");
let n3=new Node("裤子");
let n4=new Node("鞋");
let n5=new Node("手表");
let n6=new Node("腰带");
let n7=new Node("衬衣");
let n8=new Node("领带");
let n9=new Node("夹克");

n1.connect.push(n3,n4);
n2.connect.push(n4);
n3.connect.push(n4,n6);
n6.connect.push(n9);
n7.connect.push(n6,n8);
n8.connect.push(n9);

G.V.push(n1,n2,n3,n4,n5,n6,n7,n8,n9);

let topList=topologicalSort(G);
for(let n of topList){
	console.log(n.key);
}
//衬衣 领带 手表 袜子 内裤 裤子 腰带 夹克 鞋