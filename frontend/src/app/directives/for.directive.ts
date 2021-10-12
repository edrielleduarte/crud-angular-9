import { Directive, OnInit, Input, ViewContainerRef, TemplateRef,  } from '@angular/core';

@Directive({
  selector: '[myFor]'
})

export class ForDirective implements OnInit{

  @Input('myForEm')
  numbers: number[] = [];
 // @Input('myForUsando') texto: string
 // | undefined
  //@Input('myForUsando') texto: string

  

  constructor(
   private container: ViewContainerRef, 
   private template: TemplateRef<any>
  ) {}
    
    ngOnInit(): void{
      for(let number of this.numbers){
        this.container.createEmbeddedView(
          this.template, { $implicit: number});
      }
      //console.log(this.numbers);
      //console.log(this.texto);
    }
    
    
}
