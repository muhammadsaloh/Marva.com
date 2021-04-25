// Hide categories section
filterSelection("all")
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}


// Show categories section
function addClass (element, name) {
  let i, arr1, arr2
  arr1 = element.className.split(' ')
  arr2 = name.split(' ')
  for(i = 0; i < arr2.length; i++){
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}


// Hide elements  selected
function removeClass(element, name) {
	let i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
	  while (arr1.indexOf(arr2[i]) > -1) {
		arr1.splice(arr1.indexOf(arr2[i]), 1);
	  }
	}
	element.className = arr1.join(" ");
  }

// money format $
let price = document.querySelectorAll('.price')
price.forEach(i => {
  i.textContent = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency'
  }).format(i.textContent)
})


// date format
const toDate = date => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
  node.textContent = toDate(node.textContent)
})

/* navigation bar */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// remove product
const $card = document.querySelector('#card')
if ($card) {
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      
      fetch('/basket/remove/' + id, {
        method: 'delete'
      }).then(res => res.json())
        .then(card => {
          if (card.products.length) {
            const html = card.products.map(c => {
              return `
              <tr>
                <td>${c.name}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btm-small js-remove" data-id="${c._id}">Удалить</button>
                </td>
              </tr>
              `
            }).join('')
            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').textContent = toCurrency(card.price)
          } else {
            $card.innerHTML = '<p>Basket did not remain</p>'
          }
        })
    }
    document.location.reload()
  })
} 



// btns active 
let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btnC");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}








