
<p align="center">
  <img src="https://raw.githubusercontent.com/MinhaSaude/minhaSaude/master/client/resources/android/splash/drawable-land-ldpi-screen.png" alt="A Plataforma que descomplica a forma como os pacientes e hospitais mantem o histórico médico"/>
</p>

## Site e Android APK 

<p><a href="https://minhasaude.io" target="_blank">minhasaude.io</a></p>

## Justificativa do Projeto

Uma das maiores reclamações dos brasileiros é sobre a saúde, as filas inacabáveis, demora no atendimento e a falta de profissionais para atender toda a demanda. 

O Manual de Auditoria de Atenção Básica do Ministério da Saúde considera os 15 minutos como referência de produtividade na rede pública, porém, sabemos que esse tempo é muito inferior ao recomendado.

Em muitos hospitais, há a necessidade de preencher uma ficha médica, muitas vezes o paciente está em impossibilitado de fazê-la por estar desacordado ou impossibilitado de realizar movimentos, este fato acaba prejudicando o diagnóstico do médico que atua sem um conhecimento prévio.

Uma plataforma que conseguisse aumentar a velocidade no atendimento e permita o médico acompanhar todo o histórico do paciente, mesmo se o paciente tenha realizado consultas em outros hospitais em diferentes estados, além de claro, as disponibilizasse de maneira simples e concisa para o consumidor melhorando o acesso a saúde e facilitando a vida da população.

## Escopo
```
Paciente
1. Ficha Médica
 1.1 Informações Pessoais
 1.2 Parentes
 1.3 Alergias
 1.4 Medicamentos de uso contínuo
 1.5 Doenças Cronicas
 1.6 Cirurgias
2. Historico de Consultas
3. Médicos
4. Cartão Minha Saúde

Médico
5. Informações Pessoais
6. Consultar Pacientes
```

### Instalação:

Este é um projeto ionic, para realizar a instalação, baixe o projeto entre e instale as dependencias do nodejs, lembre-se é necessario possuir o ionic instalado, saiba mais em: https://ionicframework.com/getting-started/
```bash
$ npm install
$ ionic serve
```

Depois, para compilar para algum dispositivo, entre no terminal e digite:

```bash
$ ionic cordova platform add android
$ ionic cordova build android 
```

