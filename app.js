const firebaseConfig = {
  apiKey: "AIzaSyAZdmTG5rttbOvxi2tl80AUD1F02qkt60o",
  authDomain: "caetano-project.firebaseapp.com",
  projectId: "caetano-project",
  storageBucket: "caetano-project.appspot.com",
  messagingSenderId: "207712359644",
  appId: "1:207712359644:web:2bae5112b333b668961019",
  measurementId: "G-8S3PGGWY2W"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('registerButton').addEventListener('click', register);

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      document.getElementById('feedback').innerHTML = "Usuário logado com sucesso!";
      console.log("Usuário logado com sucesso!", userCredential);
    })
    .catch(function (error) {
      document.getElementById('feedback').innerHTML = "Usuário não logado. Verifique suas credenciais.";
      console.log("Usuário não logado", error);
    });
}

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const feedback = document.getElementById('feedback');

  try {
    // Senha
    if (password.length < 6) throw "A senha deve ter no mínimo 6 caracteres.";
    if (password.length > 10) throw "A senha deve ter no máximo 10 caracteres.";
    if (!/[a-zA-Z]/.test(password)) throw "A senha deve conter pelo menos uma letra.";
    if (!/[0-9]/.test(password)) throw "A senha deve conter pelo menos um número.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw "O email deve ter um formato válido."; //e-mail

    // Cadastro 
    auth.createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        feedback.innerHTML = "Usuário cadastrado com sucesso!";
        console.log("Usuário cadastrado com sucesso!", userCredential);
      })
      .catch(function (error) {
        feedback.innerHTML = "Erro ao cadastrar usuário: " + error.message;
        console.log("Erro ao cadastrar usuário", error);
      });

  } catch (error) {
    feedback.innerHTML = "Erro: " + error;
    console.log("Erro de validação", error);
  }
}
