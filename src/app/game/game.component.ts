import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

enum Player {
  None = '',
  X = 'X',
  O = 'O',
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgFor],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  dimension: number = 3;
  cells: Player[] = new Array(this.dimension * this.dimension).fill(
    Player.None
  );
  currentPlayer: Player = Player.X;
  winner: Player | null = null;
  gameOver: boolean = false;

  makeMove(index: number): void {
    if (!this.cells[index] && !this.gameOver) {
      this.cells[index] = this.currentPlayer;
      this.checkWinner();
      if (!this.gameOver && !this.pareggio()) {
        this.currentPlayer =
          this.currentPlayer === Player.X ? Player.O : Player.X;
        if (this.currentPlayer === Player.O) {
          this.makeBotMove();
        }
      }
    }
  }

  checkWinner(): void {
    let winnerPositions: number[][] = [];

    if (this.dimension === 3) {
      winnerPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    } else if (this.dimension === 4) {
      winnerPositions = [
        [0, 1, 2],
        [1, 2, 3],
        [4, 5, 6],
        [5, 6, 7],
        [8, 9, 10],
        [9, 10, 11],
        [12, 13, 14],
        [13, 14, 15],
        [0, 4, 8],
        [1, 5, 9],
        [2, 6, 10],
        [3, 7, 11],
        [4, 8, 12],
        [5, 9, 13],
        [6, 10, 14],
        [7, 11, 15],
        [0, 5, 10],
        [3, 6, 9],
        [5, 10, 15],
        [2, 5, 8],
      ];
    } else if (this.dimension == 5) {
      winnerPositions = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
        [4, 5, 6, 7, 8],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [11, 12, 13, 14, 15],
        [12, 13, 14, 15, 16],
        [13, 14, 15, 16, 17],
        [14, 15, 16, 17, 18],
        [15, 16, 17, 18, 19],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
      ];
    }

    for (const [a, b, c] of winnerPositions) {
      if (
        this.cells[a] !== Player.None &&
        this.cells[a] === this.cells[b] &&
        this.cells[a] === this.cells[c]
      ) {
        this.winner = this.cells[a];
        this.gameOver = true;
        break;
      }
    }
  }

  makeBotMove(): void {
    const availableMoves: number[] = [];
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] === Player.None) {
        availableMoves.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const randomMove = availableMoves[randomIndex];
    setTimeout(() => {
      this.makeMove(randomMove);
    }, 500);
  }

  reset(): void {
    this.cells.fill(Player.None);
    this.currentPlayer = Player.X;
    this.winner = null;
    this.gameOver = false;
  }

  DimensioneTris(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.dimension = parseInt(target.value, 10);
      this.cells = new Array(this.dimension * this.dimension).fill(Player.None);
      this.reset();
    }
  }
  pareggio(): boolean { 
    return !this.cells.includes(Player.None);
  }
}
