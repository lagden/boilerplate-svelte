# Boilerplate Svelte

[![XO code style][xo-img]][xo]

[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


Boilerplate para desenvolvimento de uma aplicação utilizando Svelte.

- [Instalação](#instalação)
- [Como utilizar](#como-utilizar)
    - [watch](#watch)
        - [entr](#entr)
        - [nodemon](#nodemon)
    - [teste](#teste)
- [Imagem (docker)](#imagem-docker)
- [Deploy (docker)](#deploy-docker)
- [License](#license)


## Instalação

⚠️ **Importante**

Instale o [Yarn 2 aka Berry](https://yarnpkg.com/getting-started/install).

```
npm install -g yarn
yarn set version berry
```

---

Use o [degit](https://github.com/Rich-Harris/degit) para fazer o `scaffolding` do projeto.

Existem algumas dependências.

- [bin](https://github.com/lagden/boilerplate-bin)
- [envs](https://github.com/lagden/boilerplate-envs)
- [docker](https://github.com/lagden/boilerplate-docker-nodejs) (opcional)


**Exemplo:**

```shell
yarn dlx degit lagden/boilerplate-svelte#master projeto
cd projeto
yarn dlx degit lagden/boilerplate-bin/files#main bin
yarn dlx degit lagden/boilerplate-envs/files#main ./ --force
yarn dlx degit lagden/boilerplate-docker-nodejs/files#main ./ --force
```

---

⚠️ **Importante**

Como é uma aplicação **frontend**, ajuste os `Dockerfiles`.

```
rm Dockerfile
mv Dockerfile.front Dockerfile
```

---

No arquivo `.env-base`, faça alguns ajustes:

- altere a variável de ambiente `REQUIRE_GEN` para `1`.
- ajuste o `WATCH_CMD` para `"find src static -type f | entr -r npm start"`


## Como utilizar

Após finalizado o `scaffolding` do projeto, instale os pacotes.

```shell
bin/node/zera
```

Feito isso, o projeto está pronto para rodar.

Se for rodar **local**, utilize:

```shell
bin/local/start
```

Se for rodar via **docker**, utilize:

```shell
bin/docker/start
```

⚠️ **Ressalvas**

No **docker**, caso seja instalado um novo pacote, é necessário fazer o `build` da imagem novamente.  
Pare o container (`bin/docker/stop` ou `command + c` ou `control + c`) e rode novamente passando o parâmetro `-b`:

```shell
bin/docker/start -b
```


### watch

O **watch** reinicia a aplicação caso ocorra alguma alteração.  
Rodando via **docker** isso ocorre por padrão, mas **local** é necessário fazer algumas instalações e configurações.


#### entr

Se estiver rodando em **BSD** ou **Mac OS** ou **Linux**, basta instalar o [entr](https://github.com/eradman/entr) e executar:

```shell
bin/local/watch
```


#### nodemon

Como o [entr](https://github.com/eradman/entr) não roda no **Windows**, existe uma solução alternativa.

Crie o arquivo `.env-local` na raiz do projeto e insira:

```
WATCH_LOCAL_CMD="yarn dlx nodemon -e js,json --watch server --exec npm start"
```

⚠️ **Ressalvas**

Pode instalar global também e configurar da seguinte forma:

```
WATCH_LOCAL_CMD="nodemon -e js,json --watch server --exec npm start"
```

---

Então, execute o comando:

```shell
bin/local/watch
```


### teste

Para executar os testes.

**local:**

```shell
bin/local/test
```

**docker:**

```shell
bin/docker/test -s app
```


## Imagem

Crie os arquivos de usuário e senha do **registry** que será utilizado.

```shell
echo 'username' > .registry-user
echo 'password' > .registry-passwd
```

Verifique as suas variáveis de ambiente `.env-*`.  
E para fazer o `push` da imagem de sua aplicação, execute:

```shell
bin/docker/image -e production
```

⚠️ **Ressalvas**

Se o parâmetro `-e` não for definido, o padrão é `staging`.


## Deploy

Para executar o **deploy** é necessário alguns binários instalados:

- **envsubst** by Bruno Haible
- **rsync** by Andrew Tridgell, Wayne Davison and others

O fluxo do sistema de **deploy** é simples:

1. Carrega as variáveis de ambiente (`staging` ou `production`)
2. Executa o script `bin/docker/image` (se passado o parâmetro `-i` esse processo é ignorado)
3. Cria o arquivo `docker-compose-{VERSION}.yml` utilizando o **envsubst**
4. Envia os arquivos para o servidor via **rsync**
5. Executa o `docker stack deploy` no servidor

```shell
bin/docker/deploy -e production
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
