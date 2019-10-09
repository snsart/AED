/*深度优先搜索
 * 深度优先搜索总是对最近才发现的变v的出发边进行探索，直到该结点的所有出发边都被发现为止。一旦结点v的所有出发边都被发现，搜索则回溯到v的前驱结点，来搜索该前驱结点的出发边。
 * 深度优先搜索完成后，每个结点会有一个指针指向其前驱结点，并会为每个结点打一个发现时间和完成时间的时间戳，这些时间戳提供了关于图结构的很多信息：
 * 1. 结点v是结点u的后代<=>结点v在结点u为灰色的时间段里被发现
 * 2. 发现时间和完成时间具有括号化结构
 * 
 * 深度优先的应用-深度优先搜索常常作为另一个算法里的子程序，应用有：
 * 1. 拓扑排序
 * 2. 强连通分量
 * */
	
function depthFirstSearch(G){
	for(let u of G.V){
		u.color="white";
		u.pre=null;
	}
	let time=0;
	for(let u of G.V){
		if(u.color=="white"){
			time=dfsVisit(G,u,time);
		}
	}
}

function dfsVisit(G,u,time){
	time++;
	u.d=time;
	u.color="gray";
	for(let v of u.connect){
		if(v.color=="white"){
			v.pre=u;
			time=dfsVisit(G,v,time);
		}
	}
	u.color="black";
	time++;
	u.f=time;
	console.log("("+u.d+"/"+u.f+")");
	return time;
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
let n6=new Node(5);

n1.connect.push(n2,n4);
n2.connect.push(n5);
n3.connect.push(n5,n6);
n4.connect.push(n2);
n5.connect.push(n4);
n6.connect.push(n6);

G.V.push(n1,n2,n3,n4,n5,n6);

depthFirstSearch(G);
