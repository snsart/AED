/* 广度优先搜索
 * 广度优先搜索能够找到从给定源结点s到所有可以到达的结点之间的距离，并且这个距离为s到此结点的最短距离。
 * 广度优先搜索在概念上将每个结点涂上白色、灰色或黑色。在一开始所有结点都为白色，在搜索过程中这些结点可能会变成灰色或黑色，凡是灰色和黑色的结点都是已发现的结点。
 * */

/*邻接链表表示图的广度优先搜索*/

function breadthFirstSearch(G,s){
	for(let u of G.V){
		u.color="white";
		u.d=Number.MAX_VALUE;
		u.pre=null;
	}
	s.color="gray";
	s.d=0;
	s.pre=null;
	let Q=[];
	Q.push(s);
	while(Q.length>0){
		let u=Q.shift();
		u.connect.forEach((v)=>{
			if(v.color=="white"){
				v.color="gray";
				v.d=u.d+1;
				v.pre=u;
				Q.push(v);
			}
		})
		u.color="black";
	}
}


/*打印从源结点s到结点v的一条最短路径上 的所有结点*/

function printPath(G,s,v){
	if(v==s){
		console.log(s.key);
	}else if(v.pre==null){
		console.log("路径不存在");
	}else {
		printPath(G,s,v.pre);
		console.log(v.key);
	}
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

n1.connect.push(n2,n5);
n2.connect.push(n1,n5,n3,n4);
n3.connect.push(n2,n4);
n4.connect.push(n2,n5,n3);
n5.connect.push(n4,n1,n2);

G.V.push(n1,n2,n3,n4,n5);

breadthFirstSearch(G,n1);

console.log(n4.d);

printPath(G,n1,n3);

