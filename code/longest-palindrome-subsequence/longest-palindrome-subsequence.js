/*
 *使用动态规划求解最长回文子序列,最优子结构如下:
 * 当str[i]==str[j]时 num[i][j]=num[i+1][j-1]+2 
 * 当str[i]!=str[j]时 num[i][j]=max(num[i][j-1],num[i+1][j])
 * 其中num[i][j]指str中第i到第j个字符之间所包含的最长回文子序列的个数
 * */

function longestPalindromeSubsequence(str){
    let num=[],substr=[],len=str.length;
    for(let i=0;i<len;i++){
        let inum=[];
        let isubstr=[];
        for(let j=0;j<len;j++){
            inum.push(1);
            isubstr.push("");
        }
        num.push(inum);
        substr.push(isubstr);
    }
    for(let i=1;i<len;i++){
        num[i][i-1]=0;
        num[i][i]=1;
        substr[i][i-1]="";
        substr[i][i]=str.charAt(i);
    }
    
	/*每次循环i到j的间隔加1*/
	
    for(let l=1;l<=len-1;l++){
        for(let i=0;i<len-l;i++){
            let j=i+l;
            let start=str.charAt(i);
            let end=str.charAt(j);
            if(start==end){
                num[i][j]=num[i+1][j-1]+2;
                substr[i][j]=start+substr[i+1][j-1]+end;
            }else{
                num[i][j]=Math.max(num[i][j-1],num[i+1][j]);
                substr[i][j]=num[i][j-1]>num[i+1][j]?substr[i][j-1]:substr[i+1][j];
            }
        }
    }
    return [num,substr];
}

//测试-----

let str="character";
let [num,substr]=longestPalindromeSubsequence(str);
console.log(num[0][str.length-1],substr[0][str.length-1]);//5 "carac"
