/*使用动态规划求解距离编辑问题,最优子结构如下
 * edit[i][j]=0 (当i==j时)
 * edit[i][j]=j (i==0,j>0)
 * edit[i][j]=i (i>0,j==0)
 * edit[i][j]=min(edit[i-1][j]+1,edit[i][j-1]+1,edit[i-1][j-1]+flag)(i>0,j>0) 其中当a[i]==b[j]时flag=0否则flag=1
 * edit[i][j]指从长度为i的字符串转为长度为j的字符串的编辑距离
 * */

function editDistance(x,y){
    //edit[i][j]表示x从0到i个字符转为y从0到j个字符的编辑距离
    
    /*初始化*/
    let edit=[],exec=[];
    for(let i=0;i<=x.length;i++){
        let iedit=[];
        for(let j=0;j<=y.length;j++){
            iedit.push(0);
        }
        edit.push(iedit);
    }
    for(let i=0;i<=x.length;i++){
        edit[i][0]=i;
    }

    for(let j=0;j<=y.length;j++){
        edit[0][j]=j;
    }

    let i=1,j=1;

	//已知edit[i-1][j],edit[i-1][j-1]和edit[i][j-1]分三种情况求解edit[i][j]
	
    while(true){
    	
        //第一种情况，已知从0-（i-1）转为0-j,求0-i转为0-j，转换规则删除第i位
        let r1=edit[i-1][j]+1;
        //第二种情况，已知从0-（i）转为0-(j-1),求0-i转为0-j，转换规则添加第j为
        let r2=edit[i][j-1]+1;
        //第三种情况，已知从0-（i-1）转为0-(j-1),求0-i转为0-j，转换规则分为两种情况：若第i位等于第j位无需转换，否则进行替换操作
        let a=x.charAt(i-1);
        let b=y.charAt(j-1);
        let r3,isreplac;
        if(a==b){
            r3=edit[i-1][j-1];
            isreplac=false;
        }else{
            r3=edit[i-1][j-1]+1;
            isreplac=true;
        }
        
        //编辑距离取三种情况的最小值
        edit[i][j]=Math.min(r1,r2,r3);

        if(j<y.length){
            edit[i][j+1]=edit[i][j]+1;
        }
        if(i<x.length){
            edit[i+1][j]=edit[i][j]+1;
        }
        
        if(edit[i][j]==r1){
            i++;
            exec.push("删除"+a);
        }else if(edit[i][j]==r2){
            j++;
            exec.push("插入"+b);
        }else{
            i++;
            j++;
            isreplac?exec.push("替换"):exec.push("不操作");
        }
        if(i>x.length||j>y.length){
            break;
        }
    }

    while(i>x.length){
        edit[i-1][j]=edit[i-1][j-1]+1;
        j++;
        exec.push("插入剩余字符");
        if(j>y.length){
            return [edit,exec];
        } 
    }

    while(j>y.length){
        edit[i][j-1]=edit[i-1][j-1]+1;
        i++;
        exec.push("删除剩余字符");
        if(i>x.length){
           return [edit,exec];
        } 
    }
    return [edit,exec];
}

//测试-----
let str1="kitten";
let str2="sitting";
let [edit,exec]=this.editDistance(str1,str2);

console.log(str1+"->"+str2);
console.log(edit[6][7],exec);//3  "替换", "不操作", "不操作", "不操作", "替换", "不操作", "插入剩余字符"