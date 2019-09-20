/*
 * AVL树是一种高度平衡的二叉搜索树
 * AVL树的性质:对每个结点x,x的左子树与右子树的高度差至多为1
 * */

let Node=function(key){
	this.key=key;
	this.h=0;//h属性标记了结点的高度,叶子结点高度为0
	this.left=null;
	this.right=null;
	this.p=null;
}

let Tree=function(){
	this.root=null;
}

/*
 * 中序遍历树
 */

function inorderTreeWalk(n){
	if(n!=null){
		inorderTreeWalk(n.left);
		console.log(n.key);
		inorderTreeWalk(n.right);
	}
}

/*查找以x为根的树的最小值*/

function treeMinMum(x){
	let min=x;
	x=x.left;
	while(x!=null){
		min=x;
		x=x.left;
	}
	return min;
}

/*获取结点的高度*/
function height(x){
	return x==null?-1:x.h;
}



/*树的左旋,假设x的右子树不为null*/

function leftRotate(tree,x){
	let y=x.right;
	x.right=y.left;
	if(y.left!=null){
		y.left.p=x;
	}
	y.p=x.p;
	if(x.p==null){
		tree.root=y;
	}else if(x==x.p.left){
		x.p.left=y;
	}else{
		x.p.right=y;
	}
	
	y.left=x;
	x.p=y;
	
	x.h=Math.max(height(x.right),height(x.left))+1;
	y.h=Math.max(height(y.right),height(y.left))+1;
}


/*树的右旋,假设y的左子树不为null*/

function rightRotate(tree,y){
	let x=y.left;
	y.left=x.right;
	if(x.right!=null){
		x.right.p=y;
	}
	x.p=y.p;
	if(y.p==null){
		tree.root=x;
	}else if(y==y.p.left){
		y.p.left=x;
	}else{
		y.p.right=x;
	}
	
	x.right=y;
	y.p=x;
	
	y.h=Math.max(height(y.right),height(y.left))+1;
	x.h=Math.max(height(x.right),height(x.left))+1;
}

/*维护树的平衡:假设x结点左子树和右子树高度差最大为2
 *分为四种情况:
 * 1. 左子树比右子树高2，且左子树的右子树比左子树高1
 * 2. 左子树比右子树高2，且左子树的左子树比右子树高1
 * 3. 右子树比左子树高2，且右子树的左子树比右子树高1
 * 2. 右子树比右子树高2，且右子树的右子树比左子树高1
 * 
 * */

function avlBalance(tree,x){
	let balance=height(x.right)-height(x.left);
	if(balance==-2){
		let left=x.left;
		let b=height(left.right)-height(left.left);
		if(b==1){
			leftRotate(tree,left) //情况1
		}
		rightRotate(tree,x);//情况2
		
	}else if(balance==2){
		let right=x.right;
		let b=height(right.right)-height(right.left);
		if(b==-1){
			rightRotate(tree,right)//情况3
		}
		leftRotate(tree,x);//情况4
	}
}

/*插入：使用递归*/

function avlInsert(tree,x,z){
	if(tree.root==null){
		tree.root=z;
	}
	if(x!=null){
		if(z.key<x.key){
			if(x.left!=null){
				avlInsert(tree,x.left,z);
			}else{
				x.left=z;
				z.p=x;
			}
		}else{
			if(x.right!=null){
				avlInsert(tree,x.right,z);
			}else{
				x.right=z;
				z.p=x;
			}
		}
		x.h=Math.max(height(x.right),height(x.left))+1;
		avlBalance(tree,x);
	}
}




/*测试-----*/

let tree=new Tree();
avlInsert(tree,tree.root,new Node(5));
avlInsert(tree,tree.root,new Node(6));
avlInsert(tree,tree.root,new Node(7));
avlInsert(tree,tree.root,new Node(8));
avlInsert(tree,tree.root,new Node(9));
avlInsert(tree,tree.root,new Node(10));
avlInsert(tree,tree.root,new Node(11));
console.log(tree.root);
