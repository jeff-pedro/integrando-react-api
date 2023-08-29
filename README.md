# Integrando API a um projeto React
Este projeto foi criado para estudo sobre integração de API a uma aplicação React.

## Tecnologias
- **biblioteca [MUI](https://mui.com/)** para a criação da página de administração da aplicação.

## Instalação
Subindo a API
```
cd ./api && docker compose build && docker compose up
```

Subindo a Aplicação
```
cd ./client && npm start
```

documentação da API em http://localhost:8000/

## Explorado
- Aninhamento de rotas com <Route />
- Organização de layout com <Outlet />
- 