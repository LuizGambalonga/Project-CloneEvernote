Backend Desenvolvido em Node.JS (Express, JWT, B-crypt, NodeMon, Mongoose)

Para utilizar o projeto deverá ser seguido os seguintes passos:

1- npm install express-generator -g (FrameWork Express)
2- npx express --view=no-view javascript_note_api (Cria estrutura do Projeto)
2.1- npm install (Instala as dependencias do Node)
3- Subir Projeto "npm start"
4- npm i nodemon --save (Refresh o servidor automaticamente).
5- npm i mongoose --save (Mapeamento das Models para o MongoDB)
6- npm i b-crypt --save/ npm install bcryptjs (Biblioteca responsavel por salvar os password em HASH)
7- npm i jsonwebtoken --save (Biblioteca JWT gerar Tokens de Login de usuario utilizado para autenticação.)
7.1- npm i dotenv --save (Variavel de ambiente para guardar o valor da autenticação) 
8- npm i cors --save (Liberar a comunicação do Front com o Backend (pois o mesmo estão em portas diferente front na 3000 e Backend 3001) )

Demais dicas já comentadas dentro do código.

;)
