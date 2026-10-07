export type MuscleGroup = 
  | 'chest' 
  | 'triceps' 
  | 'back' 
  | 'biceps' 
  | 'shoulders' 
  | 'upper_legs' 
  | 'lower_legs_abs';

export interface Exercise {
  id: string;
  seq: string;
  name: string;
  portionKey: string;
  portionBadge: string;
  badgeColor: string;
  volume: string;
  why: string;
  cues: string[];
  step1Name: string;
  step1Img: string;
  step2Name: string;
  step2Img: string;
}

export interface WarmupStep {
  code: string;
  name: string;
  time: string;
  desc: string;
  img: string;
}

export interface CooldownStep {
  code: string;
  name: string;
  time: string;
  desc: string;
  badge: string;
  img: string;
}

export interface PortionOption {
  id: string;
  label: string;
}

export interface MuscleData {
  title: string;
  stats: {
    exercises: number;
    totalSets: string;
    time: string;
  };
  portions: PortionOption[];
  warmup: {
    title: string;
    steps: WarmupStep[];
  };
  cooldown: {
    title: string;
    steps: CooldownStep[];
  };
  exercises: Exercise[];
}
