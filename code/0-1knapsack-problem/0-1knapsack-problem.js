/*0-1背包问题*/
/* 
 * */

/*v存储n个商品的价值，w存储n个商品的重量，M为背包可加入的总重量*/

function knapsackProblem(v,w,n,M){
	/*maxV[i][j]为i个商品放在总重量为j的空间中的最大价值*/
	//定义和初始化数组
	let maxV=Array.from({length:n},()=>new Array(M+1));
	
	for(let i = 0; i <= M; i++) {
        maxV[0][i]=w[0]<= i?v[0]:0;
    }
	//填充其他行和列
    for (let i=1;i<n;i++){
        for (let j = 0; j <= M; j++) {
            maxV[i][j]=maxV[i-1][j];
            if (w[i] <= j) {
                maxV[i][j] = Math.max(maxV[i][j], v[i]+maxV[i-1][j-w[i]]);
            }
        }
    }
    return maxV[n-1][M];
	
}

//测试------
let v=[5,2,3,4,6,6,8,2,5];
let w=[4,2,1,6,5,1,4,7,8];
let M=20;
console.log(knapsackProblem(v,w,9,M));


