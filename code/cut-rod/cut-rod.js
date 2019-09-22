/*长度为i的钢条价格表如下：
 *	i:｜	 1	｜ 	2	｜	3	｜	4	｜	5	｜	6	｜	7	｜	8	｜	9	｜	10	｜
 *	p:｜	 1	｜	5	｜	8	｜	9	｜	10	｜	17	｜	17	｜	20	｜	24	｜	30	｜
 * 求长度为n的钢条，应该怎么切，总价值最大，求最大值：
 * 比如长度为4的钢条，可切为2-2两段，总价值10为最大值
 * 
 * 计算思路：分治算法-将n切为i和n-i两段。设r(n)为最大值,则r(n)=max(pi+r(n-i))(1<=i<=n);
 * */

//数组p存储各段的价格,0段价格为0，所以p[0]=0;
let p=[0,1,5,8,9,10,17,17,20,24,30];

/*递归求解*/

function cutRod(p,n){
	if(n==0){
		return 0;
	}
	let maxValue=Number.MIN_VALUE;
	for(let i=1;i<=n;i++){
		maxValue=Math.max(maxValue,p[i]+cutRod(p,n-i));
	}
	return maxValue;
}

console.log(cutRod(p,4));//10

/*动态规划方法求解
 *递归算法效率很低，因为它反复求解相同的子问题。动态规划方法仔细安排求解顺序，对每个子问题只求解一次，并将结果保存下来，如果随后再次需要此子问题的解，只需查找保存的结果，而不必重新计算。动态规划的实现方案有两种：1.带备忘的自顶向下法 2.自低向上法
 * */

/*1. 带备忘的自顶向下法
 * 此方法仍按自然的递归形式编写，但过程会保存每个子问题的解，当需要一个子问题的解时，过程首先检查是否已保存过此解。如果是，则直接返回保存的值，从而节省了计算时间。
 * */

function memorizedCutRod(p,n){
	let r=[];
	for(let i=0;i<=n;i++){
		r.push(0);
	}
	return memorizedCutRodAux(p,n,r);
}

function memorizedCutRodAux(p,n,r){
	if(r[n]>0){
		return r[n];
	}
	let maxValue=0;
	if(n>0){
		for(let i=1;i<=n;i++){
			maxValue=Math.max(maxValue,p[i]+memorizedCutRodAux(p,n-i,r));
		}
	}
	r[n]=maxValue;
	return maxValue;
}
console.log(memorizedCutRod(p,5));//13


/*2. 自低向上法
 * 这种方法一般需要恰当定义子问题的"规模"的概念,使得任何子问题的求解都只依赖"更小的"子问题的求解。因而我们可以将子问题按规模排序，按由小至大的顺序求解。当求解某个子问题时，它所依赖的那些更小的子问题都已求解完毕。
 * */

function bottomUpCutRod(p,n){
	let r=[];
	for(let i=0;i<=n;i++){
		r.push(0);
	}
	for(j=1;j<=n;j++){
		//已知r[0]-r[j-1],求解r[j]
		let value=Number.MIN_VALUE;
		for(i=1;i<=j;i++){
			value=Math.max(value,p[i]+r[j-i]);
		}
		r[j]=value;
	}
	return r[n];
}
console.log(bottomUpCutRod(p,5));//13


/*对长度为n的钢条，s[n]存储第一段的切割长度*/
function extendedBottomUpCutRod(p,n){
	let r=[],s=[];
	for(let i=0;i<=n;i++){
		r.push(0);
		r.push(0);
	}
	for(j=1;j<=n;j++){
		//已知r[0]-r[j-1],求解r[j]
		let value=Number.MIN_VALUE;
		for(i=1;i<=j;i++){
			if(value<p[i]+r[j-i]){
				value=p[i]+r[j-i];
				s[j]=i;
			}
		}
		r[j]=value;
	}
	return [r,s];
}

/*打印最优切割方案*/
function printCutRodSolution(p,n){
	[r,s]= extendedBottomUpCutRod(p,n);
	console.log("总价值:"+r[n]);
	let i=1;
	while(n>0){
		console.log("第"+i+"段:"+s[n]+" 价值:"+p[s[n]]);
		n=n-s[n];
		i++;
	}
}


//test------

printCutRodSolution(p,8);
/*
 * 总价值:22
 * cut-rod.js:109 第1段:2 价值:5
 * cut-rod.js:109 第2段:6 价值:17
 * */



