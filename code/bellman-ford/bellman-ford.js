/* 单源最短路径：给定一个图G和源节点s，求s到图中任意结点的最短路径
 * 
 * 单源最短路径算法最终会形成一棵根结点为s的树(没有环形)，称为前驱子图，对于前驱子图，边的个数比顶点个数少1
 * 
 * bellman-ford算法思路:
 * bellman-ford算法的实现基于一个性质:
 * 路径松弛性质-设s到v为一条最短路径，如果s到v上的所有边都按s到v的顺序依次得到了松弛，则v.d为s到v的最小权重。
 * 由于前驱子图中，对任意点，其路径上的边数最大为V|-1，在bellman-ford算法中会对所有边进行|V|-1次松弛，
 * 在对任意路径上的第k条边进行第k次松弛时，可以保证前面的边依次得到了松弛，因此第k条边上的顶点的d属性为最小权重。
 * 最终保证了第|v|个顶点的d属性为最小权重
 * 
 * 
 *  * */
	
function Edge(u,v,w){
	this.edge=[u,v];
	this.weight=w;
}

function Node(value){
	this.value=value;
	this.connect=[];
}

let G={
	V:[],
	E:[]
}

function bellmanFord(G,w,s){
	initializeSingleSource(G,s);
	for(let i=0;i<G.V.length-1;i++){
		for(let e of G.E){
			relax(G,e.edge[0],e.edge[1],w);
			relax(G,e.edge[1],e.edge[0],w);
		}
	}
	for(let e of G.E){
		let u=e.edge[0];
		let v=e.edge[1];
		if(v.d>u.d+w(G,u,v)){
			return false;
		}
	}
	return true;
}

/*初始化*/

function initializeSingleSource(G,s){
	for(let v of G.V){
		v.pre=null;
		v.d=Number.MAX_VALUE;
	}
	s.d=0;
}

/*松弛操作*/

function relax(G,u,v,w){
	if(v.d>u.d+w(G,u,v)){
		v.d=u.d+w(G,u,v);
		v.pre=u;
	}
}

/*打印各点的最短路径*/

function printPath(G){
	for(let v of G.V){
		console.log(v.d);
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

let a=new Node("a");
let b=new Node("b");
let c=new Node("c");
let d=new Node("d");
let e=new Node("e");
let f=new Node("f");
let g=new Node("g");
let h=new Node("h");
let i=new Node("i");

a.connect.push(b,h);
b.connect.push(a,h,c);
c.connect.push(b,d,f,i);
d.connect.push(c,e,f);
e.connect.push(d,f);
f.connect.push(c,d,e,g);
g.connect.push(f,h,i);
h.connect.push(a,b,i);
i.connect.push(c,g,h);


function w(G,u,v){
	for(let e of G.E){
		if((e.edge[0]==u&&e.edge[1]==v)||(e.edge[0]==v&&e.edge[1]==u)){
			return e.weight;
		}
	}
}

let e1=new Edge(a,b,4);
let e2=new Edge(b,c,8);
let e3=new Edge(c,d,7);
let e4=new Edge(a,h,8);
let e5=new Edge(b,h,11);
let e6=new Edge(c,f,4);
let e7=new Edge(c,i,2);
let e8=new Edge(d,e,9);
let e9=new Edge(d,f,14);
let e10=new Edge(e,f,10);
let e11=new Edge(f,g,2);
let e12=new Edge(g,h,1);
let e13=new Edge(g,i,6);
let e14=new Edge(h,i,7);

G.V.push(a,b,c,d,e,f,g,h,i);
G.E.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14);

bellmanFord(G,w,a);
printPath(G);
