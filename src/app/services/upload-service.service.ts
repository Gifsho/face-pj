import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('filename', file);

    return this.http.post<any>('https://facemashbackend.onrender.com/upload', formData)
      .toPromise()
      .then(response => response.downloadURL)
      .catch(error => {
        console.error('Error uploading file:', error);
        throw error;
      });
  }
}
