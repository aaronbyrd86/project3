const form = document.querySelector("form");
const name = document.getElementById("name");
const designMenu = document.getElementById("design");
const colorMenu = document.getElementById("color");
const otherInput = document.getElementById("other-title");
const paymentMenu = document.getElementById("payment");
let total = 0;

name.focus();
document.querySelector("#credit-card").selected = true;
otherInput.style.display = "none"; 


function toggleElement(element, toggle)
{
    if (toggle === "off")
        element.classList.add("is-hidden");
    else if (toggle === "on" && element.classList.contains('is-hidden'))
        element.classList.remove("is-hidden");
}

function nameValidation()
{
    if(name.value.length > 0)
        return true;
    else
        return false; 
}

function emailValidation()
{
    emailRegex = /^\w+@\w+.com$/;
    const email = document.getElementById("mail").value;
    
    return emailRegex.test(email);
}

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
    console.log("paying with credit card")
    if(!ccRegex.test(ccNum) || !zipRegex.test(zip) || !cvvRegex.test(cvv))
        return false;
        
    return true;
}

for(let i = 1; i < colorMenu.options.length; i++)
{
    colorMenu.options[i].hidden = true;
} 

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

document.querySelector('.activities').addEventListener('change', (event) => {
    const checkboxes = document.querySelectorAll('.activities input');
    const clicked = event.target;
    const clickedType = clicked.getAttribute("data-day-and-time");
    const cost = parseInt(clicked.getAttribute("data-cost"), 10);
    
    console.log(cost);
    console.log(clicked);
    console.log(clickedType);
    
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
        total += cost;
    else
        total -= cost;
    console.log(`Total cost is ${total}`)
})

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

    console.log(option.value);
})

form.addEventListener("submit", (event) => {
    if(!nameValidation() || !emailValidation() || !activityValidation() || !creditCardValidation())
    {
        event.preventDefault();
        console.log(`name was ${nameValidation()}`);
        console.log(`email was ${emailValidation()}`)
        console.log(`activity selected was ${activityValidation()}`)
        console.log(`credit card number was ${creditCardValidation()}`)
    }

    // if(paymentMenu.selected.value == "credit card")
    // {
    //     event.preventDefault();
    // }
    
    //alert("penus");
})

