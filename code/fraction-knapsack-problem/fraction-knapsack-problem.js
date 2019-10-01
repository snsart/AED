/*
 * 分数背包问题*/
/* 和0-背包问题一样，小偷要拿走价值最多的商品，但在分数背包问题中，小偷可拿走一件商品的一部分。
 * 策略:将商品按单位重量的价值大小排序，小偷先拿价值最高的，如果全部拿完，在拿价值第二高的，依次类推，直至达到重量上限M。贪心算法的复杂度等于排序的复杂度，为O(nlgn)；
 * 可以使用如下算法，使复杂度降为O(n)：如同快排一样找一个partial商品，单位价值比partial小的放在一边，比partial大的放在另一边，然后判断背包能装完那部分
 * */

/*v存储各个商品的价值，w存储各个商品的重量，agv存储对应商品每磅的价值,M为背包可加入的总重量。*/

function fractionKnapsackProblem(v,w,agv,start,end,M){
	let maxValue=0;
	//将平均价值为agv[end]的商品作为主元，把所有商品分为三部分：平均价值大于agv[end]的，等于agv[end]的和小于agv[end]的。
	let [i,j]=partial(v,w,agv,start,end);
	//求解每一部分的总重量
	let g1=getWeight(w,start,i-1);
	let g2=getWeight(w,i,j);
	let g3=getWeight(w,j+1,end);
	
	if(M<=g1){
		maxValue=fractionKnapsackProblem(v,w,agv,start,i-1,M);
	}else if(M>g1&&M<=g1+g2){
		for(let k=start;k<i;k++){
			maxValue+=v[k];
		}
		for(let k=g1+1;k<=M;k++){
			maxValue+=agv[i];
		}
	}else{
		for(let k=start;k<=j;k++){
			maxValue+=v[k];
		}
		maxValue+=fractionKnapsackProblem(v,w,agv,j+1,end,M-g1-g2);
	}
	return maxValue;
}


/*
 *将商品分为三部分:大于agv[end]的部分，等于agv[end]的部分和小于agv[end]的部分，返回中间的两个分界点。
 * */
function partial(v,w,agv,start,end){
	let key=agv[end];
	let i=start,j=start;
	for(let k=start;k<end;k++){
		if(agv[k]>key){
			[agv[i],agv[k]]=[agv[k],agv[i]];
			[v[i],v[k]]=[v[k],v[i]];
			[w[i],w[k]]=[w[k],w[i]];
			i++;
			j++;
			
		}else if(agv[k]==key){
			[agv[j],agv[k]]=[agv[k],agv[j]];
			[v[j],v[k]]=[v[k],v[j]];
			[w[j],w[k]]=[w[k],w[j]];
			j++;
		}
	}
	[agv[j],agv[end]]=[agv[end],agv[j]];
	[v[j],v[end]]=[v[end],v[j]];
	[w[j],w[end]]=[w[end],w[j]];
	
	return [i,j];
}

function getWeight(w,i,j){
	let weight=0;
	for(let k=i;k<=j;k++){
		weight+=w[k];
	}
	return weight;
}


//测试------
let v=[5,2,3,4,6,6,8,2,5];
let w=[4,2,1,6,5,1,4,7,8];
let M=20;
let agv=[];

for(let i=0;i<v.length;i++){
	agv.push(v[i]/w[i]);
}

let maxValue=fractionKnapsackProblem(v,w,agv,0,8,M);
console.log(maxValue);//32

/*复杂度分析
 * T(n)=T(n/2)+O(n);
 * 根据主定理，可知复杂度为O(n);
 * */