/*最长公共子序列
 * 
 * 已知:x=["a","c","b","f","e","c","t","f","m"];
 * 已知:y=["c","c","b","f","e","c","t","y","k","j","f"];
 * 求x和y的最长公共子序列
 * 
 * */


/*c[i][j]存储x长度为i，y长度为j时的最优子序列长度,b[i][j]存储方向，它指向计算c[i][j]时所选择的子问题最优解
 * 
 * 最优子结构:
 * 1.当i==0||j==0时c[i][j]=0;
 * 2.当x[i-1]==y[i-1]时c[i][j]=c[i-1][j-1]
 * 3.当x[i-1]！=y[i-1]时c[i][j]=max(c[i-1][j],c[i][j-1]);
 * */


function lcsLength(x,y){
	let m=x.length;
	let n=y.length;
	let c=[],b=[];
	for(let i=0;i<=m;i++){
		let ic=[],ib=[];
		for(let j=0;j<=n;j++){
			ic.push(0);
			ib.push(0);
		}
		c.push(ic);
		b.push(ib);
	}
	
	for(let i=1;i<=m;i++){
		for(let j=1;j<=n;j++){
			if(x[i-1]==y[j-1]){
				c[i][j]=c[i-1][j-1]+1;
				b[i][j]="↖";
			}else if(c[i-1][j]>c[i][j-1]){
				c[i][j]=c[i-1][j];
				b[i][j]="↑";
			}else{
				c[i][j]=c[i][j-1];
				b[i][j]="←";
			}
		}
	}
	return [b,c];
}

function printLcs(b,x,i,j){
	if(i==0||j==0){
		return;
	}
	if(b[i][j]=="↖"){
		printLcs(b,x,i-1,j-1);
		console.log(x[i-1]);
	}else if(b[i][j]=="↑"){
		printLcs(b,x,i-1,j);
	}else{
		printLcs(b,x,i,j-1);
	}
}


/*测试------*/

let x=["a","c","b","f","c","t","j","p","f","m"],y=["c","c","b","f","e","c","t","y","k","j","f"];
let [b,c]=lcsLength(x,y);

console.log(c[x.length][y.length]);//7

printLcs(b,x,x.length,y.length);//cbfctgf
