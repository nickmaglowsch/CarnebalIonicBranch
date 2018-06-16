import { AuthProvider } from './../../providers/auth/auth';
import { MyApp } from './../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    nome: string = this.auth.getUserInfo().nome;

    image: string = this.auth.getUserInfo().foto;
    base64Image: any;

    constructor(private auth:AuthProvider ,private actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public http: HttpClient) {
    }

    editPhoto() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Escolha uma Foto',
            buttons: [
                {
                    text: 'Galeria',
                    icon: 'md-images',
                    handler: () => {
                        this.openGallery().then((ImageData) => {
                            this.base64Image = 'data:image/png;base64, ' + ImageData
                        });
                    }
                },
                {
                    text: 'Camera',
                    icon: 'md-camera',
                    handler: () => {
                        this.openCamera().then((ImageData) => {
                            this.base64Image = 'data:image/png;base64, ' + ImageData
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    openCamera() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        }
        return this.camera.getPicture(options)
    }

    openGallery() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
        }
        return this.camera.getPicture(options);
    }

    uploadImage() {
        let postData = new FormData;
        postData.append('file', this.base64Image)
        postData.append('cdFuncionario', MyApp.USER.cdUsuario);
        this.http.post(MyApp.URL + 'teste.php', postData)
            .subscribe((data) => {
            })
    }

}
