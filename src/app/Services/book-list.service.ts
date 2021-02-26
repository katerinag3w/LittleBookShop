import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/assets/Book';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  constructor(private http: HttpClient) {}

  url: string = '../../assets/Products.json';

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }
}
