//two tasks

//delete a todo
const deleteIcon = document.querySelectorAll('.delete')

//add eventlisteners
Array.from(deleteIcon).forEach((element)=>{
    element.addEventListener('click', deleteTodo)
})

async function deleteTodo() {
    //need to send this to the function in server.js to have it delete the todo from mongodb
    const id = this.parentNode.childNodes[1].innerText.trim()
    try {
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': id
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}



//priority increase 
//priority decrease?
const priorityup = document.querySelectorAll('.priorityup')
const prioritydown = document.querySelectorAll('.prioritydown')


