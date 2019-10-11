/*最小生成树：
 * 
 * 给定一个无向连通图，图的每条边都有一个权重。在图中找一个边的集合，这些边能把图中所有点连接起来，并且所有边的权重之和最小。这些边和所连接的点形成了一棵树，称为最小生成树。
 * 
 * prim算法
 * Prim算法的思路：
 * 初始状态任选一个结点作为最小生成树的根结点
 * 然后从其他剩余的结点中选择和最小生成树连接的权重最小的结点加入最小生成树
 * 重复上面的操作，直到图中没有剩余结点
 * 可以使用最小优先队列来存储所有不在最小生成树中的结点，初始状态所有结点的key值为Number.MAX_VALUE
 * 
 * prim使用了最小优先队列的方法：
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

let G={
	V:[],
	E:[]
}

function mstPrim(G,w,r){
	let Q=[...G.V]
	for(let n of Q){
		n.key=Number.MAX_VALUE;
		n.pre=null;
	}
	r.key=0;
	buildMinHeap(Q);
	while(Q.heapsize!=0){
		let u=heapExtractMin(Q);
		//把u加入最小生成树，并且更新Q中与u连接的所有结点的优先级
		for(let v of u.connect){
			if(Q.indexOf(v)!=-1&&Q.indexOf(v)<Q.heapsize&&w(G,u,v)<v.key){
				v.pre=u;//(v,v,pre)形成了最小生成树中的一条边
				heapDecreaseKey(Q,Q.indexOf(v),w(G,u,v));
			}
		}
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

mstPrim(G,w,a);

for(let n of G.V){
	if(n==a){
		continue;
	}
	console.log(w(G,n,n.pre));
}
//4,2,7,9,4,2,8,7