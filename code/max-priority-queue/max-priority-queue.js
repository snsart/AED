/*
 * 最大优先队列实现了下面的方法:
 * 
 * heapMaxMum(A)返回A中具有最大键值的元素
 * heapExtractMax(A)去掉并返回A中具有最大键值的元素
 * heapIncreaseKey(A,i,key)将A中第i个元素的关键字增加到key,假设key不小于原关键字值
 * maxHeapInsert(A,x)将元素x插入A中
 * */


function left(i){
	return 2*i+1;
}

function right(i){
	return 2*i+2;
}

function parent(i){
	return Math.floor((i-1)/2);
}

/*
 * 维护最大堆的性质
 * A:最大堆
 * i:A中除了第i个元素,其它元素都符合最大堆
 * */


function maxHeapify(A,i){
	let largest,l=left(i),r=right(i);
	if(l<A.heapsize&&A[i].key<A[l].key){
		largest=l;
	}else{
		largest=i;
	}
	
	if(r<A.heapsize&&A[largest].key<A[r].key){
		largest=r;
	}
	
	if(largest!=i){
		[A[largest],A[i]]=[A[i],A[largest]];
		maxHeapify(A,largest);
	}
}

/* 建立最大堆
 * 从堆的倒数第二层最后一个数开始,通过调用maxHeapify依次往上建堆
 * */

function buildMaxHeap(A){
	A.heapsize=A.length;
	for(let i=Math.floor(A.length/2);i>=0;i--){
		maxHeapify(A,i);
	}
}

/* 
 * 返回A中具有最大键值的元素
 * */

function heapMaxMum(A){
	return A[0];
}


/*
 * 去掉并返回A中具有最大键值的元素
 * */

function heapExtractMax(A){
	if(A.heapsize<1){
		throw new Error("heap underflow");
	}
	
	let max=A[0];
	A[0]=A[A.heapsize-1];
	A.heapsize--;
	maxHeapify(A,0);
	return max;
}

/*
 * 将A中第i个元素的关键字增加到key,假设key不小于原关键字值
 * */

function heapIncreaseKey(A,i,key){
	if(key<A[i].key){
		throw new Error("new key is smaller than current key");
	}
	A[i].key=key;
	while(i>0&&A[parent(i)].key<A[i].key){
		[A[i],A[parent(i)]]=[A[parent(i)],A[i]];
		i=parent(i);
	};
}

/*
 * 将x插入A中
 * */

function maxHeapInsert(A,x){
	A.heapsize++;
	if(A.heapsize<=A.length){
		A[A.heapsize-1]=x;
	}else{
		A.push(x);
	}
	heapIncreaseKey(A,A.heapsize-1,x.key);
}

/*测试-----*/

let A=[{value:20,key:5},{value:200,key:9},{value:100,key:5},{value:250,key:12},{value:205,key:3}];
buildMaxHeap(A);
let a=heapMaxMum(A);
console.log(a);

let b=heapExtractMax(A);
console.log(b);

let c=heapMaxMum(A);
console.log(c);

maxHeapInsert(A,{value:500,key:10});
let d=heapMaxMum(A);
console.log(d);
