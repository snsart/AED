/*
 * 最小优先队列实现了下面的方法:
 * 
 * buildMinHeap(A)建立最小堆
 * heapMinMum(A)返回A中具有最小键值的元素
 * heapExtractMin(A)去掉并返回A中具有最小键值的元素
 * heapDecreaseKey(A,i,key)将A中第i个元素的关键字减少到key,假设key不大于原关键字值
 * minHeapInsert(A,x)将元素x插入A中
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
 * 维护最小堆的性质
 * A:最小堆
 * i:A中除了第i个元素,其它元素都符合最小堆
 * */


function minHeapify(A,i){
	let smallest,l=left(i),r=right(i);
	if(l<A.heapsize&&A[i].key>A[l].key){
		smallest=l;
	}else{
		smallest=i;
	}
	
	if(r<A.heapsize&&A[smallest].key>A[r].key){
		smallest=r;
	}
	
	if(smallest!=i){
		[A[smallest],A[i]]=[A[i],A[smallest]];
		minHeapify(A,smallest);
	}
}

/* 建立最小堆
 * 从堆的倒数第二层最后一个数开始,通过调用minHeapify依次往上建堆
 * */

function buildMinHeap(A){
	A.heapsize=A.length;
	for(let i=Math.floor(A.length/2);i>=0;i--){
		minHeapify(A,i);
	}
}

/* 
 * 返回A中具有最小键值的元素
 * */

function heapMinMum(A){
	return A[0];
}

/*
 * 去掉并返回A中具有最小键值的元素
 * */

function heapExtractMin(A){
	if(A.heapsize<1){
		throw new Error("heap underflow");
	}
	
	let min=A[0];
	A[0]=A[A.heapsize-1];
	A.heapsize--;
	minHeapify(A,0);
	return min;
}

/*
 * 将A中第i个元素的关键字减小到key,假设key不大于原关键字值
 * */

function heapDecreaseKey(A,i,key){
	if(key>A[i].key){
		throw new Error("new key is larger than current key");
	}
	A[i].key=key;
	while(i>0&&A[parent(i)].key>A[i].key){
		[A[i],A[parent(i)]]=[A[parent(i)],A[i]];
		i=parent(i);
	};
}

/*
 * 将x插入A中
 * */

function minHeapInsert(A,x){
	A.heapsize++;
	if(A.heapsize<=A.length){
		A[A.heapsize-1]=x;
	}else{
		A.push(x);
	}
	heapDecreaseKey(A,A.heapsize-1,x.key);
}

/*测试-----*/
/*
let A=[{value:20,key:5},{value:200,key:9},{value:100,key:5},{value:250,key:12},{value:205,key:3}];
buildMinHeap(A);
let a=heapMinMum(A);
console.log(a);

let b=heapExtractMin(A);
console.log(b);

let c=heapMinMum(A);
console.log(c);

minHeapInsert(A,{value:500,key:1});
let d=heapMinMum(A);
console.log(d);*/
