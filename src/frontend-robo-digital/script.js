function enviar() {
  // Obtém os valores dos campos do formulário com os IDs "x", "y" e "z"
  var x = document.getElementById('x').value;
  var y = document.getElementById('y').value;
  var z = document.getElementById('z').value;

  // Cria um objeto XMLHttpRequest
  var xhttp = new XMLHttpRequest();

  // Define a função de retorno de chamada que será chamada quando a resposta HTTP for recebida do servidor
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };

  // Abre a conexão HTTP POST para o endpoint "/dados" do servidor local na porta 3000
  // Envia a solicitação HTTP POST com os dados do formulário no corpo da solicitação HTTP como uma string JSON
  xhttp.open('POST', 'http://localhost:3000/dados', true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({ x: x, y: y, z: z }));
}
