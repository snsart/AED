/*强连通分量
 *求解图G的强连通分量依据的是下面的性质:
 * 1. 图G的强连通分量和图G转置图的强连通分量是一样的
 * 2. 对于两个不同的强连通分量A,B，在G的转置图中如果存在一条边从A指向B，则A中各结点的最晚完成时间一定快于B中各结点的最晚完成时间。即在第一次深度优先遍历时，A中各结点会先完成。
 * 基于上述的性质2：为了分离A和B，在深度优先搜索转置图中的A和B时，要先搜索B，给B中各结点先涂色，那么在接下来搜索A时将不会搜索到B中的结点。为了保证先搜索B中各结点，要先对转置图进行拓扑排序。
 * */


/*
 * 求图G的强连通分量，返回一个数组，数组中包含各个强连通分量
 */

function stronglyConnectedComponents(G){
	console.log(G.V);
	depthFirstSearch(G);
	console.log(G.V);
	computerT(G);
	G.V.sort(compare);
	let time=G.V[0].f;
	let arrT=depthFirstSearchT(G);
	return arrT;
}

function computerT(G){
	for(let v of G.V){
		v.connectT=[];
	}
	for(let v of G.V){
		for(let vc of v.connect){
			vc.connectT.push(v);
		}
	}
}

function depthFirstSearch(G){
	for(let v of G.V){
		v.color="white";
	}
	let time=0;
	for(let v of G.V){
		if(v.color=="white"){
			time=dfsVisit(v,time);
		}
	}
}

function dfsVisit(v,time){
	time++;
	v.d=time;
	v.color="gray";
	for(let u of v.connect){
		if(u.color=="white"){
			u.pre=v;
			time=dfsVisit(u,time);
		}
	}
	time++;
	v.f=time;
	v.color="black";
	return time;
}

/*深度搜索G的转置图，并返回强连通分量*/

function depthFirstSearchT(G){
	let arrT=[];
	for(let v of G.V){
		v.color="white";
	}
	for(let v of G.V){
		if(v.color=="white"){
			//v为每个强连通分量的根结点，即每遇到一个白色结点，其后代就会形成一个强连通分量
			iarrT=[];
			iarrT=dfsVisitT(v,iarrT);
			arrT.push(iarrT);
		}
	}
	return arrT;
}

function dfsVisitT(v,iarrT){
	v.color="gray";
	for(let u of v.connectT){
		if(u.color=="white"){
			iarrT=dfsVisitT(u,iarrT);
		}
	}
	v.color="black";
	iarrT.push(v);
	return iarrT;
}


function compare(u,v){
	return v.f-u.f;
}

function Node(key){
	this.key=key;
	this.connect=[];
}

/*测试-----*/

let G={
	V:[]
}
let n1=new Node(1);
let n2=new Node(2);
let n3=new Node(3);
let n4=new Node(4);
let n5=new Node(5);
let n6=new Node(6);
let n7=new Node(7);
let n8=new Node(8);

n1.connect.push(n2);
n2.connect.push(n3,n5,n6);
n3.connect.push(n4,n7);
n4.connect.push(n3,n8);
n5.connect.push(n1,n6);
n6.connect.push(n7);
n7.connect.push(n6,n8);
n8.connect.push(n8);

G.V.push(n1,n2,n3,n4,n5,n6,n7,n8);
let arr=stronglyConnectedComponents(G);
console.log(arr);
//[[3,5,1],[4,3],[6,7],[8]];
