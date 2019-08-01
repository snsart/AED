"use strict"

function noise(x){
	x = (x<<13) ^ x;
	return ( 1.0 - ( (x * (x * x * 15731 + 789221) + 1376312589) &0x7fffffff) / 1073741824.0); 
}

function smoothedNoise_1(x){
	return noise(x)/2 + noise(x-1)/4 + noise(x+1)/4
}

function interpolatedNoise_1(x){
	let integer_X = Math.floor(x);
	let fractional_X = x - integer_X;
	let v1 = smoothedNoise_1(integer_X);
	let v2 = smoothedNoise_1(integer_X + 1);
	return cosine_Interpolate(v1 , v2 , fractional_X);
}

function perlinNoise_1D(x){
	let total = 0,
		p = 0.25,//持续度，这里我们使用1/4;
		n = 4;//叠加4次
	for(let i=0;i<n;i++){
		let frequency = Math.pow(2,i);
		let amplitude = Math.pow(p,i);
		total = total + interpolatedNoise_1(x * frequency) * amplitude;
	}
	return total
}
//余弦插值函数
function cosine_Interpolate(a, b, x){
  let ft = x * 3.1415927
  let f = (1 - Math.cos(ft)) *0.5
  return a*(1-f) + b*f
}

for(var i=0;i<10;i+=0.1){
	console.log(perlinNoise_1D(i));
}
