function createCard(pet, tag) {
  const card = document.createElement("div");
  card.className = "card";
  const cardImg = document.createElement("div");
  cardImg.className = "pic";
  if (pet.image) {
    cardImg.style.backgroundImage = `url(${pet.image})`;
  } else {
    cardImg.classList.add("tmp");
  }

  const cardTitle = document.createElement("h2");
  cardTitle.innerText = pet.name;

  const cardLike = document.createElement("i");
  cardLike.className = "like fa-heart";
  cardLike.classList.add(pet.favorite ? "fa-solid" : "fa-regular");
  cardLike.addEventListener("click", (e) => {
    // поставить лайк (сердечко, id котика, является ли любимцем true/false)
    setLike(cardLike, pet.id, !pet.favorite); //true => false; false = true
  });

  const trash = document.createElement("i");
  trash.className = "fa-solid fa-trash card__trash";
  trash.addEventListener("click", (e) => {
    e.stopPropagation();
    // deleteCard(???, e.currentTarget.parentElement);
    deleteCard(pet.id, card);
  });

  card.append(cardImg, cardTitle, trash, cardLike);
  tag.append(card);

  card.addEventListener("click", (e) => {
    deleteCard(cat.id, card);
  });
  tag.append(card);
}

function setLike(el, id, like) {
  el.classList.toggle("fa-solid");
  el.classList.toggle("fa-regular");

  fetch(path + "/update/" + id, {
    method: "put",
    //без headers на сервер придет undefined
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorite: like }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      pets = pets.map((p) => {
        if (p.id === id) {
          p.favorite = like;
        }
        return p;
      });
      localStorage.setItem("band-cats", JSON.stringify(pets));
    });
}

function deleteCard(id, el) {
  if (id) {
    fetch(`${path}/delete/${id}`, {
      method: "delete",
    }).then((res) => {
      // console.log(res);
      // console.log(res.status);
      if (res.status === 200) {
        el.remove();
      }
    });
  }
}
