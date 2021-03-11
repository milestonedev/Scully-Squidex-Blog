import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map, switchMap, take, tap } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import { isScullyGenerated, TransferStateService } from "@scullyio/ng-lib";
import { Post } from '../models/post.model';

@Injectable({
  providedIn: "root",
})
export class ContentBackendService {
  constructor(
    private readonly http: HttpClient,
    private readonly transferStateService: TransferStateService
  ) {}

  endpoint = `${environment.squidex.apiUrl}posts?`;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getPosts(){

    return this.http.get<any>(this.endpoint).pipe(
      map(result => result.items)
    );
  }
  getContentBySlug(slug: string): Observable<any> {
    const requestUri = `${this.endpoint}slug=${slug}`;
    const urlHash = btoa(requestUri);
    if (isScullyGenerated()) {
      return this.transferStateService.getState(urlHash);
    }

    return this.http.get<any>(requestUri).pipe(
      map((data: any) =>
        data.items.find((item: Post) => item.data.slug.iv === slug)
      ),
      tap(result => {
        this.transferStateService.setState(urlHash, result);

      })
    );
  }
}
