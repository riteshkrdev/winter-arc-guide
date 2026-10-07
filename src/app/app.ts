import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WorkoutService } from './services/workout.service';
import { MuscleGroup } from './models/workout.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly workoutService = inject(WorkoutService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly muscleOptions: { id: MuscleGroup; label: string; icon: string }[] = [
    { id: 'chest', label: 'Day 1: Chest', icon: '🛡️' },
    { id: 'triceps', label: 'Day 2: Triceps', icon: '💪' },
    { id: 'back', label: 'Day 3: Back', icon: '🦅' },
    { id: 'biceps', label: 'Day 4: Biceps & Forearms', icon: '⚔️' },
    { id: 'shoulders', label: 'Day 5: Shoulders', icon: '🏔️' },
    { id: 'upper_legs', label: 'Day 6: Upper Legs', icon: '🦵' },
    { id: 'lower_legs_abs', label: 'Day 7: Calves & Abs', icon: '⚡' },
  ];

  switchMuscle(muscle: MuscleGroup) {
    this.workoutService.setMuscle(muscle);
  }

  filterPortion(portionId: string) {
    this.workoutService.setPortion(portionId);
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
