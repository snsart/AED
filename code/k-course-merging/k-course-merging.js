/*
 * k路归并
 * 请设计一个时间复杂度为O(nlgk)的算法，它能够将k个有序数组合并为一个有序数组，这里n是所有输入数组包含的总的元素个数；
 * 思路：使用k个有序数组构建最小优先队列，优先队列的key为数组的第一个元素
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
	if(l<A.heapsize&&A[i][0]>A[l][0]){
		smallest=l;
	}else{
		smallest=i;
	}
	
	if(r<A.heapsize&&A[smallest][0]>A[r][0]){
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
 *k路归并 
 * */

function kCourseMerge(Arr){
	let mergedArr=[];
	for(i=0;i<Arr.length;i++){
		//数组最后加入最大值作为哨兵
		Arr[i].push(Number.MAX_VALUE);
	}
	buildMinHeap(Arr);
	let a=heapMinMum(Arr);
	let minValue=a.shift();
	while(minValue<Number.MAX_VALUE){
		minHeapify(Arr,0);
		mergedArr.push(minValue);
		a=heapMinMum(Arr);
		minValue=a.shift();
	}
	return mergedArr;
}


/*测试-----*/

let arr=[
	[1,5,8,12,20,35],
	[2,14,23,35,68,69,75],
	[20,102],
	[15,200,300]
]

let mergeArr=kCourseMerge(arr);
console.log(mergeArr);
