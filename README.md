## O desafio é:

Acessar esse site e pegar todos notebooks Lenovo ordenando do mais barato para
o mais caro. Pegar **todos** os dados disponíveis dos produtos.

Não utilizar nada de navegador como selenium ou puppeteer.
Usar somente libs que interceptam dados de requisições e respostas
(request /response) como Axios, Fetch etc.

É interessante que o robô possa ser consumido por outros serviços.
Recomendamos a criação de uma pequena REST Ful API JSON para deixar mais
otimizado.

Criar um repositório no github e me enviar o link.

https://webscraper.io/test-sites/e-commerce/static/computers/laptops

## Como utilizar

### Instalar as dependências

```sh
pnpm i
```

### Configurar variáveis de ambiente

```sh
cp .env.example .env
```

### Rodar O servidor

```sh
pnpm dev
```

### Testar

Enviar uma requisição para `http://localhost:3000/`

```sh
curl 'http://localhost:3000/'

```
