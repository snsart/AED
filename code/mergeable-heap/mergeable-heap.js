let Heap=function(){
	
}

let Node=function(key){
	this.key=key;
	this.next=null;
	this.pre=null;
}

/*创建一个空的可合并堆*/

function makeHeap(){
	let heap=new Heap();
	heap.head=new Node();
	heap.tail=new Node();
	heap.head.next=heap.tail;
	heap.tail.pre=heap.head;
	heap.len=0;
	return heap;
}

function insert(heap,n){
	heap.tail.pre.next=n;
	n.pre=heap.tail.pre;
	n.next=heap.tail;
	heap.tail.pre=n;
	heap.len++;
}

function minMum(heap){
	if(heap.len==0){
		return null;
	}
	let min=heap.head.next;
	let next=min.next;
	while(next!=heap.tail){
		if(min.key>next.key){
			min=next;
		}
		next=next.next;
	}
	return min;
}

function extraceMin(heap){
	let node=minMum(heap);
	node.pre.next=node.next;
	node.next.pre=node.pre;
	heap.len--;
	return node;
}

/*
 * 合并两个堆
 * 假定heap1和heap2中的元素是不相交的，否则要先剔除重复元素，只插入不重复的。
 */

function union(heap1,heap2){
	let newHeap=new makeHeap();
	newHeap.head=heap1.head;
	newHeap.tail=heap2.tail;
	newHeap.len=heap1.len+heap2.len;
	heap1.tail.pre.next=heap2.head.next;
	heap2.head.next.pre=heap1.tail.pre;
	return newHeap;
}

function print(heap){
	console.log(heap.len);
	console.log(heap.head);
	let next=heap.head.next;
	while(next!=heap.tail){
		console.log(next);
		next=next.next;
	}
	console.log(heap.tail);
}

//测试-----

let heap=makeHeap();
print(heap);
insert(heap,new Node(5));
insert(heap,new Node(6));
insert(heap,new Node(8));
insert(heap,new Node(2));
insert(heap,new Node(9));
insert(heap,new Node(14));

let min=minMum(heap);
console.log(min.key,heap.len);//2,6

min=extraceMin(heap)
console.log(min.key,heap.len);//2,5

let heap2=makeHeap();
insert(heap2,new Node(1));
insert(heap2,new Node(6));
insert(heap2,new Node(15));

let unionHeap=union(heap,heap2);
console.log(minMum(unionHeap).key);//1

/*时间复杂度
*makeHeap():O(1)
*insert(heap,n):O(1)
*minMum(heap):O(n)
*extraceMin(heap):O(n)
*union(heap1,heap2):O(1),若两个堆元素有重复是O(n)
*/

