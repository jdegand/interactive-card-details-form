(function(){

    const form = document.getElementById('form');
    const formContainer = document.getElementById('form-container');
    const nameInput = document.getElementById('name');
    const displayName = document.getElementById('display-name');

    const cardNumberInput = document.getElementById('number');
    const displayCCNumber = document.getElementById('display-cc-number');

    const displayCCError = document.getElementById('number-input-error');
    const display16NumbersRequired = document.getElementById('number-input-error-16');

    const monthInput = document.getElementById('month');
    const displayMonth = document.getElementById('display-month');

    const yearInput = document.getElementById('year');
    const displayYear = document.getElementById('display-year');

    const cvcInput = document.getElementById('cvc');
    const displayCvc = document.getElementById('display-cvc');

    const expiryErrorMessage = document.getElementById('expiry-error-message');
    const cvcErrorMessage = document.getElementById('cvc-error-message');

    /*
    nameInput.addEventListener('keyup', (e)=> {
        console.log(e.target.value)
        displayName.textContent = e.target.value || 'Jane Appleseed'
    })
    */

    function updateDisplayCard(e, selector, defaultValueString) {
        selector.textContent = e.target.value || defaultValueString;
    }

    nameInput.addEventListener('keyup', (e)=> updateDisplayCard(e, displayName, 'Jane Appleseed'));

    cardNumberInput.addEventListener('keyup', (e)=> updateDisplayCard(e, displayCCNumber, '0000 0000 0000 0000'));

    monthInput.addEventListener('keyup', (e)=> updateDisplayCard(e, displayMonth, '00'));

    yearInput.addEventListener('keyup', (e)=> updateDisplayCard(e, displayYear, '00'));

    cvcInput.addEventListener('keyup', (e)=> updateDisplayCard(e, displayCvc, '000'));

    cardNumberInput.addEventListener('keyup', (e)=> {

        if(displayCCNumber.textContent.length === 16){
            display16NumbersRequired.style.display = 'none';
        }
        
        const regex = /[a-zA-Z\s]+/g;
        const specials = /[*|\":<>[\]{}`\\()';@&!#$%^~]/g;
        
        // cause of maxlength ? displayCCNumber.textContent equals 19 if you add a number then delete it til no number is left

        if (displayCCNumber.textContent.length !== 19 && (regex.test(displayCCNumber.textContent) || specials.test(displayCCNumber.textContent))) {
            displayCCError.style.display = 'block';
            cardNumberInput.classList.add('error-border');
        } else {
            displayCCError.style.display = 'none';
            cardNumberInput.classList.remove('error-border');
        }
        
    })

    cardNumberInput.addEventListener('change', (e)=> {
        displayCCNumber.textContent = e.target.value.replace(/\d{4}(?=.)/g, '$& ') || '0000 0000 0000 0000';
    })

    monthInput.addEventListener('change', (e)=> {
        if(monthInput.value.length !== 2){
            expiryErrorMessage.style.display = 'block';
            monthInput.classList.add('error-border');
        } else {
            expiryErrorMessage.style.display = 'none';
            monthInput.classList.remove('error-border');
        }
    })

    cvcInput.addEventListener('change', (e)=> {
        if(cvcInput.value.length !== 3){
            cvcErrorMessage.style.display = 'block';
            cvcInput.classList.add('error-border');
        } else {
            cvcErrorMessage.style.display = 'none';
            cvcInput.classList.remove('error-border');
        }
    })

    form.addEventListener('submit', (e)=> {
        e.preventDefault();

        if(cardNumberInput.value.length < 16 && displayCCError.style.display !== 'block') {
            display16NumbersRequired.style.display = 'block';
        }

        if(nameInput.value.length >= 6 && monthInput.value.length ===  2 && cvcInput.value.length === 3 && cardNumberInput.value.length === 16){

            form.style.display = 'none';

            const div = document.createElement('div');
            
            const img = document.createElement('img');
            img.src = './images/icon-complete.svg';
            img.alt = '';

            const heading = document.createElement('h1');
            heading.textContent = 'THANK YOU!';
            heading.style.marginBlock = '20px';

            const paragraph = document.createElement('p');
            paragraph.textContent = "We've added your card details";

            const button = document.createElement('button');
            button.type = 'button'
            button.textContent = 'Continue';
            button.style.marginBlockStart = '50px';
            button.addEventListener('click', ()=> window.location.reload())

            div.append(img, heading, paragraph, button);

            formContainer.append(div);
            formContainer.style.textAlign = 'center';

        }
    })
    
})();