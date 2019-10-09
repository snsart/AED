/*最小生成树：
 * 
 * 给定一个无向连通图，图的每条边都有一个权重。在图中找一个边的集合，这些边能把图中所有点连接起来，并且所有边的权重之和最小。这些边和所连接的点形成了一棵树，称为最小生成树。
 * 
 * Kruskal算法
 * kruskal算法的思路：初始状态把每个顶点构建为一棵树，所有的顶点所形成的树构成了一个森林。
 * 然后按权重从小到大的顺序遍历每条边，如果边连接的两个顶点分属不同的树，则将两个树进行合并，并将当前边加入最小生成树。
 * 当把所有边遍历完之后，最小生成树也形成了。
 * Kurskal算法每次都选择权重最小的边加入森林，因此属于贪心算法。
 * */
	
function Edge(u,v,w){
	this.edge=[u,v];
	this.weight=w;
}

function Node(key){
	this.key=key;
	this.connect=[];
}

let G={
	V:[],
	E:[]
}

function mstKruskal(G){
	let A=[];
	let trees=new Set();
	for(let n of G.V){
		trees.add(new Set([n]));
	}
	G.E.sort((a,b)=>{return a.weight-b.weight});
	
	for(let e of G.E){
		let u=e.edge[0];
		let v=e.edge[1];
		let set1=findSet(trees,u);
		let set2=findSet(trees,v);
		if(set1!=set2){
			let unitSet=new Set([...set1,...set2]);
			trees.delete(set1);
			trees.delete(set2);
			trees.add(unitSet);
			A.push(e);
		}
	}
	return A;
}

function findSet(trees,n){
	for(let set of trees){
		if(set.has(n)){
			return set;
		}
	}
	return null;
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

let A=mstKruskal(G);
console.log(A);
