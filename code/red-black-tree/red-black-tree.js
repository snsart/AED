/*
 * 红黑树的性质:
 * 1. 每个结点要么是红色，要么是黑色。
 * 2.根结点是黑色。
 * 3.每个叶子结点是黑色。
 * 4.如果一个结点是红色的，则它的两个子结点都是黑色的。
 * 5.对每个结点，从该结点到其所有后代叶结点的简单路径上，均包含相同数目的黑色结点。
 * */

let Node=function(key){
	this.key=key;
	this.color="red";
	this.left=null;
	this.right=null;
	this.p=null;
}

let nullNode={
	color:"black",
	key:-1,
	left:null,
	right:null,
	p:null
}

let Tree=function(){
	this.root=nullNode;
	this.nil=nullNode;
}

/*
 * 中序遍历树
 */

function inorderTreeWalk(n){
	if(n!=nullNode){
		inorderTreeWalk(n.left);
		console.log(n.key);
		inorderTreeWalk(n.right);
	}
}

/*查找以x为根的树的最小值*/

function treeMinMum(x){
	let min=x;
	x=x.left;
	while(x!=nullNode){
		min=x;
		x=x.left;
	}
	return min;
}



/*树的左旋,假设x的右子树不为nullNode*/

function leftRotate(tree,x){
	let y=x.right;
	x.right=y.left;
	if(y.left!=nullNode){
		y.left.p=x;
	}
	y.p=x.p;
	if(x.p==nullNode){
		tree.root=y;
	}else if(x==x.p.left){
		x.p.left=y;
	}else{
		x.p.right=y;
	}
	
	y.left=x;
	x.p=y;
}


/*树的右旋,假设y的左子树不为nullNode*/

function rightRotate(tree,y){
	let x=y.left;
	y.left=x.right;
	if(x.right!=nullNode){
		x.right.p=y;
	}
	x.p=y.p;
	if(y.p==nullNode){
		tree.root=x;
	}else if(y==y.p.left){
		y.p.left=x;
	}else{
		y.p.right=x;
	}
	
	x.right=y;
	y.p=x;
}

/*插入*/
function rbInsert(tree,z){
	let y=tree.nil;
	x=tree.root;
	while(x!=tree.nil){
		y=x;
		if(z.key<x.key){
			x=x.left;
		}else{
			x=x.right;
		}
	}
	z.p=y;
	if(y==tree.nil){
		tree.root=z;
	}else if(z.key<y.key){
		y.left=z;
	}else{
		y.right=z;
	}
	z.left=tree.nil;
	z.right=tree.nil;
	z.color="red";
	rbInsertFixup(tree,z);
}

/*插入之后维护红黑树的性质不变*/

function rbInsertFixup(tree,z){
	while(z.p.color=="red"){
		if(z.p==z.p.p.left){
			let y=z.p.p.right;//获取z的叔结点
			if(y.color=="red"){
				z.p.color="black";
				y.color="black";
				z.p.p.color="red";
				z=z.p.p;
			}else if(z==z.p.right){
				z=z.p;
				leftRotate(tree,z);
			}else{
				z.p.color="black";
				z.p.p.color="red";
				rightRotate(tree,z.p.p);
			}
		}else{
			let y=z.p.p.left;
			if(y.color=="red"){
				z.p.color="black";
				y.color="black";
				z.p.p.color="red";
				z=z.p.p;
			}else if(z==z.p.left){
				z=z.p;
				rightRotate(tree,z);
			}else{
				z.p.color="black";
				z.p.p.color="red";
				leftRotate(tree,z.p.p);
			}
		}
	}
	tree.root.color="black";
}


/*删除*/

/*移植*/
function rbTransplant(tree,u,v){
	if(u.p==tree.nil){
		tree.root=v;
	}else if(u==u.p.left){
		u.p.left=v;
	}else{
		u.p.right=v;
	}
	v.p=u.p;
}

/*删除*/
function rbDelete(tree,z){
	let y=z,x;
	let y_original_color=y.color;
	if(z.left==tree.nil){
		x=z.right;
		rbTransplant(tree,z,z.right);
	}else if(z.right==tree.nil){
		x=z.left;
		rbTransplant(tree,z,z.left);
	}else{
		y=treeMinMum(z.right);
		x=y.right;
		y_original_color=y.color;
		if(y.p==z){
			x.p=y;
		}else{
			rbTransplant(tree,y,y.right);
			y.right=z.right;
			y.right.p=y;
		}
		rbTransplant(tree,z,y);
		y.left=z.left;
		y.left.p=y;
		y.color=z.color;
	}
	if(y_original_color=="black"){
		rbDeleteFixup(tree,x);	
	}
}

/*
 * 删除后维护红黑树的性质:
 * 在x上累加一个black结点,然后分四种情况讨论,前三种情况可通过不断变化转为第4种情况，第四种情况可直接处理后退出循环
 * 1. x的兄弟结点w为红色
 * 2. x的兄弟结点w为黑色,并且w的两个孩子都为黑色
 * 3. x的兄弟结点w为黑色,并且w的右孩子为黑色
 * 4. x的兄弟结点w为黑色,并且w的右孩子为红色
 */

function rbDeleteFixup(tree,x){
	while(x!=tree.root&&x.color=="black"){
		if(x==x.p.left){
			let w=x.p.right;
			if(w.color=="red"){
				w.color="black";
				x.p.color="red";
				leftRotate(tree,x.p);
				w=x.p.right;
			}
			if(w.left.color=="black"&&w.right.color=="black"){
				w.color="red";
				x=x.p;
			}else if(w.right.color=="black"){
				w.left.color="black";
				w.color="red";
				rightRotate(tree,w);
				w=x.p.right;
			}else{
				w.color=x.p.color;
				x.p.color="black";
				w.right.color="black";
				leftRotate(tree,x.p);
				x=tree.root;
			}
		}else{
			let w=x.p.left;
			if(w.color=="red"){
				
			}
			if(w.left.color=="black"&&w.right.color=="black"){
				w.color="red";
				x=x.p;
			}else if(w.left.color=="black"){
				w.right.color="black";
				w.color="red";
				leftRotate(tree,w);
				w=x.p.left;
			}else{
				w.color=x.p.color;
				x.p.color="black";
				w.left.color="black";
				rightRotate(tree,x.p);
				x=tree.root;
			}	
		}
	}
	x.color="black";
}


/*测试-----*/

let tree=new Tree();
rbInsert(tree,new Node(1));
rbInsert(tree,new Node(2));
rbInsert(tree,new Node(3));
rbInsert(tree,new Node(8));

rbInsert(tree,new Node(9));
rbInsert(tree,new Node(10));
rbInsert(tree,new Node(11));



console.log(tree.root);
inorderTreeWalk(tree.root);

let n=new Node(6);
rbInsert(tree,n);
inorderTreeWalk(tree.root);

rbDelete(tree,n);
inorderTreeWalk(tree.root);