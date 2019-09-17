/*
 * 二叉搜索树的性质:每个结点左子树中的结点都不大于当前结点，右子树中的结点都不小于当前结点
 * */

let Node=function(key,color){
	this.key=key;
	this.color=color;//0代表黑色 1代表红色
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
	this.root=null;
}



/*树的左旋,假设x的右子树不为nullNode*/

leftRotate(tree,x){
	let y=x.right;
	x.right=y.left;
	if(y.left!=nullNode){
		y.left.p=x;
	}
	y.p=x.p;
	if(x.p==nullNode){
		tree.root=y;
	}else if(x=x.p.left){
		x.p.left=y;
	}else{
		x.p.right=y;
	}
	
	y.left=x;
	x.p=y;
}


/*树的右旋,假设y的左子树不为nullNode*/

rightRotate(tree,y){
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



/*测试-----*/



