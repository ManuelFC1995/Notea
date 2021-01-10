import { Pipe, PipeTransform } from '@angular/core';
import { Nota } from '../model/nota';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(NotasFiltradas: Nota[], texto:string): Nota[] {

    if(texto===''){
      return NotasFiltradas
    }

texto=texto.toLowerCase();
 return NotasFiltradas.filter(notas=>{
return notas.titulo.toLowerCase().includes(texto);
 });
  }

}
