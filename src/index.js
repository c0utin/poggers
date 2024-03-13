const express = require("express");
const UserRepository = require("./repository/UserRepository");
const app = express();
const port = 3333;

// Middleware para interpretar corpos de requisição como JSON
app.use(express.json());

// Rota para adicionar um novo usuário
app.post("/users", async (req, res) => {
  try {
    const { name, email, followers } = req.body;
    const userRepository = new UserRepository();

    // Insere o novo usuário no banco de dados
    const newUser = await userRepository.insert({ name, email, followers });

    // Retorna o novo usuário como resposta
    res.status(201).json(newUser);
  } catch (error) {
    // Trata erros
    res.status(500).json({ message: "Erro ao adicionar novo usuário." });
  }
});

// Rota para obter a lista de usuários
app.get("/users", async (req, res) => {
  try {
    // Simulando a obtenção dos usuários do banco de dados
    const userRepository = new UserRepository();
    const users = await userRepository.get();

    // Renderizando o HTML com os dados dos usuários
    const html = `
      <html>
        <head>
          <title>Lista de Usuários</title>
        </head>
        <body>
          <h1>Lista de Usuários</h1>
          <table border="1">
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

    // Enviando o HTML como resposta
    res.send(html);
  } catch (error) {
    // Trata erros
    res.status(500).send("Erro ao obter lista de usuários.");
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
