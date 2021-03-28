import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

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

  selectedStreaming;
  dataStreaming = [];

  comentario;
  dataComentario = [];
  selectedComentario;

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

  guardarComentario(){
    let comentarios: AngularFireList<any> = this.db.list('/streaming/'+this.selectedStreaming.id+'/comentarios');
    let c = {
      comentario : this.comentario,
      fecha :  new Date().toLocaleString()
    }
    comentarios.push(c);    
    this.getDataComentario(this.selectedStreaming.id);
  }

  onClickStreaming(e,r){
    this.getDataComentario(r.id);
  }

  getDataComentario(id){
    let comentarios: Observable<any> = this.db.list('/streaming/'+id+'/comentarios').snapshotChanges();    
    let suscription = comentarios.subscribe(ref => {
      this.dataComentario = [];
      ref.forEach(item => {
        let c = {
          id: item.payload.key,
          comentario: item.payload.val().comentario,
          fecha: item.payload.val().fecha,
        }
        this.dataComentario.push(c);
      })
    });    
    setTimeout(() => suscription.unsubscribe(), 100);
  }


}
