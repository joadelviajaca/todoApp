import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit{

  ngOnInit(): void {
    let obs: Observable<number[]> = of([0,1,2,3,4,5,6]);

    // obs.subscribe({
    //   next: num => console.log(num),
    //   error: error => console.log(error)
    // })

    // obs.pipe(
    //   filter(num => num.length>0)
    // ).subscribe({
    //   next: num => console.log(num),
    //   error: error => console.log(error)
    // })
     
    // obs.pipe(
    //   map(numbers=>numbers.filter(num=>num%2===0)),
    //   // filter(num=> num%2===0)
    // )

    obs.pipe(
      tap( numbers=> {
        console.log(numbers.map(num=>num*2));
        
      }
      )
    )
    .subscribe({
      next: num=> console.log(num)
    })
  }

}
