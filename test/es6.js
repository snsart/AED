"use strict"


function merge(arr,p,q,r){
	let n1=q-p+1,n2=r-q;
	let left=[],right=[];
	for(let i=0;i<n1;i++){
		left.push(arr[p+i]);
	}
	for(let j=0;j<n2;j++){
		right.push(arr[q+j+1]);
	}
	left.push(Number.MAX_VALUE);
	right.push(Number.MAX_VALUE);
	let i=0,j=0;
	for(let k=p;k<=r;k++){
		if(left[i]<=right[j]){
			arr[k]=left[i];
			i++;
		}else{
			arr[k]=right[j];
			j++;
		}
	}	 
}

function mergeSort(arr,p,r){
	if(p<r){
		let q=Math.floor((p+r)/2);
		mergeSort(arr,p,q);
		mergeSort(arr,q+1,r);
		merge(arr,p,q,r);
	}
}

let arr=[4,5,2,1,8,9,4,7,2,3,1,1,6];
mergeSort(arr,0,arr.length-1);
console.log(arr);//[1, 1, 1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 9]
