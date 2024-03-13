const express = require("express");
const UserRepository = require("./repository/UserRepository");
const router = express.Router();

// Rota para inserir um novo usuário
router.post("/users", async (req, res) => {
  try {
    const { name, email, followers } = req.body;
    const userRepository = new UserRepository();

    // Insere o novo usuário no banco de dados
    const newUser = await userRepository.insert({ name, email, followers });

    // Retorna o novo usuário como resposta
    res.status(201).json(newUser);
  } catch (error) {
    // Trata erros
    res.status(500).json({ message: "Erro ao inserir novo usuário." });
  }
});

// Rota para obter a lista de usuários
router.get("/users", async (req, res) => {
  try {
    const userRepository = new UserRepository();
    const users = await userRepository.get();

    // Renderiza o HTML com os dados dos usuários
    const html = `
      <html>
        <head>
          <title>Lista de Usuários</title>
        </head>
        <body>
          <h1>Lista de Usuários</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Seguidores</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(user => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.followers}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Envia o HTML como resposta
    res.send(html);
  } catch (error) {
    // Trata erros
    res.status(500).json({ message: "Erro ao obter lista de usuários." });
  }
});

module.exports = router;
