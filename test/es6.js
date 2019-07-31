"use strict"

console.log(11.5%10);

function noise(num){
	num=num%9;
	let a=[3,5,2,4,6,9,1,0,5,2,8];
	let min=a[Math.floor(num)];
	let max=a[Math.ceil(num)];
	let deci=num-Math.floor(num);
	return LinearInterpolate(min, max, deci);
}

/*线性插值*/

function LinearInterpolate(a, b, x){
  return a*(1-x) + b*x
}

console.log(noise(3.2));
console.log(noise(3.2));
console.log(noise(3.2));
