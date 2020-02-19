const form = document.querySelector("form");
const name = document.getElementById("name");
const titleMenu = document.getElementById("title");
const designMenu = document.getElementById("design");
const colorMenu = document.getElementById("color");
const otherInput = document.getElementById("other-title");
const paymentMenu = document.getElementById("payment");
const costElement = document.createElement("p");
const errorMessage = document.createElement("p");
let total = 0;
 

//toggles the selected element's display on or off by using the is-hidden class
function toggleElement(element, toggle)
{
    if (toggle === "off")
        element.classList.add("is-hidden");
    else if (toggle === "on" && element.classList.contains('is-hidden'))
        element.classList.remove("is-hidden");
}

//toggles between an elements border color for valid or invalid input
function toggleError(element, toggle)
{
    if(toggle === "valid")
    {
        element.classList.add("border-default");
        element.classList.remove("border-error");
    }
    else if(toggle === "invalid")
    {
        element.classList.add("border-error");
        element.classList.remove("border-default"); 
    }
}

//checks if the name input is empty returns false if it is
function nameValidation()
{
    if(name.value.length > 0)
        return true;
    else
        return false; 
}

//checks if email is valid. returns false for invalid email
function emailValidation()
{
    emailRegex = /^\w+@\w+.com$/;
    const email = document.getElementById("mail").value;
    
    return emailRegex.test(email);
}

//checks if at least one activity has been selected. returns false if noe are selected
function activityValidation()
{
    const activities = document.querySelectorAll("input[type=checkbox]");
    
    for(let i = 0; i < activities.length; i++)
    {
        if(activities[i].checked)
            return true;
    }

    return false;
}

/**checks if the credit card info is valid. returns false if any of 
 * the fields are invalid. also checks if credit card is the
 * selected payment option. returns true if it is not
 */
function creditCardValidation()
{
    const ccNum = document.getElementById("cc-num").value;
    const zip = document.getElementById("zip").value;
    const cvv = document.getElementById("cvv").value;
    ccRegex = /^\d{13,16}$/;
    zipRegex = /^\d{5}$/;
    cvvRegex = /^\d{3}$/;

    for(let i = 0; i < paymentMenu.length; i++)
    {
        if(paymentMenu[i].value == "credit card")
        {
            if(!paymentMenu[i].selected)
                return true;
        }
    }
    
    if(!ccRegex.test(ccNum) || !zipRegex.test(zip) || !cvvRegex.test(cvv))
    {
        if(!ccRegex.test(ccNum))
            toggleError(document.getElementById("cc-num"), "invalid");
        else
            toggleError(document.getElementById("cc-num"), "valid");

        if(!zipRegex.test(zip))
            toggleError(document.getElementById("zip"), "invalid");
        else
            toggleError(document.getElementById("zip"), "valid");
        
        if(!cvvRegex.test(cvv))
            toggleError(document.getElementById("cvv"), "invalid");
        else
            toggleError(document.getElementById("cvv"), "valid");

        
        return false;
    }
        
    return true;
}

//title dropdown menu event listener
titleMenu.addEventListener("change", (event) => {
    if (event.target.value == "other")
        toggleElement(otherInput, "on");
    else    
        toggleElement(otherInput, "off");    

})

//design menu event listener. 
designMenu.addEventListener("change", (event)=> {
    if(event.target.value == "js puns")
    {
        colorMenu.options[1].selected = true;
        for(let i = 0; i < colorMenu.options.length; i++)
        {
            const value = colorMenu.options[i].value;

            if(value == "cornflowerblue" || value == "darkslategrey" || value == "gold")
                colorMenu.options[i].hidden = false;
            else
            colorMenu.options[i].hidden = true;
        }
         
    }
    else if(event.target.value == "heart js")
    {
        colorMenu.options[4].selected = true;
        for(let i = 0; i < colorMenu.options.length; i++)
        {
            const value = colorMenu.options[i].value;

            if(value == "steelblue" || value == "dimgrey")
                colorMenu.options[i].hidden = false;
            else
            colorMenu.options[i].hidden = true;
        } 
        
    }
})

//event listener for activities fieldset. disables conflicting activites and updates cost of activities
document.querySelector('.activities').addEventListener('change', (event) => {
    const checkboxes = document.querySelectorAll('.activities input');
    const clicked = event.target;
    const clickedType = clicked.getAttribute("data-day-and-time");
    const cost = parseInt(clicked.getAttribute("data-cost"), 10);
    
    // console.log(cost);
    // console.log(clicked);
    // console.log(clickedType);
    
    //check if conflicting options need to be disbaled
    for(let i= 0; i < checkboxes.length; i++)
    {
        const checkboxType = checkboxes[i].getAttribute("data-day-and-time"); 
        
        if(clickedType == checkboxType && clicked !== checkboxes[i])
        {
            if(clicked.checked)
            {
                checkboxes[i].disabled = true;
            }
            else
            {
                checkboxes[i].disabled = false;
            }
        }
    }

    //update total cost
    if (clicked.checked)
    {
        total += cost;
        costElement.innerHTML = `Total: \$${total}`;
    }
        
    else
    {
        total -= cost;
        costElement.innerHTML = `Total: \$${total}`;
    }
    
    toggleElement(errorMessage, "off");
})

//payment menu event listener. changes display info according to payment type
paymentMenu.addEventListener("change", (event) => {
    const option = event.target;

    if(option.value == "credit card")
    {
        toggleElement(document.querySelector("#paypal"), "off");
        toggleElement(document.querySelector("#bitcoin"), "off");
        toggleElement(document.querySelector("#credit-card"), "on");
    }
    else if(option.value == "paypal")
    {
        toggleElement(document.querySelector("#paypal"), "on");
        toggleElement(document.querySelector("#bitcoin"), "off");
        toggleElement(document.querySelector("#credit-card"), "off");
    }
    else
    {
        toggleElement(document.querySelector("#paypal"), "off");
        toggleElement(document.querySelector("#bitcoin"), "on");
        toggleElement(document.querySelector("#credit-card"), "off");
    }

    //console.log(option.value);
})

//form submission event listener
form.addEventListener("submit", (event) => {
    if(!nameValidation() || !emailValidation() || !activityValidation() || !creditCardValidation())
    {
        event.preventDefault();
        name.style.borderColor = "red";
        document.getElementById("mail").style.borderColor = "red";
        toggleElement(errorMessage, "on");
        console.log(`credit card number was ${creditCardValidation()}`)
    }

})

name.focus();
document.querySelector("#credit-card").selected = true;
toggleElement(otherInput, "off");

errorMessage.classList.add("is-hidden");
errorMessage.style.color = "red";
errorMessage.innerHTML = `You must register for at least one activity`;

document.querySelector('.activities').appendChild(errorMessage);
document.querySelector('.activities').appendChild(costElement);

for(let i = 1; i < colorMenu.options.length; i++)
{
    colorMenu.options[i].hidden = true;
} 