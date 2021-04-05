import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-streaming-comentario',
  templateUrl: './streaming-comentario.component.html',
  styleUrls: ['./streaming-comentario.component.scss']
})
export class StreamingComentarioComponent implements OnInit {

  constructor(private db?: AngularFireDatabase){ }

  nombreStreaming = null;
  descripcionStreaming = null;
  observacionesStreaming = null;

  selectedStreaming;
  dataStreaming = [];

  comentario;
  dataComentario = [];
  selectedComentario;

  ngOnInit(): void {
    this.getDataStreaming();
  }

  getDataStreaming(){
    let s = this.getDbList('/streaming').subscribe(ref => {
      this.dataStreaming = this.setDataStreaming(ref)
    });
  }

  setDataStreaming(ref): any[]{
    let  dataStreaming = [];
    ref.forEach(item => {
      let s = {
        id: item.payload.key,
        nombre: item.payload.val().nombre,
        descripcion: item.payload.val().descripcion,
        observaciones: item.payload.val().observaciones
      }
      dataStreaming.push(s);
    })
    return dataStreaming;
  }
  
  guardarStreaming(){
    this.getDbFb('/streaming').push({nombre: this.nombreStreaming,descripcion: this.descripcionStreaming,observaciones: this.observacionesStreaming});
  }


  onClickStreaming(e,r){
    this.getDataComentario(r.id);
  }

  getDataComentario(id){
    let suscription = this.getDbList('/streaming/'+id+'/comentarios').subscribe(ref => {
      this.dataComentario = this.setDataComentario(ref);      
    });    
    //setTimeout(() => suscription.unsubscribe(), 100);
  }

  setDataComentario(ref): any[]{
    let comentarios = [];
    ref.forEach(item => {
      comentarios.push({id: item.payload.key,comentario: item.payload.val().comentario,fecha: item.payload.val().fecha});
    })
    return comentarios;
  }

  guardarComentario(){
    this.getDbFb('/streaming/'+this.selectedStreaming.id+'/comentarios').push({comentario : this.comentario,fecha :  new Date().toLocaleString()});
    this.getDataComentario(this.selectedStreaming.id);
  }

  getDbList(url): Observable<any> {
    return this.getDbFb(url).snapshotChanges();
  }

  getDbFb(url): AngularFireList<any>{
    return this.db.list(url);
  }

}
