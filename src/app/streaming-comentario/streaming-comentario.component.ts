import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-streaming-comentario',
  templateUrl: './streaming-comentario.component.html',
  styleUrls: ['./streaming-comentario.component.scss']
})
export class StreamingComentarioComponent implements OnInit {

  private data: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase
  ){
    this.data = this.db.list('/streaming');
  }

  nombreStreaming;
  descripcionStreaming;
  observacionesStreaming;

  dataStreaming = [];

  ngOnInit(): void {
    this.data.snapshotChanges().subscribe(d => {
      this.dataStreaming = [];
      d.forEach(item => {
        let streaming = {
          id: item.payload.key,
          nombre: item.payload.val().nombre,
          descripcion: item.payload.val().descripcion,
          observaciones: item.payload.val().observaciones
        }
        this.dataStreaming.push(streaming);
      })
    })
  }


  guardarStreaming(){
    let streaming = {
      nombre: this.nombreStreaming,
      descripcion: this.descripcionStreaming,
      observaciones: this.observacionesStreaming
    }    
    this.data.push(streaming);
  }

}
