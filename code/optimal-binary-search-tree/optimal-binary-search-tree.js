/*
 * 最优二叉搜索树
 * */

/*
 * 已知：二叉搜索树各结点搜索概率，应如何构建二叉树，使得二叉树的搜索期望值最小，这样的二叉搜索树称为最优二叉搜索树
 * 计算最优二叉搜索树的期望，p为各结点的搜索概率，q为树中不存在的结点的搜索概率,其中q[i]代表大于i结点小于i+1结点的搜索概率*/

let p=[0,0.15,0.10,0.05,0.10,0.20],q=[0.05,0.10,0.05,0.05,0.05,0.10];

function optimalBST(p,q,n){
    /*
    *需要存储的值
    *e[i][j]存储i到j结点组成的最优二叉搜索树的搜索期望
    *w[i][j]存储i到j结点组成的树的概率和
    *root[i][j]存储i到j结点组成的最优二叉搜索树的根结点序号
    */
    let e=[],w=[],root=[];
    for(let i=0;i<=n+1;i++){
        let ie=[];
        let iw=[];
        let iroot=[];
        for(let j=0;j<=n;j++){
            ie.push(0);
            iw.push(0);
            iroot.push(0);
        }
        e.push(ie);
        w.push(iw);
        root.push(iroot);
    }
    for(let i=1;i<=n+1;i++){
        e[i][i-1]=q[i-1];
        w[i][i-1]=q[i-1];
    }

    /*l代表每次循环j和i的间隔距离，第一次循环j=i，第二次j=i+1,第三次j=i+2...，后一次循环需要用到前一次循环求出的数据*/
    for(let l=1;l<=n;l++){
        for(let i=1;i<=n-l+1;i++){
            let j=i+l-1;
            e[i][j]=Number.MAX_VALUE;
            w[i][j]=w[i][j-1]+p[j]+q[j];//i到j结点组成的树的概率和
            for(let r=i;r<=j;r++){
                let t=e[i][r-1]+e[r+1][j]+w[i][j];
                if(t<e[i][j]){
                    e[i][j]=t;
                    root[i][j]=r;
                }
            }
        }
    }
    return [e,root];
}


function constructOptimalBST(root,left,right){
	let r=root[left][right];
	if(r-1>=left){
		rleft=constructOptimalBST(root,left,r-1);
		console.log("k"+r+"的左孩子为k"+rleft);
	}
	if(r+1<=right){
		rright=constructOptimalBST(root,r+1,right);
		console.log("k"+r+"的右孩子为k"+rright);
	}
	return r;
}


/*测试-----*/

let [e,root]=this.optimalBST(p,q,5);

console.log(e[1][5]);//2.75

console.log("树的根为k"+root[1][5]);
constructOptimalBST(root,1,5);
/*树的根为k2
k2的左孩子为k1
k4的左孩子为k3
k5的左孩子为k4
k2的右孩子为k5*/
