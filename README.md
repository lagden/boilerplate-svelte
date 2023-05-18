# Boilerplate Svelte

[![XO code style][xo-img]][xo]

[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


Boilerplate para desenvolvimento de uma aplicação utilizando Svelte.

- [Instalação](#instalação)
- [Como utilizar](#como-utilizar)
    - [Teste](#teste)
    - [Sprites](#sprites)
- [Imagem (docker)](#imagem-docker)
- [Deploy (docker)](#deploy-docker)
- [License](#license)


## Instalação

Utilize `@tadashi/boilerplate-create` para iniciar o projeto.

```
npm i -g @tadashi/boilerplate-create
boilerplate-create
```

ou

```
npx --yes @tadashi/boilerplate-create
```

E siga as instruções do prompt.

<img src="boi.gif" width="640" alt="exemplo" />


## Como utilizar

Após finalizado o `scaffolding` do projeto, instale os pacotes.

```shell
bin/node/zera -m pnpm
```

Feito isso, o projeto está pronto para funcionar.

Para rodar **local**, utilize:

```shell
bin/local/start
```

E via **docker**, utilize:

```shell
bin/docker/start
```

⚠️ **Ressalvas**

Via **Docker**, caso seja instalado um novo pacote, é necessário fazer o `build` da imagem novamente.  
Pare o container (`bin/docker/stop` ou `control + c`) e rode novamente passando a flag `-b`:

```shell
bin/docker/start -b
```


### Teste

🚧 WIP


### Sprites

No projeto tem o arquivo `src/_components/_global/Sprite.svelte`.  
Ele é gerado automaticamente pelo `spritetify`

```shell
npm run sprite
```

O script pega todos os arquivos **\*.svg** que estão na pasta `src/_assets/svg` e gera o sprite.

⚠️ **Ressalvas**

No arquivo `spritetify.config.json` é possível setar as propriedades de otimização.  
As opções são as mesmas do [SVGO](https://github.com/svg/svgo#built-in-plugins).


## Imagem

Crie os arquivos de usuário e senha do **registry** que serão utilizados para fazer o `push` da imagem.

```shell
echo 'username' > .registry-user
echo 'password' > .registry-passwd
```

Verifique as suas variáveis de ambiente `.conf/*.sh`.  
E para fazer o `push` da imagem de sua aplicação, execute:

```shell
bin/docker/image -e production
```


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
