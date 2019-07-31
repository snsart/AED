"use strict"

/*
 *基本形式：
def boxmullersampling(mu=0, sigma=1, size=1):  
    u = np.random.uniform(size=size)  
    v = np.random.uniform(size=size)  
    z = np.sqrt(-2 * np.log(u)) * np.cos(2 * np.pi * v)  
    return mu + z * sigma 

 * */
let nums=[];
function montecarlo(){
	while(true){
		let r1=Math.random();
		let probability=r1;
		let r2=Math.random();
		if(r2<probability){
			return r1;
		}
	}
}
for(let i=0;i<100;i++){
	console.log(montecarlo());
}

