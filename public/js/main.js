//two tasks
const deleteIcon = document.querySelectorAll('.delete')
const priorityIconUp = document.querySelectorAll('.priorityup')
const priorityIconDown = document.querySelectorAll('.prioritydown')

//add eventlisteners
Array.from(deleteIcon).forEach((element)=>{
    element.addEventListener('click', deleteTodo)
})
Array.from(priorityIconUp).forEach((element)=>{
    element.addEventListener('click', updatePriorityUp)
})
Array.from(priorityIconDown).forEach((element)=>{
    element.addEventListener('click', updatePriorityDown)
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

async function updatePriorityUp() {
    const id = this.parentNode.childNodes[1].innerText.trim()
    const priority = parseInt(this.parentNode.childNodes[7].innerText.trim())
    try {
        const response = await fetch('updatePriorityUp', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: id,
                priority: priority
            })
        })
    const data = await response.json()
    console.log(data)
    location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function updatePriorityDown() {
    const id = this.parentNode.childNodes[1].innerText.trim()
    const priority = parseInt(this.parentNode.childNodes[7].innerText.trim())
    try {
        const response = await fetch('updatePriorityDown', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: id,
                priority: priority
            })
        })
    const data = await response.json()
    console.log(data)
    location.reload()
    } catch (err) {
        console.log(err)
    }
}


async function updatePriorityNotUsed() {
    const id = this.parentNode.childNodes[1].innerText.trim()
    const priorityIconClicked = this
    const currentpriority = this.parentNode.childNodes[7].innerText //convert to number?
    //console.log('currentpriority',currentpriority)
    if (priorityIconClicked.classList.contains('prioritydown')) {
        let prioritychange = -1
    } else {
        let prioritychange = 1
    }
    try {
        const response = await fetch('updatePriority', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: id,
                currentpriority: currentpriority,
                prioritychange: prioritychange
            })
        })
    const data = await response.json()
    console.log(data)
    location.reload()
    } catch (err) {
        console.log(err)
    }
}



