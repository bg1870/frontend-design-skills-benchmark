
    const toggle=document.querySelector('#billingToggle');
    const prices=document.querySelectorAll('[data-monthly]');
    const notes=document.querySelectorAll('.annual-note');
    let annual=true;
    const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
    toggle.addEventListener('click',()=>{annual=!annual;toggle.classList.toggle('monthly',!annual);toggle.setAttribute('aria-checked',String(annual));prices.forEach((price,i)=>{const value=Number(price.dataset[annual?'annual':'monthly']);price.textContent=money.format(value);notes[i].textContent=annual?`${money.format(value*12)} billed annually`:'Billed month to month';});});
  
