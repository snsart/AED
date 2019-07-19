"use strict"

function deepCopy(obj){
	let newObj=obj instanceof Array?[]:{};
	for(let key in obj){
		if(typeof(obj[key])==="object"){
			newObj[key]=deepCopy(obj[key]);
		}else{
			newObj[key]=obj[key];
		}
	}
	return newObj;
}

let obj={x:120,y:130,z:{x:20,y:30}};
let obj2=deepCopy(obj);
obj2.z.x=200;
console.log(obj,obj2);

let arr=[2,4,5,{x:20,y:30}];
let arr2=deepCopy(arr);
arr2[3].x=50;
console.log(arr,arr2);
