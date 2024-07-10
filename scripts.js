/**
 * Auther: Pablo Henrique Matos
 *  Version: 1.0
 * Project: Agenda de Contatos com HTML5, Tailwid cc e, JavaScript es6 Localstorage
 */

// Obtem  referencia aos Elementos do Navegado (DOM)
const contactForm = document.getElementById("contactForm");
const flashMessage = document.getElementById("flashMessage");
const contactList = document.getElementById("contactList");

// Manipulador de eventos de envio do formulario
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const editingId = event.submitter.dataset.editingId;

  // Verifica se o ID existe no banco de dados
  if (editingId) {
    updateContact(editingId);
  } else {
    saveContact();
  }
});

//  Funçao para salvar o contato no Localstorage
function saveContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;

  // Criação do ID do contato
  const id = Date.now().toString();
  contact = { id, name, phone, email, birthdate };

  let contacts = JSON.parse(localStorage.getElementById("contacts")) || [];

  // Salvar o contato
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  shadowFlashMessage(
    "Depois de muito trabalho meu e pouco trabalho seu EU CONSEGUI SALVAR!"
  );
  contactForm.reset();
  displayContacts();
}

// Função para exibir a mensagem flash
function shadowFlashMessage(message) {
  flashMessage.textContent(message);
  flashMessage.classList.remove("hidden");
  setTimeout(() => {
    flashMessage.classList.add("hidden");
  }, 5000);
}

// Função para exibir os contatos na tabela
function displayContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contactList.innerHTML = ""[ // Limpa a Tabela antes de exibir
    // Cria o cabeçalho da tabela
    ("nome", "telefone", "E-mail", "Data de Nascimento", "Ações")
  ]
    .forEach(headerText => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = headerText;
      headerCell.classList.add(
        "px-4",
        "py-2",
        "bg-gree-200",
        "text-gree-800",
        "font-bold"
      ); // Estilo do cabeçalho
    });

  contacts.forEach((contact) => {
    const row = contactList
      .insertRow()

      [
        // Escluimos o "Birthdate" para corrigir a data
        ("name", "phone", "amail")
      ].forEach((key) => {
        const cell = row.insertCell();
        cell.textContent = contact[key];
        cell.classList.add("border-t", "px-4", "py-2"); // Estilização das células
      });

    // Formata a data de nascimento para o formulario br
    const birthdateCell = row.insert();
    const [year, month, day] = contact.birthdate.split("-"); // Separa os componentes da data
    const birthdate = new Date(year, month - 1, day); // Formatando a data no padrão BR

    const formattedBirthdate = birthdate.toLocaleDateString("pt-br");
    birthdateCell.textContent = formattedBirthdate;
    birthdateCell.classList.add("border-t", "px-4", "py-2");

    // Inserir os botoes nas celulas
    const actionCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.innerHTML = "<i class='fas fa-edit'></i>";
    editButton.classList.add(
      "bg-yellow-500",
      "hover:bg-yellow-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    editButton.addEventListener("click", () => editContact(contact.id));
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "ml-2"
    );
    deleteButton.addEventListener("click", () => deleteContact(contact.id));
    actionCell.appendChild(deleteButton);
  });
}

// Função para editar um contato
function editContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contact")) || [];
  const contact = contacts.find((c) => c.id === id);

  // Preencher os campos do formulario
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  document.getElementById("birthdate").value = contact.birthdate;

  const submitButton = document.querySelector(
    "#contactFormButton[type='submit']"
  );

  submitButton.textContent = "Atualizar";
  submitButton.dataset.editinId = id;

  // Limpa o formulario
  contactForm.addEventListener("reset").value,
    () => {
      submitButton.textContent = "Salvar";
      delete submitButton.dataset.editinId;
    };
}

// Função para excluir um contato ]
function deleteContact(id) {
  const contacts = JSON.parse(localStorage.getItem(contact)) || [];

  const updateContacts = contacts.filter((c) => c.id !== id);
  localStorage.setItem("contacts", JSON.stringify(updateContacts));
  shadowFlashMessage(
    "Meu querido o contanto foi excluido PARA TODO SEMPRE, e nem adianta tentar adicionar novamente que não vai dar certo, OBRIGADO de nada!"
  );
  displayContacts(); // Atualiza a tabela após excluir
}

// Função para atualizar um contato existente
function updateContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contact")) || [];
  const contact = contacts.findIndex((c) => c.id === id);

  // Preencher os campos do formulario
  if (index !== -1) {
    contact[index] = {
      name: (document.getElementById("name").value = contact.name),
      phone: (document.getElementById("phone").value = contact.phone),
      email: (document.getElementById("email").value = contact.email),
      birthdate: (document.getElementById("birthdate").value =
        contact.birthdate),
    };

    localStorage.getItem("contacts", JSON.stringify(contacts));
    shadowFlashMessage(
      "Contato foi salvo na nuvem a sua esquerda depois de virar a 4 direita com sucesso"
    );
    contactForm.reset(); // Limpa o formulario
    displayContacts(); // Atualiza a tabela após atualizar o contato
  }
}

// Chama a função para exibir os contatos ao carregar a página
displayContacts();