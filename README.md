## Descrição

Este é um exemplo de código escrito em Vue.js seguindo as boas práticas da linguagem. O código consiste em um componente Vue que exibe informações de diferentes zonas horárias.

## Instalação e Uso

1. Clone o repositório:

```bash
git clone https://github.com/HenriqueBatistaLiduario/dbc-timezones.git
```

2. Instale as dependências:

```bash
cd seu-repositorio
npm install
```

3. Inicie o servidor local:

```bash
npm run serve
```

4. Acesse o aplicativo no navegador, geralmente através do link [http://localhost:8080](http://localhost:8080), caso você não tenha modificado a porta padrão em seu ambiente.

## Funcionalidades

- Exibe o horário atual no formato "hora:minuto:segundo".
- Obtém informações de diferentes zonas horárias através de uma requisição HTTP para uma API local.
- Atualiza as informações das zonas horárias a cada minuto, verificando se houve mudança no minuto atual.
- Trata erros de conexão com o servidor intermediário e exibe uma mensagem de falha ao obter os dados.

## Estrutura do Código

O código está organizado da seguinte forma:

- O componente principal é definido no arquivo `App.vue`.
- A lógica e os métodos do componente estão no bloco `<script>`.
- O template do componente está no bloco `<template>`.
- O estilo do componente está no bloco `<style>`.

Além disso, há o arquivo `main.js`, que é o ponto de entrada do aplicativo Vue.

## Dependências

O projeto utiliza as seguintes dependências:

- Vue.js: framework JavaScript para a construção de interfaces de usuário interativas.
- Express: framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móvel.
- Bootstrap: biblioteca CSS para estilizar os componentes.

## Meu Projeto Vue.js

Este é o README do meu projeto Vue.js, desenvolvido como case para a Digital Business Company (DBC), onde vou explicar linha a linha o código-fonte do componente principal.

### Arquivo: `App.vue`

#### Template

```html
<template>
	<div id="main" class="container pt-2">
		<div class="row custom-row mb-0">
            <div class="col-sm-4 col-md-4 col-xs-12"></div>
			<div class="col-sm-4 col-md-4 col-xs-12 mb-2 mt-3 text-center"> 
                <div class="card custom-card custom-clock-current">
					<div class="card-body text-center">            
                        <h5 class="card-title custom-title">{{ zoneName }}</h5>   
                        <h6 class="card-subtitle mb-1 custom-date">{{ currentDate }}</h6>
                        <p class="card-text custom-hour">{{ currentTime | formatTime }}</p>
                    </div>
				</div>
			</div>
            <div class="col-sm-4 col-md-4 col-xs-12"></div>
		</div>
		<div class="row custom-row pt-3">
			<div class="col-sm-4 mb-3" v-for="(zone, index) in zones" :key="index">
				<div class="card custom-card">
					<div class="card-body text-center">
						<h5 class="card-title custom-title">{{ zone.zoneName }}</h5>
						<h6 class="card-subtitle mb-1 custom-date">{{ zone.date }}</h6>
						<p class="card-text custom-hour blink-animation">{{ zone.time }}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-if="error" class="alert alert-danger text-center" role="alert">
			Falha ao obter dados | <i>{{ error }}</i><br />
			O servidor intermediário está indisponível no momento.<br />
			Experimente recarregar a página daqui a algum tempo.
		</div>
	</div>
</template>
```

O template define a estrutura do componente Vue. Ele contém várias divs que formam o layout do aplicativo. Vamos explicar cada parte:

- `<div id="main" class="container pt-2">`: Define uma div principal com a classe "container" e padding top de 2 unidades. Isso cria uma margem superior no conteúdo.

- `<div class="row custom-row mb-0">`: Cria uma div com a classe "row" e a classe personalizada "custom-row". Essa div é usada para agrupar os elementos em uma linha.

- `<div class="col-sm-4 col-md-4 col-xs-12"></div>`: Cria uma coluna vazia que ocupa 4 unidades no sistema de grid para telas pequenas (col-sm-4), médias (col-md-4) e extra pequenas (col-xs-12). Essas colunas são usadas para espaçamento no layout.

- `<div class="col-sm-4 col-md-4 col-xs-12 mb-2 mt-3 text-center">`: Cria uma coluna com tamanho 4 em telas pequenas, médias e extra pequenas. A classe "mb-2" define uma margem inferior de 2 unidades, e a classe "mt-3" define uma margem superior de 3 unidades. A classe "text-center" centraliza o conteúdo horizontalmente.

- `<div class="card custom

-card custom-clock-current">`: Cria uma div com a classe "card" e as classes personalizadas "custom-card" e "custom-clock-current". Essa div representa um cartão com estilo personalizado.

- `<div class="card-body text-center">`: Cria uma div com a classe "card-body" e "text-center". Essa div é usada para agrupar o conteúdo dentro do cartão.

- `<h5 class="card-title custom-title">{{ zoneName }}</h5>`: Cria um cabeçalho de nível 5 com as classes "card-title" e "custom-title". O texto exibido é o valor da propriedade "zoneName" do componente.

- `<h6 class="card-subtitle mb-1 custom-date">{{ currentDate }}</h6>`: Cria um cabeçalho de nível 6 com as classes "card-subtitle", "mb-1" e "custom-date". O texto exibido é o valor da propriedade "currentDate" do componente.

- `<p class="card-text custom-hour">{{ currentTime | formatTime }}</p>`: Cria um parágrafo com as classes "card-text" e "custom-hour". O texto exibido é o valor da propriedade "currentTime" do componente, que é formatado usando o filtro "formatTime".

- `<div class="col-sm-4 col-md-4 col-xs-12"></div>`: Cria uma coluna vazia para espaçamento.

- `<div class="row custom-row pt-3">`: Cria uma nova linha com a classe "custom-row" e um padding top de 3 unidades.

- `<div class="col-sm-4 mb-3" v-for="(zone, index) in zones" :key="index">`: Cria uma coluna com tamanho 4 e uma margem inferior de 3 unidades. Essa coluna é repetida para cada elemento no array "zones", utilizando a diretiva "v-for". A diretiva ":key" atribui uma chave única para cada elemento.

- `<div class="card custom-card">`: Cria um novo cartão com as classes "card" e "custom-card".

- `<div class="card-body text-center">`: Cria um novo corpo de cartão com as classes "card-body" e "text-center".

- `<h5 class="card-title custom-title">{{ zone.zoneName }}</h5>`: Cria um cabeçalho de nível 5 com as classes "card-title" e "custom-title". O texto exibido é o valor da propriedade "zoneName" de cada elemento do array "zones".

- `<h6 class="card-subtitle mb-1 custom-date">{{ zone.date }}</h6>`: Cria um cabeçalho de nível 6 com as classes "card-subtitle", "mb-1" e "custom-date". O texto exibido é o valor da propriedade "date" de cada elemento do array "zones".

- `<p class="card-text custom-hour blink-animation">{{ zone.time }}</p>`: Cria um parágrafo com as classes "card-text", "custom-hour" e "blink-animation". O texto exibido é o valor da propriedade "time" de cada elemento do array "zones".

- `<div v-if="error" class="alert alert-danger text-center" role="alert">`: Cria uma div de alerta com a classe "alert", "alert-danger" e "text-center". Essa div é exibida apenas se a propriedade "error" for verdadeira.

####

 Script

```javascript
<script>
    export default {
        data() {
            return {
                currentTimezone: '',     
                currentDate: '',          
                currentTime: '',
                currentMinute: null,
                previousTime: null,
                error: null,
                latitude: null,
                longitude: null,
                countryCode: '',
                countryName: '',
                regionName: '',
                cityName: '',
                zoneName: '',
                abbreviation: '',
                zones: [],
            };
        },
        beforeDestroy() {
            localStorage.setItem('currentMinute', this.currentMinute);
        },
        mounted() {
            this.obterLatitudeLongitude();
            this.fetchZones();
            this.startClock();            
            this.currentMinute = localStorage.getItem('currentMinute');
        },
        methods: {
            async obterLatitudeLongitude() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.obterDadosAPI();
                    },
                    (error) => {
                        console.error('Erro ao obter a localização:', error);
                    }
                    );
                } else {
                    console.error('Geolocalização não é suportada pelo navegador.');
                }
            },
            async obterDadosAPI() {
                try {
                    const response = await fetch(`http://localhost:3001/api/user-timezone/${this.latitude}/${this.longitude}`);
                    const data = await response.json();
                    
                    this.countryCode = data.countryCode;
                    this.countryName = data.countryName;
                    this.regionName = data.regionName;
                    this.cityName = data.cityName;
                    this.zoneName = data.zoneName;
                    this.abbreviation = data.abbreviation;
                    this.currentDate = data.date;

                } catch (error) {
                    console.error('Erro ao consultar a API na função obterDadosAPI:', error);
                }
            },
            fetchZones() {
                fetch('http://localhost:3001/api/zones')
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        this.zones = data.zones;
                    } else {
                        console.error('Erro na resposta da API:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });
            },
            startClock() {      
                setInterval(() => {
                    this.currentTime = new Date();
                }, 1000);
            }            
        },
        watch: {
            currentTime(newTime) {
                const newMinute = newTime.getMinutes();

                if (newMinute !== this.currentMinute) {
                    this.currentMinute = newMinute;
                    this.fetchZones();
                }
            }
        },
        filters: {
            formatTime(value) {
                if (value instanceof Date) {
                    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
                    return value.toLocaleTimeString([], options);
                }
                return '';
            },
        },
    };  
</script>
```

## Explicação Detalhada

Aqui está uma explicação mais detalhada do código:

O script define a lógica do componente Vue. Aqui estão as explicações linha a linha:

- `export default { ... }`: Exporta o objeto Vue que define o componente.

- `data() { ... }`: Define as propriedades de dados do componente. Essas propriedades são inicializadas com valores padrão.

- `beforeDestroy() { ... }`: Define um hook do ciclo de vida do Vue que é chamado antes do componente ser destruído. Nesse caso, ele armazena o valor da propriedade `currentMinute` no armazenamento local.

- `mounted() { ... }`: Define um hook do ciclo

 de vida do Vue que é chamado após o componente ser montado no DOM. Nesse caso, ele chama os métodos para obter a latitude e longitude do usuário, buscar os dados da API, iniciar o relógio e obter o valor anterior de `currentMinute` do armazenamento local.

- `methods: { ... }`: Define os métodos do componente.

  - `obterLatitudeLongitude() { ... }`: Obtém a latitude e longitude do usuário usando a API de geolocalização do navegador. Em seguida, chama o método `obterDadosAPI()` para obter os dados da API com base na localização.

  - `obterDadosAPI() { ... }`: Faz uma requisição assíncrona para a API do servidor intermediário usando as coordenadas de latitude e longitude obtidas anteriormente. Os dados retornados são atribuídos às propriedades relevantes do componente.

  - `fetchZones() { ... }`: Faz uma requisição assíncrona para obter as zonas horárias da API do servidor intermediário. Os dados retornados são atribuídos à propriedade `zones` do componente.

  - `startClock() { ... }`: Inicia um intervalo que atualiza a propriedade `currentTime` a cada segundo, fornecendo um relógio atualizado.

- `watch: { ... }`: Observa a mudança na propriedade `currentTime` e executa uma ação sempre que ela mudar. Nesse caso, ele verifica se houve uma mudança no minuto atual e chama o método `fetchZones()` para atualizar as zonas horárias.

- `filters: { ... }`: Define um filtro personalizado chamado `formatTime` que formata um valor de data em uma string de hora formatada. Esse filtro é usado no template para formatar a propriedade `currentTime`.
- O estilo do componente utiliza classes CSS personalizadas para estilizar os elementos.

O aplicativo é iniciado no navegador através do comando `npm run serve` e pode ser acessado em [http://localhost:8080](http://localhost:8080). Ele exibirá o horário atual e as informações das zonas horárias, atualizando-as a cada minuto. Em caso de falha na obtenção dos dados das zonas horárias, uma mensagem de erro é exibida.

## Contribuição

Contribuições são bem-vindas! Se você quiser melhorar este projeto, siga as etapas abaixo:

1. Faça um fork do repositório.
2. Crie um branch para a sua feature: `git checkout -b sua-feature`.
3. Faça as alterações desejadas no código.
4. Faça commit das suas alterações: `git commit -m 'Implementei a feature X'`.
5. Faça push para o branch: `git push origin sua-feature`.
6. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## IMPORTANTE

Esse pacote contém um diretório dist que gerei ao final para efeitos de garantia de build, embora o recomendado é que a dist seja gerada no ambiente onde o servidor nodejs está sendo executado, através do comando npm run build.

Eu sei que o teste é pra posição FrontEnd, mas como sou FullStack, fiz questão de desenvolver também o servidor em NodeJs para a aplicação. 

Que dia eu começo? Sou o profissional que você está procurando. Meu e-mail é henrique.liduario@hotmail.com 