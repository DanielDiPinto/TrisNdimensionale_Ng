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
  
    // Controlla le righe
    for (let i = 0; i <= this.dimension - 3; i++) {
      for (let j = 0; j < this.dimension; j++) {
        winnerPositions.push(Array.from({ length: 3 }, (_, index) => (i + index) * this.dimension + j));
      }
    }
  
    // Controlla le colonne
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j <= this.dimension - 3; j++) {
        winnerPositions.push(Array.from({ length: 3 }, (_, index) => i * this.dimension + j + index));
      }
    }
    // Verifica se c'è un vincitore nelle posizioni calcolate
    for (const positions of winnerPositions) {
      const [a, b, c] = positions;
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
