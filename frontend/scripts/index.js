const axiosConfig = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  axios
    .post("http://localhost:3030/api/auth", {
      email,
      password,
    })
    .then((response) => {
      let token = response.data.token;
      localStorage.setItem("token", token);
      axiosConfig.headers.Authorization =
        "Bearer " + localStorage.getItem("token");
    })
    .catch((err) => {
      console.log("Erro do login: ", err);
    });
}

function createGame() {
  let titleInput = document.getElementById("title");
  let yearInput = document.getElementById("year");
  let priceInput = document.getElementById("price");

  let game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  };

  axios
    .post("http://localhost:3030/api/games", game, axiosConfig)
    .then((response) => {
      if (response.status == 201) {
        console.log("Game cadastrado!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteGame(listItem) {
  let id = listItem.getAttribute("data-id");
  axios
    .delete(`http://localhost:3030/api/games/${id}`, axiosConfig)
    .then((responde) => {
      console.log("Game deletado");
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadForm(listItem) {
  let id = listItem.getAttribute("data-id");
  let title = listItem.getAttribute("data-title");
  let year = listItem.getAttribute("data-year");
  let price = listItem.getAttribute("data-price");

  document.getElementById("idEdit").value = id;
  document.getElementById("titleEdit").value = title;
  document.getElementById("yearEdit").value = year;
  document.getElementById("priceEdit").value = price;
}

function updateGame() {
  let idInput = document.getElementById("idEdit");
  let titleInput = document.getElementById("titleEdit");
  let yearInput = document.getElementById("yearEdit");
  let priceInput = document.getElementById("priceEdit");

  let game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  };

  let id = idInput.value;

  axios
    .put(`http://localhost:3030/api/games/${id}`, game, axiosConfig)
    .then((response) => {
      if (response.status == 200) {
        console.log("Game atualizado!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

axios
  .get("http://localhost:3030/api/games", axiosConfig)
  .then((response) => {
    let games = response.data;
    let list = document.getElementById("games");

    games.forEach((game) => {
      let item = document.createElement("li");
      item.setAttribute("data-id", game.id);
      item.setAttribute("data-title", game.title);
      item.setAttribute("data-year", game.year);
      item.setAttribute("data-price", game.price);

      item.innerHTML = `${game.id}, - ${game.title} - $ ${game.price}`;

      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Deletar";
      deleteBtn.addEventListener("click", function () {
        deleteGame(item);
      });

      let editBtn = document.createElement("button");
      editBtn.innerHTML = "Editar";
      editBtn.addEventListener("click", function () {
        loadForm(item);
      });

      item.appendChild(deleteBtn);
      item.appendChild(editBtn);

      list.appendChild(item);
    });
  })
  .catch((error) => {
    console.log(error);
  });
