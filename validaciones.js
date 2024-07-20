// JavaScript source code

function validateEmail(email)
{
  

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email)
}

function validateName(name) {
    const regex = /^[a-zA-ZÀ-ÿ\s]{2,15}$/
    
    return regex.test(name)
}

const TODAY = new Date().toISOString().split('T')[0]

function validateDate(date) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/
    
    const MATCH = date.match(regex) 
    if (!MATCH) {
        return false
    }

    const [_, YEAR, MONTH, DAY] = MATCH.map(Number) 

    if (YEAR < 0 || YEAR > TODAY.split('-')[0]) {   
        return false                               
    }
    
    if (MONTH < 1 || MONTH > 12) {
        return false
    }
    
    const LEAP_YEAR = YEAR % 4 === 0 && (YEAR % 100 !== 0 || YEAR % 400 === 0)
    
    const DAYS_IN_MONTH = [31, LEAP_YEAR ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    if (DAY < 1 || DAY > DAYS_IN_MONTH[MONTH - 1]) {
        return false
    }

    if (date > TODAY)
        return false

    return true
}

function checkForm() {
    const NAME = document.getElementById("formName")
    const SURNAME = document.getElementById("formSurname")
    const EMAIL = document.getElementById("formEmail")
    const DATE_OF_BIRTH = document.getElementById("formDateOfBirth")
    const COUNTRY_OF_RESIDENCE = document.getElementById("formCountryOfResidence")


    let ERROR = "En los siguientes campos no hay información válida:\n"

    if (!validateName(NAME.value.trim()) && NAME.required)
        ERROR = ERROR.concat("\n* Campo 'Nombre' debe tener entre 2 y 15 caracteres; letras, espacios y acentos.")
    
    if (!validateName(SURNAME.value.trim()) && SURNAME.required)
        ERROR = ERROR.concat("\n* Campo 'Apellido' debe tener entre 2 y 15 caracteres; letras, espacios y acentos.")
    
    if (!validateEmail(EMAIL.value.trim()) && EMAIL.required)
        ERROR = ERROR.concat("\n* Campo 'Correo electrónico' debe tener un email válido.")

    if (!validateDate(DATE_OF_BIRTH.value) && DATE_OF_BIRTH.required)
        ERROR = ERROR.concat("\n* Campo 'Fecha de nacimiento' necesita una fecha en el pasado válida.")
    
    if (COUNTRY_OF_RESIDENCE.value === "" && COUNTRY_OF_RESIDENCE.required)
        ERROR = ERROR.concat("\n* Campo 'País de residencia' necesita algún país indicado.")

    if (ERROR === "Los siguientes campos no tienen información válida:\n")
    {
        alert("FORMULARIO ENVIADO CORRECTAMENTE!")
        location.reload()
        return
    }

    alert(ERROR)
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formDateOfBirth").setAttribute('max', TODAY)
    
    const DEFAULT_STYLE_BUTTON = document.getElementById("styleDefault");
    const HIGH_CONTRAST_STYLE_BUTTON = document.getElementById("styleHighContrast");
    const LABELS = document.querySelectorAll('label')
    const LEGEND = document.getElementById("formLegend")

    DEFAULT_STYLE_BUTTON.addEventListener("click", () => {
        DEFAULT_STYLE_BUTTON.classList.add("active")
        HIGH_CONTRAST_STYLE_BUTTON.classList.remove("active")
        document.documentElement.style.setProperty('--bs-success-bg-subtle', '#20c997', 'important')
        LEGEND.style.setProperty('color', '#212529', 'important')
        
        LABELS.forEach((element) => {
            element.style.setProperty('color', '#212529', 'important')
        })
    })
    
    HIGH_CONTRAST_STYLE_BUTTON.addEventListener("click", () => {
        HIGH_CONTRAST_STYLE_BUTTON.classList.add("active")
        DEFAULT_STYLE_BUTTON.classList.remove("active")
        document.documentElement.style.setProperty('--bs-success-bg-subtle', '#121212', 'important')
        LEGEND.style.setProperty('color', '#f2f2f2', 'important')
        
        LABELS.forEach((element) => {
            element.style.setProperty('color', '#f2f2f2', 'important')
        })
    })

    const SUBMIT_BUTTON = document.getElementById("formSubmit")

    SUBMIT_BUTTON.addEventListener("click", (event) => {
        event.preventDefault()
        checkForm()
    })
})