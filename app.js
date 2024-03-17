const checkBoxList = document.querySelectorAll(".custom-checkbox")
const inputFields = document.querySelectorAll('.goal-input') // array type
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')




const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done! 👍',
    'Just a step away,keep going!',
    'Whoa! YOu just completed all the goals,time for chill 🤙',
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length}  completed`
progressLabel.innerText = allQuotes[completedGoalsCount]


checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allGoalsAdded = [...inputFields].every((input) => {
            return input.value
        })

        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle('completed')
            //  console.log(allGoals)
            const inputId = checkbox.nextElementSibling.id
            // console.log(allGoals[inputId]); // access allGoals ko object
            allGoals[inputId].completed = !allGoals[inputId].completed // set inputId class true or false
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

            progressValue.style.width = `${(completedGoalsCount / inputFields.length ) * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length}  completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]

            localStorage.setItem('allGoals', JSON.stringify(allGoals)) //update as we get value in inputId
        } else {
            progressBar.classList.add('show-error') //if clicked without adding goal  show error
        }
    })
})
inputFields.forEach((input) => {
    if(allGoals[input.id]){
      input.value = allGoals[input.id].name
    
    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    
     }
    }
    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')// now if  start adding goal then  remove error 
    })


    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return // if completed then  user aren't allowed to write anything in input
        }

        if(allGoals[input.id]){
            allGoals[input.id].name = input.value
        }else{
            allGoals[input.id] = {
                name: input.value,
                completed: false,
            }
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))// save in Local storage

    })
})