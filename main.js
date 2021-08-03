
const resultArea=document.getElementById('list');

////////////////POST////////////////

const addNewGuest = (e) => {
  e.preventDefault();

  const firstName = document.querySelector('[name = "firstName"]').value;
  const lastName = document.querySelector('[name = "lastName"]').value;
  const age = document.querySelector('[name = "age"]').value;

  if(firstName==""){
    alert("Name is required!")
    return;
  }else if(lastName==""){
    alert("Lastname is required!")
    return;
  }
        
  const newGuest={
    firstName: firstName,
    lastName: lastName,
    age: age
  }

    const url="http://localhost:8080/api/guests"

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGuest)
    }).then(data => {
      if(data.status==200) {

        console.log("GIT")
        list.innerText="";
  

        fetch(url)
        .then(data => data.json())
        .then(response => {
      
          response.forEach(guest => {

            console.log(guest.lastName)
      
              const item=document.createElement('div');
              item.classList.add("singleGuest");
              item.innerHTML = `
              <div class="listInfo">  <div class="dName">${guest.firstName} </div>
              <div class="dLastName">${guest.lastName}</div> <div class="dAge"> ${guest.age} </div> </div> <div class="listEdit" id="editLabel${guest.id}"></div> <div class="listBtn" ><button class="guestUsage" onclick="removeGuest(event, ${guest.id})">Remove </button> <button class="guestUsage" style="width: 60px" onclick="showEditPanel(event,${guest.id}, '${guest.firstName}','${guest.lastName}',${guest.age})">Edit </button> </div> `;
              list.appendChild(item);
          })
          });
      }
    })
  }

////////////////GET////////////////

const list=document.getElementById('list');

const getGuests = (e) => {
  e.preventDefault();

  list.innerText="";
  const url="http://localhost:8080/api/guests";

  fetch(url)
  .then(data => data.json())
  .then(response => {

      if(response.length==0){
        list.innerText="No guests yet";
      }else{
        
        response.forEach(guest => {
      
          const item=document.createElement('div');
          item.classList.add("singleGuest");
          item.innerHTML = `
          <div class="listInfo">  <div class="dName">${guest.firstName} </div>
          <div class="dLastName">${guest.lastName}</div> <div class="dAge"> ${guest.age} </div> </div> <div class="listEdit" id="editLabel${guest.id}"></div> <div class="listBtn" ><button class="guestUsage" onclick="removeGuest(event, ${guest.id})">Remove </button> <button class="guestUsage" style="width: 60px" onclick="showEditPanel(event,${guest.id}, '${guest.firstName}','${guest.lastName}',${guest.age})">Edit </button> </div> `;
          list.appendChild(item);
      })
        
      }
    });
}

////////////////DELETE////////////////

const removeGuest=(e, id)=>{
  e.preventDefault();

  const url="http://localhost:8080/api/guests/"+id;

    fetch(url, {
      method: "DELETE",
    }).then(data => {
        if(data.status==200){

          console.log("GITES")
          list.innerText="";
          const url2="http://localhost:8080/api/guests";
          fetch(url2)
          .then(data => data.json())
          .then(response => {
        
              if(response.length==0){
                list.innerText="No guests yet";
              }else{
                response.forEach(guest => {
        
                  const item=document.createElement('div');
                  item.classList.add("singleGuest");

                  item.innerHTML = `
                  <div class="listInfo">  <div class="dName">${guest.firstName} </div>
                  <div class="dLastName">${guest.lastName}</div> <div class="dAge"> ${guest.age} </div> </div> <div class="listEdit" id="editLabel${guest.id}"></div> <div class="listBtn" ><button class="guestUsage" onclick="removeGuest(event, ${guest.id})">Remove </button> <button class="guestUsage" style="width: 60px" onclick="showEditPanel(event,${guest.id}, '${guest.firstName}','${guest.lastName}',${guest.age})">Edit </button> </div> `;
                  list.appendChild(item);
              })
              }
            });
        }
    }
    )
  
}

////////////////showEditPanel////////////////
const showEditPanel=(e, id,firstName, lastName, age)=>{
  e.preventDefault();
  console.log(id);
  
  const editLabel=document.getElementById(`editLabel${id}`);
  editLabel.innerHTML=`<label>
                          <input style="width: 130px" type="text" name="editFirstName" placeholder="new name" value=${firstName}>
                        </label>
                        <label>
                          <input style="width: 130px" type="text" name="editLastName" placeholder="new last name" value=${lastName}>
                        </label>
                        <label>
                          <input style="width: 40px" type="number" name="editAge" placeholder="new age" value=${age}>
                        </label>
                        <label>
                          <button class="guestUsage" onclick="editGuest(event, ${id})">Confirm</button>
                        </label>`;
}

////////////////PUT////////////////
const editGuest=(e, id)=>{
  e.preventDefault();
  console.log("EDIT");
  

  const editedFirstName = document.querySelector('[name = "editFirstName"]').value;
  const editedLastName = document.querySelector('[name = "editLastName"]').value;
  const editedAge = document.querySelector('[name = "editAge"]').value;

  const newGuest={
    firstName: editedFirstName,
    lastName: editedLastName,
    age: editedAge
  }

  
  const urlP="http://localhost:8080/api/guests/"+id;

  fetch(urlP, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newGuest)
  }).then(
    data => {
      const editLabel=document.getElementById(`editLabel${id}`);
      editLabel.innerHTML="";

    if(data.status==200) {
      console.log("JEST OK")
        const url="http://localhost:8080/api/guests";
        list.innerText="";
        fetch(url)
        .then(data => data.json())
        .then(response => {

            if(response.length==0){
              list.innerText="No guests yet";
            }else{
        
          response.forEach(guest => {
      
            const item=document.createElement('div');
            item.classList.add("singleGuest");
               item.innerHTML = `
              <div class="listInfo">  <div class="dName">${guest.firstName} </div>
              <div class="dLastName">${guest.lastName}</div> <div class="dAge"> ${guest.age} </div> </div> <div class="listEdit" id="editLabel${guest.id}"></div> <div class="listBtn" ><button class="guestUsage" onclick="removeGuest(event, ${guest.id})">Remove </button> <button class="guestUsage" style="width: 60px" onclick="showEditPanel(event,${guest.id}, '${guest.firstName}','${guest.lastName}',${guest.age})">Edit </button> </div> `;
              list.appendChild(item);
      })
      }
    });
    }
    }

  )
}

////////////////BUTTONS////////////////

const btn1=document.getElementById("btn1");
const btn2=document.getElementById("btn2");

btn1.addEventListener("click", addNewGuest);
btn2.addEventListener("click", getGuests);

