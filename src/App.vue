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
			O servidor intermediário está indisponível no momento.
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                currentTimezone: '',     
                currentDate: '',          
                currentTime: '',
                currentMinute: null,                
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

<style scoped>
	body {
		background: gray;
	}

	.custom-row {
		background: #000;
	}

	.custom-clock-current {
		font-family: 'Digital7', sans-serif;
		font-size: 60px;		
		color: greenyellow;
		background: #000;
        border-color: #fff !important;
	}

	.custom-card {
		border: 2px solid greenyellow;
		background: #000;
	}

	.custom-title {
		color: greenyellow;
		font-family: 'Righteous', cursive;
	}

	.custom-date {
		font-family: 'Righteous', cursive;
		font-size: 16px;
		color: whitesmoke;
	}

	.custom-hour {
		font-family: 'Digital7', sans-serif;
		font-size: 70px;
		color: #fff;
	}

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .blink-animation {
        animation: blink 1s infinite;
    }
</style>
