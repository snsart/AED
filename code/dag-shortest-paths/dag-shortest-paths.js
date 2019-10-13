/* 有向无环图中的单源最短路径问题
 * 思路：先对各顶点进行拓扑排序，然后依次从图中取出各顶点，对连接该顶点的边进行松弛操作。
 * 由于各顶点是排好序的，因此在对最短路径上的第i条边进行松弛操作时保证了前面的边都依次进行了松弛操作。
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
	return time;
}

function Node(value){
	this.value=value;
	this.connect=[];
}

function Edge(u,v,w){
	this.edge=[u,v];
	this.weight=w;
}

function dagShortestPaths(G,w,s){
	G.V.sort(function(a,b){
		return b.f-a.f;
	});
	
	initializeSingleSource(G,s);
	for(let u of G.V){
		for(let v of u.connect){
			relax(G,u,v,w);
		}
	}
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

let G={
	V:[],
	E:[]
}
let r=new Node("r");
let s=new Node("s");
let t=new Node("t");
let x=new Node("x");
let y=new Node("y");
let z=new Node("z");

r.connect.push(s,t);
s.connect.push(t,x);
t.connect.push(x,y,x);
x.connect.push(y,z);
y.connect.push(z);

function w(G,u,v){
	for(let e of G.E){
		if((e.edge[0]==u&&e.edge[1]==v)||(e.edge[0]==v&&e.edge[1]==u)){
			return e.weight;
		}
	}
}


let e1=new Edge(r,s,5);
let e2=new Edge(r,t,3);
let e3=new Edge(s,t,2);
let e4=new Edge(s,x,6);
let e5=new Edge(t,x,7);
let e6=new Edge(t,y,4);
let e7=new Edge(t,z,2);
let e8=new Edge(x,y,-1);
let e9=new Edge(x,z,1);
let e10=new Edge(y,z,-2);

G.V.push(r,s,t,x,y,z);
G.E.push(e1,e2,e3,e4,e5,e6,e7,e8,e9,e10);

depthFirstSearch(G);
dagShortestPaths(G,w,s);
printPath(G);