const app = document.getElementById("app");
const cards = document.getElementById("cards");
const img = document.getElementById("pic");
const country = document.getElementById("country");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

document.forms[0].addEventListener("submit", (event) => {
    event.preventDefault();

    cards.innerHTML = "";
    const nameNumber = Number(event.target.elements.number.value);

    for (let i = 0; i < nameNumber; i++) {
        fetch("https://randomuser.me/api/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results[0]);
                const card = document.createElement("div");
                card.id = "card";

                const fullName = document.createElement("h3");
                fullName.textContent =
                    data.results[0].name.first +
                    " " +
                    data.results[0].name.last;

                if (img.checked === true) {
                    let img = document.createElement("img");
                    img.src = data.results[0].picture.large;
                    card.append(img);
                }
                card.append(fullName);

                if (country.checked === true) {
                    const country = document.createElement("h4");
                    country.textContent = data.results[0].location.country;
                    card.append(country);
                }
                if (email.checked === true) {
                    const email = document.createElement("h5");
                    email.textContent = data.results[0].email;
                    card.append(email);
                }
                if (phone.checked === true) {
                    const phone = document.createElement("h5");
                    phone.textContent = data.results[0].cell;
                    card.append(phone);
                }
                if (data.results[0].gender == "male") {
                    card.style.background = "#C3F3EC";
                } else {
                    card.style.background = "#F3C3CA";
                }

                cards.append(card);
            });
    }
});
