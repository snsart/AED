"use strict"
/*
插入排序的工作方式像许多人排序一手扑克牌。开始时，我们左手为空并且桌子上的牌面向下。然后，我们每次从桌子上拿走一张牌并将它插入左手中正确的位置。为了找到一张牌的正确位置，我们从右向左将它与已在手中的每张牌进行比较。拿在左手上的牌总是排好序的，原来这些牌是桌子上牌堆中顶部的牌。*/

function insertSort(arr){
	for(let i=1;i<arr.length;i++){
		let key=arr[i];
		let k=i-1;
		while(k>=0&&key<arr[k]){
			arr[k+1]=arr[k];
			k--;
		}
		arr[k+1]=key;
	}
}

let arr=[4,5,2,1,8,9,4,7,2,3,1,1,6];
insertSort(arr);
console.log(arr);

