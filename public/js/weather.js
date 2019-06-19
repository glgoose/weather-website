const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // delete the previous error message or text
    document.querySelectorAll('p').forEach((el) => el.remove())
    
    const location = input.value

    fetch(`/weather?loc=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return addParagraph(`${data.error}`, "error")
            }
            
        addParagraph(`Location found: ${data.location}`)
        addParagraph(`The current temperature is ${data.forecast.temp}°C and there is a ${data.forecast.chanceOfRain}% chance that it is going to rain.`)
        })
    })
})

const addParagraph = (text, className) => {
    var p = document.createElement('p')
    p.textContent = text

    if (className) {
        p.className = className
    }

    document.querySelector('div.main-content').appendChild(p)
}