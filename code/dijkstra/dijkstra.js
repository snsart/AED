/* 
 * dijkstra算法
 * dijkstra算法求解单源最短路径的思路：
 * dijkstra采用贪心算法求解，初始状态定义一个空集合S用来存储已求出的最短路径的点，然后用一个最小优先队列维护剩余的点
 * 在循环中每次都从优先队列中取出一个点u加入S，然后对跟u连接的点进行松弛操作
 * 
 * 在dijkstra中隐含的一个事实：最小优先队列中键值最小的点，其键值代表的路径大小为最短路径的值。
 * 
 * 最小优先队列的方法：
 * buildMinHeap(A)建立最小堆
 * heapMinMum(A)返回A中具有最小键值的元素
 * heapExtractMin(A)去掉并返回A中具有最小键值的元素
 * heapDecreaseKey(A,i,key)将A中第i个元素的关键字减少到key,假设key不大于原关键字值
 * minHeapInsert(A,x)将元素x插入A中
 * */
	
function Edge(u,v,w){
	this.edge=[u,v];
	this.weight=w;
}

function Node(value){
	this.value=value;
	this.connect=[];
}


function dijkstra(G,w,s){
	initalizeSingleSource(G,s);
	let S=[];
	let Q=[...G.V];
	console.log(Q);
	buildMinHeap(Q);
	
	while(Q.heapsize>0){
		
		let u=heapExtractMin(Q);
		S.push(u);
		for(let v of u.connect){
			relax(G,u,v,w);
		}
	}
}

function initalizeSingleSource(G,s){
	for(let v of G.V){
		v.key=Number.MAX_VALUE;
		v.pre=null;
	}
	s.key=0;
}

function relax(G,u,v,w){
	if(v.key>u.key+w(G,u,v)){
		heapDecreaseKey(G.V,G.V.indexOf(v),u.key+w(G,u,v));
		v.pre=u;
	}
}

/*打印各点的最短路径*/

function printPath(G){
	for(let v of G.V){
		console.log(v.key);
		console.log(v.value);
		let pre=v.pre;
		while(pre){
			console.log(pre.value);
			pre=pre.pre;
		}
		console.log("-----");
	}
}


/*测试-----*/

let G={
	V:[],
	E:[]
}

let s=new Node("s");
let t=new Node("t");
let x=new Node("x");
let y=new Node("y");
let z=new Node("z");

s.connect.push(t,y);
t.connect.push(x,y);
x.connect.push(z);
y.connect.push(t,x,z);
z.connect.push(x,s);

function w(G,u,v){
	for(let e of G.E){
		if(e.edge[0]==u&&e.edge[1]==v){
			return e.weight;
		}
	}
}


let e1=new Edge(s,t,10);
let e2=new Edge(s,y,5);
let e3=new Edge(t,x,1);
let e4=new Edge(t,y,2);
let e5=new Edge(x,z,4);
let e6=new Edge(y,t,3);
let e7=new Edge(y,x,9);
let e8=new Edge(y,z,2);
let e9=new Edge(z,x,6);
let e10=new Edge(z,s,7);

G.V.push(s,t,x,y,z);
G.E.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10);

dijkstra(G,w,s)
printPath(G);