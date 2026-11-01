import { difficultyConfig } from './mysteryService.js';
export function calculateScore(difficulty, isCorrect, discoveredCount, hintsUsed) {
  const basePoints = isCorrect ? difficultyConfig(difficulty).base : 0;
  const cluePoints = discoveredCount * 5;
  const hintPenalty = hintsUsed * 10;
  return { basePoints, cluePoints, hintPenalty, total: Math.max(0, basePoints + cluePoints - hintPenalty) };
}
