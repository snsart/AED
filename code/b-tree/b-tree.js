/*B树
 * B树是为磁盘或其它直接存取的存储设备而设计的一种平衡搜索树，通过B树可以一次存取多个数据项，降低了对磁盘的操作数。
 * B树的性质:
 * 1. 每个结点x有下面属性：
 * a. x.n表示当前存储在x中的关键字个数
 * b. x中的n个关键字x.key1,x.key2,...,x.keyn,以非降序存放，即x.key1<=x.key2<=...<=x.keyn
 * c. x.leaf，是一个布尔值，表示当前结点是否为叶结点
 * 2. 每个内部结点还包含n+1个指针，指向其孩子结点：x.c1,x.c2,...,x.c(n+1)
 * 3. 关键字x.key(i)对存储在其子树中的关键字范围进行分割,x.c(i)中存储的关键字小于等于x.key(i),大于等于x.key(i-1),子树最左边结点中的关键字小于等于x.key1，最右边的大于等于x.keyn。
 * 4. 每个叶结点具有相同的深度
 * 5. 每个叶结点包含的关键字个数有上界和下届，用一个被称为B树的最小度数的固定整数t>=2来表示这些界。
 * a. 除了根结点外，每个结点至少有t-1个关键字
 * b. 每个结点至多包含2t-1个关键字，当一个结点恰好有2t-1个关键字，称该结点是满的。
 * */


//从磁盘中读一个结点
function diskRead(x){}

//向磁盘中写一个结点数据
function diskWrite(x){}

//在磁盘中分配一个磁盘页
function allocateNode(){}

/*B树的搜索
 * 
 *B树中每个结点包含n个数据，每次读操作会从磁盘中取1个结点，然后从这个结点中查处要找的数据k，   若找不到，如果当前结点是叶结点，返回空，否则根据k在当前结点的位置从磁盘中取下一个结点进行查找。
 *假设初始状态会把B树的根结点读入内存。
 * 
 * @param x：当前查找的结点，共有n个数据
 * @param k:查找的关键字
 * */

function bTreeSearch(x,k){
	let i=0;
	while(i<x.n&&k>x.key[i]){
		i++;
	}
	if(i<x.n&&k==x.key[i]){
		return (x,i);
	}else if(x.leaf){
		return null;
	}else{
		diskRead(x.c[i]);
		//读取磁盘成功后进行递归查找
		return b-tree-search(x.c[i],k);
	}
}

/*创建B树
 * 
 *首先在磁盘中为根结点分配一个磁盘页，假设操作为allocateNode(),然后在根节点写入一些默认值
 * 
 * @param T:B树对象
 * */

function bTreeCreate(T){
	let x=allocateNode();
	x.leaf=true;
	x.n=0;
	diskWrite(x);
	T.root=x;
}

/*B树的插入
 *
 * B树的插入是将新的关键字插入一个已经存在的叶结点上，当叶结点是满结点的时候，需要将满的叶结点按中间关键字分裂成两个各含t-1个关键字的结点，中间关键字被提升到y的父结点，以标示两棵新树的划分点
 * 如果父结点也是满的，也需要对父结点进行分裂。
 * 和一棵二叉搜索树一样，可以在从树根到叶子这个单程向下过程中将一个新的关键字插入B树中，在沿着树往下查找新的关键字所属位置时，就分裂沿途遇到的每个满结点
 * */

/*分裂树中的结点
 * */

function bTreeSplitChild(x,i){
	let z=allocateNode();
	let y=x.c[i];
	z.leaf=y.leaf;
	z.n=t-1;
	//设置z结点的key和c
	for(let j=0;j<t-1;j++){
		z.key[j]=y.key[j+t];
	}
	if(!y.leaf){
		for(let j=0;j<t;j++){
			z.c[j]=y.c[j+t];
		}
	}
	//把y的中间结点t-1插入x中第i个结点，并修改x(i+1)之后的结点位置
	y.n=t-1;
	for(let j=x.n;j>=i+1;j--){
		x.c[j+1]=x.c[j];
	}
	x.c[i+1]=z;
	for(let j=x.n-1;j>=i;j++){
		x.key[j+1]=x.key[j];
	}
	x.key[i]=y.key[t-1];
	x.n=x.n+1;
	diskWrite(y);
	diskWrite(z);
	diskWrite(x);
}

/*以沿树单程下行方式向B树插入关键字
 *
 *插入操作需考虑根结点为满的情况和非满的情况，当根结点是满的时候，会对根结点进行分裂，一个新的结点成为根。
 * 对根进行分裂是增加B树高度的唯一途径
 * 过程调用来bTreeInsertNonfull完成将关键字插入以非满的根结点为根的树中
 */

function bTreeInsert(T,k){
	let r=T.root;
	if(r.n==2*t-1){
		s=allocateNode();
		T.root=s;
		s.leaf=false;
		s.n=0;
		s.c[0]=r;
		bTreeSplitChild(s,0);
		bTreeInsertNonfull(s,k);
	}else{
		bTreeInsertNonfull(r,k);
	}
}

function bTreeInsertNonfull(x,k){
	let i=x.n-1;
	if(x.leaf){
		while(i>=0&&k<x.key[i]){
			x.key[i+1]=x.key[i];
			i--;
		}
		x.key[i+1]=k;
		x.n=x.n+1;
		diskWrite(x);
	}else{
		while(i>=0&&k<x.key[i]){
			i--;
		}
		i++;
		diskRead(x.c[i]);
		if(x.c[i].n==2*t-1){
			bTreeSplitChild(x,i);
			if(k>x.key[i]){
				i++;
			}
		}
		bTreeInsertNonfull(x.c[i],k);
	}
}

