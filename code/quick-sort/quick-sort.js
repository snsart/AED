/*
 * 快速排序采用分治策略
 * 1. 分解：把数组[p,r]划分为[p,q-1],[q+1,r]两个子数组，使[p,q-1]中的元素都小于等于[q]，[q+1,r]中的元素都大于等于[q]。
 * 2. 解决：通过递归调用，对两个子数组分别排序
 * 3. 因为是原址排序，不需要合并
 * */

function quickSort(A,p,r){
	if(p<r){
		q=partion(A,p,r);
		quickSort(A,p,q-1);
		quickSort(A,q+1,r);
	}
}

function partion(A,p,r){
	let x=A[r];
	let i=p-1;//记录分隔点的位置，每找到一个比x小的，分割点+1
	for(j=p;j<r;j++){
		if(A[j]<x){
			i++;
			[A[j],A[i]]=[A[i],A[j]];
		}
	}
	i++;
	[A[i],A[r]]=[A[r],A[i]];
	return i;
}

/*测试-----*/

let A=[5,4,2,3,6,8,12,42,15,23,8,4,1];
quickSort(A,0,A.length-1);
console.log(A);


