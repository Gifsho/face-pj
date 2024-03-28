import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'https://facemashbackend.onrender.com/img';

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

  getOnly(aid: number): Observable<any> {
    const url = `${this.apiUrl}/find/${aid}`;
    return this.http.get(url);
  }

  getOnlyimage(mid: number): Observable<any> {
    const url = `${this.apiUrl}/findimage/${mid}`;
    return this.http.get(url);
  }

  getAdd(image_url: string, facemash_id: any): Observable<any> {
    const url = `${this.apiUrl}/add-image`; 
    const params = { image_url: image_url, facemash_id: facemash_id };
    return this.http.post(url, params);
  } 

  delete(mid: any): Observable<any> {
    const url = `${this.apiUrl}/delete/${mid}`; 
    return this.http.delete(url);
  }
  // fetchTopTenUser7day(): Observable<any[]> {
  //   const url = `${this.apiUrl}/topTenUser7day`;
  //   return this.http.get<any[]>(url);
  // }
}
