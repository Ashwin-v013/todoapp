import  { useRouter } from "next/router";
export  const AddTodo = (Todo) => {

    const router = useRouter();

    fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${Todo.id}.json`,{
        method: 'PUT',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(Todo),

    }).then(()=> {
        // alert('success , Please Refresh the page to see the update');
        router.reload();
    }).catch((err)=>{
        alert(err)
    })

}
