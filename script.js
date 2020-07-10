const app = document.getElementById("app");
const cards = document.getElementById("cards");
const img = document.getElementById("pic");
const country = document.getElementById("country");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const gender = document.getElementsByName("gender");

document.forms[0].addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(gender);
    cards.innerHTML = "";
    const nameNumber = Number(event.target.elements.number.value);

    let url = "https://randomuser.me/api/?results=" + nameNumber + "&inc=name,gender";

    if (img.checked === true) {
        url = url + ",picture";
    }

    if (country.checked === true) {
        url = url + ",location";
    }

    if (email.checked === true) {
        url = url + ",email";
    }
    if (phone.checked === true) {
        url = url + ",cell";
    }
    if (getRadioValue(gender) === "female") {
        url = url + "&gender=female";
    } else if (getRadioValue(gender) === "male") {
        url = url + "&gender=male";
    }
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.results);

            for (let i = 0; i < nameNumber; i++) {
                const card = document.createElement("div");
                card.id = "card";

                const fullName = document.createElement("h3");
                fullName.textContent = data.results[i].name.first + " " + data.results[i].name.last;

                if (img.checked === true) {
                    let img = document.createElement("img");
                    img.src = data.results[i].picture.large;
                    card.append(img);
                }
                card.append(fullName);

                if (country.checked === true) {
                    const country = document.createElement("h4");
                    country.textContent = data.results[i].location.country;
                    card.append(country);
                }
                if (email.checked === true) {
                    const email = document.createElement("h5");
                    email.textContent = data.results[i].email;
                    card.append(email);
                }
                if (phone.checked === true) {
                    const phone = document.createElement("h5");
                    phone.textContent = data.results[i].cell;
                    card.append(phone);
                }
                if (data.results[i].gender == "male") {
                    card.style.background = "#C3F3EC";
                } else {
                    card.style.background = "#F3C3CA";
                }

                cards.append(card);
            }
        });
});
function getRadioValue(radioList) {
    let result = "";
    for (let i = 0; i < radioList.length; i++) {
        if (radioList[i].checked === true) {
            result = radioList[i].value;
        }
    }
    return result;
}
