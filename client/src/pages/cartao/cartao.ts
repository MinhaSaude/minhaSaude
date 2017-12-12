import { GlobalProvider } from './../../providers/global/global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacientesProvider } from '../../providers/pacientes/pacientes';

@IonicPage()
@Component({
  selector: 'page-cartao',
  templateUrl: 'cartao.html',
})
export class CartaoPage {

  private user:  any = {
    foto:"https://s18.postimg.org/8tqsoyg7d/profile.jpg"
  };

  qrData = null;
  createdCode = null;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pacienteProvider: PacientesProvider,
    private global: GlobalProvider,
     
  ) {
    this.buscarDadosCartao();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaoPage');
  }

 

  buscarDadosCartao()
  {

    this.global.getCurrentUser().then((user) =>{
      if(user){

        let buscarPaciente = this.pacienteProvider.select(user.uid).snapshotChanges().subscribe(action => {
          var dadosDoUsuario = action.payload.val();
          console.log(dadosDoUsuario);
          if (dadosDoUsuario) {
            this.user = dadosDoUsuario;
           
         
            
            var url =""+this.user.cpfCnpj;
            this.qrData = url;
            // this.createdCode ="minhasaude.io/"+ this.qrData;  **com cpf

            this.createdCode ="minhasaude.io/";
            
            console.log(url);
            switch(dadosDoUsuario.tipoSanguineo)
            {

              case "A_POSITIVO":
              this.user.tipoSanguineo = "A+ "; 
              break;
              

              case "A_NEGATIVO":
              this.user.tipoSanguineo = "A- "; 
              break;

              case "B_NEGATIVO":
              this.user.tipoSanguineo = "B- "; 
            break;

              case "B_POSITIVO":
              this.user.tipoSanguineo = "B+ "; 
              break;
              
              case "B_NEGATIVO":
              this.user.tipoSanguineo = "B- "; 
              break;

              case "AB_POSITIVO":
              this.user.tipoSanguineo = "AB+"; 
              break;
              
              case "AB_NEGATIVO":
              this.user.tipoSanguineo = "AB-"; 
              break;

              case "O_NEGATIVO":
              this.user.tipoSanguineo = "O-"; 
              break;

              case "O_POSITIVO":
              this.user.tipoSanguineo = "O+"; 
              break;

            }
          }
          buscarPaciente.unsubscribe();
      

          
        });
      } else {
        this.navCtrl.setRoot('HomePage');
      }

    });
      

  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          

            .card-minhasaude {
              height: 290px;
              width: 50%;
              background-color: #1771BB;
              border-radius: 20px;
              padding: 20px;
              -webkit-print-color-adjust: exact;
            }
            .profile {
              border-radius: 5px;
            }
            .logo {
              width: 128px;
              height: 128px;
            }

            .qrcode{
              width: 128px;
              height: 128px;
            }

            .card-minhasaude-content {
              padding: 5px;
              padding-top: 20px;
            }
            .card-minhasaude-content p {
              font-size: 16px;
              color: white !important;
            }
            .card-minhasaude-left {
              width: 75%;
              float: left;
            }
            .card-minhasaude-right {
              padding:-50px;
              width: 25%;
              float: right;
              
            }
            @page { size: landscape; }
          



          </style>
        </head>
    <body onload="window.print()">
    ${printContents}
    </body>
      </html>`
    );
    popupWin.document.close();
}




}
