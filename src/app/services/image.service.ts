import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost:3000/img';

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updatePoints(image_id: number, newPoints: number): Observable<any> {
    const url = `${this.apiUrl}/update-score/${image_id}`;
    return this.http.put(url, { points: newPoints });
  }

  getTopTenImages(): Observable<any[]> {
    const url = `${this.apiUrl}/top-ten`;
    return this.http.get<any[]>(url);
  }

  getName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // fetchTopTenUser7day(): Observable<any[]> {
  //   const url = `${this.apiUrl}/topTenUser7day`;
  //   return this.http.get<any[]>(url);
  // }
}
