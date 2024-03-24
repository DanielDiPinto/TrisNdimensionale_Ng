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
  cells: Player[] = new Array(this.dimension * this.dimension).fill(Player.None);
  currentPlayer: Player = Player.X;
  winner: Player | null = null;
  gameOver: boolean = false;

  makeMove(index: number): void {
    if (!this.cells[index] && !this.gameOver) {
      this.cells[index] = this.currentPlayer;
      this.checkWinner();
      if (!this.gameOver) {
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
        if (this.currentPlayer === Player.O) {
          this.makeBotMove(); 
        }
      }
    }
  }

  checkWinner(): void {
    const winnerPositions: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

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
}
