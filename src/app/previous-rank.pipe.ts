import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'previousRank',
  standalone: true
})
export class PreviousRankPipe implements PipeTransform {

  transform(imageId: number, previousTopTenImages: any[]): number {
    const previousRankIndex = previousTopTenImages.findIndex(item => item.id === imageId);
    return previousRankIndex !== -1 ? previousRankIndex + 1 : 0; // แก้ไขให้คืนค่าเป็น 0 เมื่อไม่พบข้อมูลวันก่อนหน้า
  }

}
