/*活动选择问题*/
/*
 *假定有n个活动的集合S={a1,a2,a3,...,an}，这些活动使用同一个资源，而这个资源在某个时刻只能提供给一个活动使用。每个活动有一个开始时间和一个结束时间，若两个活动时间不重叠，则称它们是兼容的。求解S的最大兼容活动集。
 * 
 * */

/*使用贪心算法求解
 * 定理：假设活动按结束时间排序，对于任意非空子集Sk，令am是Sk中结束时间最早的活动，则am在Sk的某个最大兼容活动子集中,可使用剪切法证明。
 * */

/*假设s中的活动按结束时间递增排序*/
function greedyAcitvitySelection(s){
	let maxSub=[],activityId=[];
	maxSub.push(s[0]);//结束时间最早的一定在s的某个最大兼容活动子集中
	activityId.push(0);
	for(let i=1;i<s.length;i++){
		last=maxSub[maxSub.length-1];
		if(s[i][0]>=last[1]){
			maxSub.push(s[i]);
			activityId.push(i);
		}
	}
	return [maxSub,activityId];
}

//test-----
let s=[[1,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11],[8,12],[2,14],[12,16]];
let [maxSub,activityId]=greedyAcitvitySelection(s);
console.log(maxSub);
console.log(activityId);
