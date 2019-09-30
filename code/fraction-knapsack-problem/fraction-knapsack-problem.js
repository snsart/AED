/*
 * 分数背包问题*/
/* 和0-背包问题一样，小偷要拿走价值最多的商品，但在分数背包问题中，小偷可拿走一件商品的一部分。
 * 策略:将商品按单位重量的价值大小排序，小偷先拿价值最高的，如果全部拿完，在拿价值第二高的，依次类推，直至达到重量上线M。贪心算法的复杂度等于排序的复杂度，为O(nlgn)；
 * 可以使用如下算法：使复杂度降为O(n)。如同快排一样找一个partial商品，单位价值比partial小的放在一边，比partial大的放在另一边，然后判断背包能装完那部分
 * */

/*v存储n个商品的价值，w存储n个商品的重量，M为背包可加入的总重量。*/

function fractionKnapsackProblem(v,w,start,end,M){
	let agv=[];
	for(let i=0;i<v.length;i++){
		agv.push(v[i]/w[i]);
	}
	//将平均价值为agv[end]的商品作为主元，把所有商品分为三部分：平均价值大于agv[end]的，等于agv[end]的和小于agv[end]的。
	let [i,j]=partial(v,m,start,end);
	
	//求解每一部分的总重量
	let g1=getWeight(start,i);
	let g2=getWeight(i+1,j-1);
	let g3=getWeight(j,end);
	
	if(M<=g1){
		
	}else if(M>g1&&M<g1+g2){
		
	}else{
		
	}
}

function partial(v,m,start,end){
	
}


//测试------



