const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3001;
const apiDomain = 'https://api.timezonedb.com/v2.1';
const apiKey = '9T9W19UNPUF3';

// Middleware para adicionar o cabeçalho Access-Control-Allow-Origin em todas as respostas
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

// Rota para obter o nome do fuso horário do usuário com base na localização
app.get('/api/user-timezone/:latitude/:longitude', async (req, res) => {
    const { latitude, longitude } = req.params;
    let url = `${apiDomain}/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;    
  
    try {
        const response = await fetch(url);
        const data = await response.json();

        const dateObj = new Date(data.timestamp * 1000);
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);

        let date = `${day}/${month}/${year}`;
      
        // Extrair as propriedades desejadas da resposta da API
        const { countryCode, countryName, regionName, cityName, zoneName, abbreviation } = data;
       
        // Criar um novo objeto com as propriedades extraídas
        const responseData = {
            countryCode,
            countryName,
            regionName,
            cityName,
            zoneName,
            abbreviation,
            date
        };

        res.json(responseData);

    } catch (error) {
      console.error('Erro na resposta da API original (get-time-zone):', error);
      res.status(500).json({ error: 'Erro na requisição para a API original (get-time-zone)' });
    }
});
  
// Rota para obter a lista de fusos horários
app.get('/api/zones', (req, res) => {
    let urlII = `${apiDomain}/list-time-zone?key=${apiKey}&format=json`;
    fetch(urlII)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const formattedZones = convertTimestamps(data.zones);
          res.json({ status: 'OK', zones: formattedZones });
        } else {
          console.error('Erro na resposta da API original (list-time-zone):', data.message);
          res.status(500).json({ status: 'Error', message: 'Erro na resposta da API original' });
        }
      })
      .catch(error => {
        console.error('Erro na requisição para a API original (list-time-zone):', error);
        res.status(500).json({ status: 'Error', message: 'Erro na requisição para a API original (list-time-zone)' });
      });
  });
  
  function convertTimestamps(zones) {

    let currentCountryCode = 'BR';    

    return zones.map(zone => {
        const dateObj = new Date(zone.timestamp * 1000);
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);
        const hours = ('0' + dateObj.getHours()).slice(-2);
        const minutes = ('0' + dateObj.getMinutes()).slice(-2);
        const seconds = ('0' + dateObj.getSeconds()).slice(-2);       

        switch (currentCountryCode) {
            case 'BR':
                date = `${day}/${month}/${year}`;
            break;
            
            default:
                date = `${year}-${month}-${day}`;
        }
  
        return {
            countryCode: zone.countryCode,
            countryName: zone.countryName,
            zoneName: zone.zoneName,
            gmtOffset: zone.gmtOffset,
            timestamp: zone.timestamp,
            date: date,
            time: `${hours}:${minutes}`
        };
    });
}

app.listen(port, () => {
    console.log(`Servidor intermediário rodando em http://localhost:${port}`);
});
