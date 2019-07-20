"use strict"

let template=`
	<ul>
		<%for(let i=0;i<5;i++){%>
			<li>列表</li>
		<%}%>
	</ul>
`;

console.log(template);
template=template.replace(/<%/g,'`);\n').replace(/%>/g,'\necho(`');

template='echo(`'+template+'`);';
console.log(template);

let script =
`function parse(){
  let output = "";

  function echo(html){
    output += html;
  }

  ${ template }

  return output;
}`;

console.log(script);
eval(script);
parse();
