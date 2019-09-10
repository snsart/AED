function left(i){
	return 2*i+1;
}

function right(i){
	return 2*i+2;
}

/*
 * 维护最大堆的性质
 * A:最大堆
 * i:A中除了第i个元素,其它元素都符合最大堆
 * */


function maxHeapify(A,i){
	let largest,l=left(i),r=right(i);
	if(l<A.heapsize&&A[i]<A[l]){
		largest=l;
	}else{
		largest=i;
	}
	
	if(r<A.heapsize&&A[largest]<A[r]){
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

/* 堆排序
 * 1. 通过数组建堆
 * 2. 把堆的最后一个元素和堆第一个元素置换，把第一个元素从堆中移除，剩余的保持堆的性质不变
 * */

function heapSort(A){
	buildMaxHeap(A);
	for(let i=A.length-1;i>=0;i--){
		[A[i],A[0]]=[A[0],A[i]];
		A.heapsize--;
		maxHeapify(A,0);
	}
}

let A=[5,4,2,1,3,6,8,9,12,5,4,1,7];
heapSort(A);
console.log(A);
