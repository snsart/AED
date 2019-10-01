/*找零问题*/
/* 用最少的硬币找n美分零钱，假定有k种不同的面值且总是包含1美分硬币。
 * 最优子结构如下:
 * count[i]=min(count[i-type[j]]+1)，其中0<j<k
 * count[i]指i美分零钱需要的最少硬币数量
 * */

function countChange(type,n){
	let count=Array.from({length:n+1});
	let types=Array.from({length:n+1});
	let k=type.length;
	count[0]=0;
	count[1]=1;
	types[1]=[1];
	types[0]=[];
	
	for(let i=2;i<=n;i++){
		count[i]=count[i-1]+1;
		types[i]=[...types[i-1],1];
		for(let j=0;j<k;j++){
			if(i-type[j]>=0&&count[i]>count[i-type[j]]+1){
				count[i]=count[i-type[j]]+1;
				types[i]=[...types[i-type[j]],type[j]];
			}
		}
	}
	return [count,types];
	
}

//测试------
let type=[23,18,8,7,2,1];
let [count,types]=countChange(type,100)

console.log(types[100]);//8,23,23,23,23


