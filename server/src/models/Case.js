import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema({ id: { type: String, required: true }, name: { type: String, required: true, maxlength: 100 }, role: { type: String, required: true, maxlength: 120 }, relationship: { type: String, required: true, maxlength: 200 }, background: { type: String, required: true, maxlength: 800 }, publicAlibi: { type: String, required: true, maxlength: 500 } }, { _id: false });
const clueSchema = new mongoose.Schema({ id: { type: String, required: true }, title: { type: String, required: true, maxlength: 120 }, description: { type: String, required: true, maxlength: 1000 }, category: { type: String, required: true, maxlength: 60 }, discoveredAt: Date }, { _id: false });
const schema = new mongoose.Schema({
  premise: { type: String, required: true, maxlength: 500 }, title: { type: String, required: true, maxlength: 160 }, story: { type: String, required: true, maxlength: 2000 }, crimeScene: { type: String, required: true, maxlength: 1500 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }, suspects: { type: [suspectSchema], required: true }, clues: { type: [clueSchema], required: true }, hints: { type: [String], required: true },
  solution: { culpritId: { type: String, required: true }, explanation: { type: String, required: true, maxlength: 2000 }, reasoning: { type: [String], required: true } },
  playerProgress: { discoveredClueIds: { type: [String], default: [] }, usedHintCount: { type: Number, default: 0, min: 0 } },
  accusation: { suspectId: String, isCorrect: Boolean, submittedAt: Date }, score: { basePoints: { type: Number, default: 0 }, cluePoints: { type: Number, default: 0 }, hintPenalty: { type: Number, default: 0 }, total: { type: Number, default: 0 } },
  status: { type: String, enum: ['active', 'completed'], default: 'active' }, completedAt: Date
}, { timestamps: true, optimisticConcurrency: true });
schema.pre('validate', function validateCase(next) {
  const unique = (items) => new Set(items.map(item => item.id)).size === items.length;
  if (!unique(this.suspects) || !unique(this.clues)) return next(new Error('Suspect and clue identifiers must be unique.'));
  if (!this.suspects.some(s => s.id === this.solution.culpritId)) return next(new Error('The culprit must belong to the suspect list.'));
  next();
});
export default mongoose.model('Case', schema);
