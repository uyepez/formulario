import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  miFrom: FormGroup;
  isSubmit = false;
  capturedImage = null;

  constructor(public formBuilder: FormBuilder, public loadingController: LoadingController) { }

  ngOnInit() {
    this.miFrom = this.formBuilder.group({
      nombre : ['', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*')]],
      correo : ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      telefono : ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    })
  }

  get errorCtl(){
    return this.miFrom.controls;
  }

  async onSubmit(){
    this.isSubmit = true;
    console.log(this.miFrom);
    if(this.miFrom.status === 'INVALID'){
      return;
    }
    //loading
    const loading = await this.loadingController.create({

      duration: 10000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }


  async addImage(){
    const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        //source: CameraSource.Camera,
        quality: 80,
        allowEditing: false,
        promptLabelCancel: "CANCELAR",
        promptLabelPhoto: "GALERIA",
        promptLabelPicture: "CAMARA"


      });

      console.log('resultado Foto', image);
      this.capturedImage = `data:image/jpeg;base64,${image.base64String}`;
      //this.regUser.imagen = image.base64String;
      //this.save();
  }

}
