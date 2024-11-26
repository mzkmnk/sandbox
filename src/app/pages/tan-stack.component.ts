import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {injectQuery} from '@tanstack/angular-query-experimental';
import {firstValueFrom} from 'rxjs';

export type TPost = {
  userId:number,
  id:number,
  title:string,
  body:string,
};

@Component({
  selector: 'app-tan-stack',
  imports:[],
  template:`
    <h1>Tan Stack query</h1>

    @let posts = query.data();

    @if(typeof posts !== 'undefined'){
      @for(post of posts; let i = $index; track i){
        <div>
          <h3>{{post.title}}</h3>
          <p>{{post.body}}</p>
        </div>
      }
    }@else{
      <div>
        <p>loading...</p>
      </div>
    }
  `
})
export class TarnStackComponent {
  private readonly httpClient = inject(HttpClient);

  query = injectQuery(() => ({
    queryKey:['posts'],
    queryFn:() => {
      return firstValueFrom(this.httpClient.get<TPost[]>('https://jsonplaceholder.typicode.com/posts'))
    },
  }));
}
