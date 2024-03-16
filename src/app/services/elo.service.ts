import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EloService {
  private readonly K_FACTOR = 32;

  constructor() { }

  // คำนวณความน่าจะเป็นของการชนะของผู้เล่นแต่ละคน
  calculateProbability(playerRating: number, opponentRating: number): number {
    return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  }

  // คำนวณคะแนนใหม่โดยใช้ Elo Algorithm
  calculateNewRating(playerRating: number, opponentRating: number, playerWin: boolean): number {
    const playerScore = playerWin ? 1 : 0;
    const expectedScore = this.calculateProbability(playerRating, opponentRating);
    let newRating = playerRating + this.K_FACTOR * (playerScore - expectedScore);
    
    // ตรวจสอบว่า newRating น้อยกว่า 0 หรือไม่
    if (newRating < 0) {
        newRating = 0;
    }

    return newRating;
}

}
