let todoInput=document.querySelector(".input");
let addTodoButton=document.querySelector(".button");
let todo;
let showtodo=document.querySelector(".todos-container")
let todolist=[];
let localdata=JSON.parse(localStorage.getItem("todo"));

todolist=localdata ||[];
if(todolist.length>0)
renderTodoList(todolist);

//create function to get unique id
function uuid()
{
    //   console.log(Date.now().toString(2));
    //   console.log(Math.random().toString(16));
    return Math.random().toString(16);

}

addTodoButton.addEventListener("click",(e)=>{
    e.preventDefault();

    todo=todoInput.value;
    if(todo.length>0)
    {
       
      console.log('clicked',todo);
       todolist.push({
         id:uuid(),
         todo,
         iscompleted:false,


       })
    }
    todoInput.value="";
    localStorage.setItem("todo",JSON.stringify(todolist));
    console.log(todolist)
    renderTodoList(todolist);
})
showtodo.addEventListener("click",(e)=>{

     
    let key1=e.target.dataset.key;
    let deltodokey=e.target.dataset.todokey;
    // console.log(e);
       

     console.log('clicked',key1);
     console.log(e.target);
     
     todolist=todolist.map(todo=>todo.id==key1?{...todo,iscompleted:!todo.iscompleted}:todo);
     todolist=todolist.filter(todo=>todo.id!=deltodokey);
     console.log(todolist)
     localStorage.setItem("todo",JSON.stringify(todolist));

     renderTodoList(todolist);

     


})
function renderTodoList(todolist)
{
     showtodo.innerHTML=todolist.map(({id,todo,iscompleted} )=>`<div><input id="item-${id}" data-key="${id}" type="checkbox" ${iscompleted?"checked":""}> <label for="item-${id}" class="todo t-pointer ${iscompleted?"checked-todo":""}" data-key="${id}">${todo}</label> <button class="button-cursor" data-todokey=${id}>delete</button></div>`)

}
