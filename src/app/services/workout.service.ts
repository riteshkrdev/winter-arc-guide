import { Injectable, signal, computed } from '@angular/core';
import { MuscleGroup, MuscleData, Exercise } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  readonly activeMuscle = signal<MuscleGroup>('triceps');
  readonly activePortion = signal<string>('all');
  readonly searchQuery = signal<string>('');

  private readonly database: Record<MuscleGroup, MuscleData> = {
  "chest": {
    "title": "Day 1: Chest",
    "stats": {
      "exercises": 6,
      "totalSets": "18",
      "time": "~25 min"
    },
    "portions": [
      {
        "id": "all",
        "label": "All Chest (6)"
      },
      {
        "id": "mid",
        "label": "Mid/Lower Pecs"
      },
      {
        "id": "pushups",
        "label": "Standard Pushups"
      },
      {
        "id": "flyes",
        "label": "Floor Flyes (Stretch)"
      },
      {
        "id": "pullover",
        "label": "Pullover (Ribcage)"
      },
      {
        "id": "squeeze",
        "label": "Hex Squeeze Press"
      },
      {
        "id": "decline",
        "label": "Decline Pushups (Upper)"
      }
    ],
    "warmup": {
      "title": "🔥 Chest Warmup (3 Mins)",
      "steps": [
        {
          "code": "W1",
          "name": "Arm Circles & Hugs",
          "time": "60s",
          "desc": "20 arm circles forward and back, plus cross-chest hugs to lubricate rotator cuffs.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Arm_Circles/0.jpg"
        },
        {
          "code": "W2",
          "name": "Scapular Pushups",
          "time": "10-12 reps",
          "desc": "Arms straight; pinch shoulder blades together, then push upper back to ceiling.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Pushups/0.jpg"
        },
        {
          "code": "W3",
          "name": "Empty Press Groove",
          "time": "15 reps",
          "desc": "Lie down and press empty hands at 45° to build mind-muscle connection.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Floor_Press/0.jpg"
        }
      ]
    },
    "cooldown": {
      "title": "🧊 Chest Cooldown (3 Mins)",
      "steps": [
        {
          "code": "C1",
          "name": "Doorway Pec Stretch",
          "time": "30s / side",
          "desc": "Forearm against doorframe at 90°, step forward gently until chest lengthens.",
          "badge": "Pec Major",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Chest_And_Front_Of_Shoulder_Stretch/0.jpg"
        },
        {
          "code": "C2",
          "name": "Behind-Back Expander",
          "time": "45s hold",
          "desc": "Clasp hands behind hips, roll shoulders down/back, expand the sternum.",
          "badge": "Anterior Capsule",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Round_The_World_Shoulder_Stretch/0.jpg"
        },
        {
          "code": "C3",
          "name": "Dynamic Chest Recovery",
          "time": "60s hold",
          "desc": "Arms wide, deep 4s inhales into ribs, 6s slow exhales to drop heart rate.",
          "badge": "Recovery",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dynamic_Chest_Stretch/0.jpg"
        }
      ]
    },
    "exercises": [
      {
        "id": "ch-1",
        "seq": "#1 FIRST",
        "name": "Dumbbell Floor Press",
        "portionKey": "mid",
        "portionBadge": "Mid & Lower Chest (Compound)",
        "badgeColor": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Main compound mass builder. Floor prevents shoulder hyperextension while loading pecs safely.",
        "cues": [
          "Lie flat on the floor with knees bent and feet planted.",
          "Elbows angled at 45° (not flared out at 90°).",
          "Lower until triceps lightly kiss floor, then press up and squeeze pecs hard."
        ],
        "step1Name": "1. Start / Descent",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Floor_Press/0.jpg",
        "step2Name": "2. Lockout & Squeeze",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Floor_Press/1.jpg"
      },
      {
        "id": "ch-2",
        "seq": "#2 SECOND",
        "name": "Standard Pushups",
        "portionKey": "pushups",
        "portionBadge": "Overall Pectorals & Core",
        "badgeColor": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "volume": "3 Sets × 8–12 Reps • Rest 60s",
        "why": "Bodyweight compound targeting overall pectoral recruitment, core stabilization, and serratus activation.",
        "cues": [
          "Hands slightly wider than shoulder-width, rigid plank from heels to crown.",
          "Lower smoothly until chest is 1–2 inches off the floor.",
          "Drive into the palms and lock out without sagging hips."
        ],
        "step1Name": "1. Plank Start",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Pushups/0.jpg",
        "step2Name": "2. Chest to Floor",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Pushups/1.jpg"
      },
      {
        "id": "ch-3",
        "seq": "#3 THIRD",
        "name": "Dumbbell Floor Flyes",
        "portionKey": "flyes",
        "portionBadge": "Outer Pecs (Horizontal Stretch)",
        "badgeColor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Isolates horizontal chest adduction safely. The floor serves as a built-in safety stop.",
        "cues": [
          "Lie flat, slight 15° bend locked in elbows throughout.",
          "Open wide in a smooth arc until elbows touch the carpet.",
          "Hug dumbbells back together over the chest center."
        ],
        "step1Name": "1. Wide Floor Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Flyes/0.jpg",
        "step2Name": "2. Peak Center Hug",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Flyes/1.jpg"
      },
      {
        "id": "ch-4",
        "seq": "#4 FOURTH",
        "name": "Dumbbell Chest Pullover",
        "portionKey": "pullover",
        "portionBadge": "Upper Clavicular Pec & Ribcage",
        "badgeColor": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Expands the ribcage and elongates the upper chest and serratus anterior under deep stretch.",
        "cues": [
          "Lie on floor or across couch/bed edge, diamond grip cupping 1 dumbbell.",
          "Lower dumbbell backward overhead in a slow controlled arc.",
          "Pull back over chest using pecs, squeezing hard at top."
        ],
        "step1Name": "1. Overhead Arc Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bent-Arm_Dumbbell_Pullover/0.jpg",
        "step2Name": "2. Squeeze Over Chest",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bent-Arm_Dumbbell_Pullover/1.jpg"
      },
      {
        "id": "ch-5",
        "seq": "#5 FIFTH",
        "name": "Dumbbell Squeeze Press (Hex Press)",
        "portionKey": "squeeze",
        "portionBadge": "Inner Pec Squeeze & Sternum Cleft",
        "badgeColor": "bg-rose-500/10 text-rose-400 border-rose-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Continuous isometric tension. Pressing dumbbells together recruits maximal inner pec motor units.",
        "cues": [
          "Lie flat with neutral grip, smash dumbbells firmly together over sternum.",
          "Maintain inward crushing pressure as you lower toward chest.",
          "Press back up maintaining full inward crush at all times."
        ],
        "step1Name": "1. Inward Squeeze Start",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Close-Grip_Dumbbell_Press/0.jpg",
        "step2Name": "2. Crushing Lockout",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Close-Grip_Dumbbell_Press/1.jpg"
      },
      {
        "id": "ch-6",
        "seq": "#6 SIXTH",
        "name": "Decline Pushups",
        "portionKey": "decline",
        "portionBadge": "Upper Clavicular Pectorals",
        "badgeColor": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "volume": "3 Sets × 8–10 Reps • Rest 60s",
        "why": "Shifts bodyweight angle onto the upper clavicular head of the pectorals.",
        "cues": [
          "Elevate feet on couch or chair, hands flat on floor shoulder-width.",
          "Maintain a rigid straight plank line through hips and core.",
          "Lower nose/upper chest to floor, then press up dynamically."
        ],
        "step1Name": "1. Feet Elevated Plank",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Decline_Push-Up/0.jpg",
        "step2Name": "2. Upper Pec Descent",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Decline_Push-Up/1.jpg"
      }
    ]
  },
  "triceps": {
    "title": "Day 2: Triceps",
    "stats": {
      "exercises": 6,
      "totalSets": "18",
      "time": "~25 min"
    },
    "portions": [
      {
        "id": "all",
        "label": "All Triceps (6)"
      },
      {
        "id": "long",
        "label": "Long Head (Overhead)"
      },
      {
        "id": "medial",
        "label": "Medial Head (Press)"
      },
      {
        "id": "all_heads",
        "label": "Diamond Compound"
      },
      {
        "id": "stretch",
        "label": "Skull Crushers"
      },
      {
        "id": "dip",
        "label": "Bench Dips"
      },
      {
        "id": "lateral",
        "label": "Kickbacks (Lateral)"
      }
    ],
    "warmup": {
      "title": "🔥 Triceps Warmup (3 Mins)",
      "steps": [
        {
          "code": "W1",
          "name": "Arm Swings & Elbow Flexions",
          "time": "60s",
          "desc": "Gentle swings and rapid elbow bends to warm triceps tendon and elbow joint capsule.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Arm_Circles/0.jpg"
        },
        {
          "code": "W2",
          "name": "Diamond Wall / Knee Pushup",
          "time": "10-12 reps",
          "desc": "Hands close together on wall or knees to activate triceps muscle fibers.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Push-Ups_-_Close_Triceps_Position/0.jpg"
        },
        {
          "code": "W3",
          "name": "Empty Fist Press Groove",
          "time": "15 reps",
          "desc": "Elbows tucked close to ribs, press empty fists to establish triceps nerve firing.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Floor_Press/0.jpg"
        }
      ]
    },
    "cooldown": {
      "title": "🧊 Triceps Cooldown (3 Mins)",
      "steps": [
        {
          "code": "C1",
          "name": "Overhead Triceps Stretch",
          "time": "30s / side",
          "desc": "Reach elbow overhead, gently pull elbow backward with other hand to lengthen long head.",
          "badge": "Long Head",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Triceps_Stretch/0.jpg"
        },
        {
          "code": "C2",
          "name": "Cross-Body Capsule Stretch",
          "time": "30s / side",
          "desc": "Pull straight arm across chest at shoulder height to relieve lateral head tension.",
          "badge": "Lateral Head",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Chest_And_Front_Of_Shoulder_Stretch/0.jpg"
        },
        {
          "code": "C3",
          "name": "Child's Pose Elbow Bend",
          "time": "60s hold",
          "desc": "Kneel, reach arms forward with hands behind neck to stretch triceps tendons.",
          "badge": "Elbow Health",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Childs_Pose/0.jpg"
        }
      ]
    },
    "exercises": [
      {
        "id": "tri-1",
        "seq": "#1 FIRST",
        "name": "Seated Overhead Dumbbell Extension",
        "portionKey": "long",
        "portionBadge": "Long Head (Max Mass)",
        "badgeColor": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Only overhead positioning fully stretches the triceps long head for maximum hypertrophy.",
        "cues": [
          "Sit upright or kneel, cup 1 dumbbell vertically with diamond hand grip overhead.",
          "Keep elbows pinned facing forward (avoid flaring outward).",
          "Lower dumbbell behind head, feel deep long head stretch, then press to full lockout."
        ],
        "step1Name": "1. Deep Behind-Head Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Triceps_Press/0.jpg",
        "step2Name": "2. Overhead Lockout",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Triceps_Press/1.jpg"
      },
      {
        "id": "tri-2",
        "seq": "#2 SECOND",
        "name": "Close-Grip Dumbbell Floor Press",
        "portionKey": "medial",
        "portionBadge": "Medial & Lateral Heads",
        "badgeColor": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Tucked elbows shift load directly onto the medial and lateral triceps heads.",
        "cues": [
          "Lie flat, dumbbells in neutral grip (palms facing each other).",
          "Tuck elbows tight against your ribs throughout the descent.",
          "Drive up explosively and lock out triceps hard at the peak."
        ],
        "step1Name": "1. Elbows Tucked to Ribs",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Close-Grip_Dumbbell_Press/0.jpg",
        "step2Name": "2. Triceps Lockout",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Close-Grip_Dumbbell_Press/1.jpg"
      },
      {
        "id": "tri-3",
        "seq": "#3 THIRD",
        "name": "Diamond Pushups",
        "portionKey": "all_heads",
        "portionBadge": "All 3 Triceps Heads (Peak Tension)",
        "badgeColor": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "volume": "3 Sets × 8–12 Reps • Rest 60s",
        "why": "Highest EMG muscle activation for triceps among all bodyweight movements.",
        "cues": [
          "Thumbs and index fingers touching under chest in diamond shape.",
          "Lower with elbows tracking backward at 45°.",
          "Push hard through palms, locking out triceps at the top."
        ],
        "step1Name": "1. Diamond Hand Plank",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Push-Ups_-_Close_Triceps_Position/0.jpg",
        "step2Name": "2. Chest to Diamond",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Push-Ups_-_Close_Triceps_Position/1.jpg"
      },
      {
        "id": "tri-4",
        "seq": "#4 FOURTH",
        "name": "Lying Dumbbell Skull Crushers",
        "portionKey": "stretch",
        "portionBadge": "Long Head (Deep Stretch)",
        "badgeColor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Maintains intense tension at the elbow joint through full flexion and extension.",
        "cues": [
          "Lie flat, arms angled slightly backward at 75° (not straight 90°).",
          "Bend only at elbows to lower dumbbells toward temples/ears.",
          "Extend forearms back to starting angle without moving upper arms."
        ],
        "step1Name": "1. Lower to Temples",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Lying_Triceps_Press/0.jpg",
        "step2Name": "2. Full Extension",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Lying_Triceps_Press/1.jpg"
      },
      {
        "id": "tri-5",
        "seq": "#5 FIFTH",
        "name": "Bench / Chair Dips",
        "portionKey": "dip",
        "portionBadge": "Medial & Lateral Heads (Burnout)",
        "badgeColor": "bg-rose-500/10 text-rose-400 border-rose-500/20",
        "volume": "3 Sets × 10–15 Reps • Rest 60s",
        "why": "High repetition pump builder that recruits all remaining motor units.",
        "cues": [
          "Palms on edge of chair/couch, hips close to edge, legs extended.",
          "Lower until elbows reach a 90° angle (avoid over-dropping shoulders).",
          "Drive through palms and lock out triceps aggressively."
        ],
        "step1Name": "1. 90° Elbow Descent",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bench_Dips/0.jpg",
        "step2Name": "2. High Lockout",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bench_Dips/1.jpg"
      },
      {
        "id": "tri-6",
        "seq": "#6 SIXTH",
        "name": "Dumbbell Triceps Kickbacks",
        "portionKey": "lateral",
        "portionBadge": "Lateral Head (Peak Contraction)",
        "badgeColor": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "volume": "3 Sets × 12–15 Reps • Rest 60s",
        "why": "Maximum contraction at the shortest muscle length for extreme muscle cramp and definition.",
        "cues": [
          "Hinge torso at 45°, pin upper arm parallel to torso.",
          "Extend forearm straight back until elbow is locked completely straight.",
          "Pause and squeeze the horseshoe for 1 full second."
        ],
        "step1Name": "1. Forearm at 90°",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Tricep_Dumbbell_Kickback/0.jpg",
        "step2Name": "2. Peak Contraction Lockout",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Tricep_Dumbbell_Kickback/1.jpg"
      }
    ]
  },
  "back": {
    "title": "Day 3: Back",
    "stats": {
      "exercises": 6,
      "totalSets": "18",
      "time": "~25 min"
    },
    "portions": [
      {
        "id": "all",
        "label": "All Back (6)"
      },
      {
        "id": "thickness",
        "label": "Rows (Upper/Mid)"
      },
      {
        "id": "pullover",
        "label": "Back Pullover (Lats)"
      },
      {
        "id": "lats",
        "label": "One-Arm Row (Lower Lat)"
      },
      {
        "id": "traps",
        "label": "Shrugs (Traps)"
      },
      {
        "id": "rdl",
        "label": "Romanian Deadlift"
      },
      {
        "id": "good_morning",
        "label": "Good Mornings"
      }
    ],
    "warmup": {
      "title": "🔥 Back Warmup (3 Mins)",
      "steps": [
        {
          "code": "W1",
          "name": "Cat-Cow Spine Mobilization",
          "time": "60s",
          "desc": "Arch and round back on all fours to lubricate vertebrae and warm spinal erectors.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Cat_Stretch/0.jpg"
        },
        {
          "code": "W2",
          "name": "Overhead Lat & Side Reach",
          "time": "45s / side",
          "desc": "Reach arm overhead and lean sideways to open up the latissimus dorsi.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Overhead_Lat/0.jpg"
        },
        {
          "code": "W3",
          "name": "Hip Hinge Practice Groove",
          "time": "12 reps",
          "desc": "Hinge at hips with hands on chest to lock in neutral spine mechanics for RDLs.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Good_Morning/0.jpg"
        }
      ]
    },
    "cooldown": {
      "title": "🧊 Back Cooldown (3 Mins)",
      "steps": [
        {
          "code": "C1",
          "name": "Extended Child's Pose",
          "time": "45s hold",
          "desc": "Sit back on heels, reach fingertips far forward to decompress lumbar spine.",
          "badge": "Spinal Decompression",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Childs_Pose/0.jpg"
        },
        {
          "code": "C2",
          "name": "Doorframe Lat Lengthener",
          "time": "30s / side",
          "desc": "Grip doorframe with hips pushed away to restore full length to lats.",
          "badge": "Latissimus Dorsi",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Overhead_Lat/1.jpg"
        },
        {
          "code": "C3",
          "name": "Upper Back & Scapular Stretch",
          "time": "45s hold",
          "desc": "Clasp hands forward, round upper back and tuck chin to spread rhomboids.",
          "badge": "Rhomboids & Traps",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Upper_Back_Stretch/0.jpg"
        }
      ]
    },
    "exercises": [
      {
        "id": "bk-1",
        "seq": "#1 FIRST",
        "name": "Bent-Over Dumbbell Rows",
        "portionKey": "thickness",
        "portionBadge": "Upper & Mid Back (Thickness)",
        "badgeColor": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Primary mass builder for back thickness, loading lats, rhomboids, and mid-traps simultaneously.",
        "cues": [
          "Hinge hips back at 45°, chest proud, spine locked neutral.",
          "Pull elbows back toward hip pockets (not straight up to ears).",
          "Squeeze shoulder blades together hard at the top."
        ],
        "step1Name": "1. Hinge & Hanging Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bent_Over_Two-Dumbbell_Row/0.jpg",
        "step2Name": "2. Elbows Driven to Hips",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bent_Over_Two-Dumbbell_Row/1.jpg"
      },
      {
        "id": "bk-2",
        "seq": "#2 SECOND",
        "name": "Dumbbell Back Pullover",
        "portionKey": "pullover",
        "portionBadge": "Lats Stretch & Serratus Arc",
        "badgeColor": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Essential lat-width movement that provides pure lat elongation without arm flexor fatigue.",
        "cues": [
          "Lie across couch/floor, cup dumbbell overhead with diamond grip.",
          "Slight bend in elbows locked, sweep dumbbell backward overhead.",
          "Pull back using lat engagement only, stopping directly above chin."
        ],
        "step1Name": "1. Deep Overhead Lat Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bent-Arm_Dumbbell_Pullover/0.jpg",
        "step2Name": "2. Lat Contraction Finish",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Bent-Arm_Dumbbell_Pullover/1.jpg"
      },
      {
        "id": "bk-3",
        "seq": "#3 THIRD",
        "name": "One-Arm Dumbbell Row",
        "portionKey": "lats",
        "portionBadge": "Lower Latissimus & Mid Back",
        "badgeColor": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Unilateral focus eliminates muscle imbalances and maximizes range of motion for lower lats.",
        "cues": [
          "Support opposite hand and knee on couch or sturdy chair.",
          "Let dumbbell hang down for deep stretch at the bottom.",
          "Drive elbow backward toward waist, squeezing lat tightly."
        ],
        "step1Name": "1. Full Hang Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/One-Arm_Dumbbell_Row/0.jpg",
        "step2Name": "2. Elbow Back Peak Squeeze",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/One-Arm_Dumbbell_Row/1.jpg"
      },
      {
        "id": "bk-4",
        "seq": "#4 FOURTH",
        "name": "Standing Dumbbell Shrugs",
        "portionKey": "traps",
        "portionBadge": "Upper Trapezius",
        "badgeColor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "volume": "3 Sets × 12–15 Reps • Rest 60s",
        "why": "Builds upper trapezius thickness and collarbone/neck frame definition.",
        "cues": [
          "Stand tall, dumbbells hanging at sides with neutral grip.",
          "Elevate shoulders straight up toward ears (do NOT roll shoulders).",
          "Pause for 1 second at peak elevation, then lower under control."
        ],
        "step1Name": "1. Dead Hang Starting Position",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Shrug/0.jpg",
        "step2Name": "2. Shoulders to Ears Peak",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Shrug/1.jpg"
      },
      {
        "id": "bk-5",
        "seq": "#5 FIFTH",
        "name": "Dumbbell Romanian Deadlift (RDL)",
        "portionKey": "rdl",
        "portionBadge": "Posterior Chain (Spinal Erectors & Hamstrings)",
        "badgeColor": "bg-rose-500/10 text-rose-400 border-rose-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Key posterior chain movement that builds resilient lower back spinal erectors.",
        "cues": [
          "Feet hip-width, knees soft with fixed 15° bend.",
          "Push hips backward as dumbbells skim close to your shins.",
          "Stop below knees when hamstrings stretch, drive hips forward to lockout."
        ],
        "step1Name": "1. Upright Lockout Setup",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Romanian_Deadlift/0.jpg",
        "step2Name": "2. Deep Hip Hinge Descent",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Romanian_Deadlift/1.jpg"
      },
      {
        "id": "bk-6",
        "seq": "#6 SIXTH",
        "name": "Dumbbell Good Mornings",
        "portionKey": "good_morning",
        "portionBadge": "Lumbar Stabilizers & Hip Extension",
        "badgeColor": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Executed sequentially after RDL to isolate pure hip hinge mechanics and strengthen lower back stabilizers.",
        "cues": [
          "Hold dumbbells securely at chest or shoulders, soft bend in knees.",
          "Push buttocks back toward the wall behind you with spine flat.",
          "Hinge until torso is nearly parallel to floor, then contract glutes/lower back to stand."
        ],
        "step1Name": "1. Upright Starting Posture",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Good_Morning/0.jpg",
        "step2Name": "2. 90° Hip Hinge Extension",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Good_Morning/1.jpg"
      }
    ]
  },
  "biceps": {
    "title": "Day 4: Biceps & Forearms",
    "stats": {
      "exercises": 6,
      "totalSets": "18",
      "time": "~25 min"
    },
    "portions": [
      {
        "id": "all",
        "label": "All Arms (6)"
      },
      {
        "id": "short",
        "label": "Bicep Peak (Supinated)"
      },
      {
        "id": "brachialis",
        "label": "Hammer Curls"
      },
      {
        "id": "isolation",
        "label": "Concentration Curls"
      },
      {
        "id": "brachioradialis",
        "label": "Reverse Curls"
      },
      {
        "id": "flexors",
        "label": "Palms-Up Wrist Curls"
      },
      {
        "id": "extensors",
        "label": "Palms-Down Wrist Curls"
      }
    ],
    "warmup": {
      "title": "🔥 Biceps & Forearms Warmup (3 Mins)",
      "steps": [
        {
          "code": "W1",
          "name": "Wrist Rotations & Forearm Waves",
          "time": "60s",
          "desc": "Roll wrists clockwise/counterclockwise, open/close fingers rapidly to circulate blood.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Wrist_Circles/0.jpg"
        },
        {
          "code": "W2",
          "name": "Empty Bicep Curls Groove",
          "time": "15 reps",
          "desc": "Curl empty fists, focusing on full supination at the peak to prime the biceps tendon.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Bicep_Curl/0.jpg"
        },
        {
          "code": "W3",
          "name": "Arm Circles & Dynamic Swings",
          "time": "45s",
          "desc": "Shoulder and elbow dynamic swings to loosen connective tissue around the joint.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Arm_Circles/0.jpg"
        }
      ]
    },
    "cooldown": {
      "title": "🧊 Biceps & Forearms Cooldown (3 Mins)",
      "steps": [
        {
          "code": "C1",
          "name": "Wrist Extensor Pull Stretch",
          "time": "30s / arm",
          "desc": "Arm straight, gently pull fingers backward with other hand to stretch wrist flexors.",
          "badge": "Forearm Flexors",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Side_Wrist_Pull/0.jpg"
        },
        {
          "code": "C2",
          "name": "Reverse Wrist Stretch",
          "time": "30s / arm",
          "desc": "Arm straight, press palm down to stretch the top of forearms (brachioradialis).",
          "badge": "Forearm Extensors",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Wrist_Circles/1.jpg"
        },
        {
          "code": "C3",
          "name": "Overhead Arm Hang Stretch",
          "time": "45s hold",
          "desc": "Grip doorframe overhead with thumb pointing back to lengthen bicep head.",
          "badge": "Biceps Tendon",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Overhead_Lat/0.jpg"
        }
      ]
    },
    "exercises": [
      {
        "id": "bi-1",
        "seq": "#1 FIRST",
        "name": "Standing Dumbbell Bicep Curls",
        "portionKey": "short",
        "portionBadge": "Short Head & Overall Biceps",
        "badgeColor": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Foundation mass movement. Supinating pinky outward activates maximal bicep motor units.",
        "cues": [
          "Stand tall, elbows pinned to sides without swinging.",
          "Curl dumbbells up, rotating palms fully upward (supinate) at midpoint.",
          "Squeeze at the top, lower smoothly over 2 full seconds."
        ],
        "step1Name": "1. Full Hang Extension",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Bicep_Curl/0.jpg",
        "step2Name": "2. Peak Supination Squeeze",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Bicep_Curl/1.jpg"
      },
      {
        "id": "bi-2",
        "seq": "#2 SECOND",
        "name": "Dumbbell Hammer Curls",
        "portionKey": "brachialis",
        "portionBadge": "Brachialis & Outer Bicep (Arm Thickness)",
        "badgeColor": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Neutral grip targets the brachialis muscle beneath the biceps, pushing the bicep peak upward.",
        "cues": [
          "Palms face each other throughout the entire movement.",
          "Keep elbows locked by your ribs (no front swinging).",
          "Drive dumbbell head toward shoulder and hold peak contraction."
        ],
        "step1Name": "1. Neutral Grip Hang",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Alternate_Hammer_Curl/0.jpg",
        "step2Name": "2. Hammer Head Peak",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Alternate_Hammer_Curl/1.jpg"
      },
      {
        "id": "bi-3",
        "seq": "#3 THIRD",
        "name": "Seated Dumbbell Concentration Curls",
        "portionKey": "isolation",
        "portionBadge": "Biceps Peak Isolation",
        "badgeColor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Elbow braced against inner thigh completely eliminates momentum for pure bicep recruitment.",
        "cues": [
          "Sit on chair, brace elbow against inner thigh above the knee.",
          "Curl dumbbell up smoothly without moving upper body.",
          "Squeeze peak hard for 1 second, lower under strict control."
        ],
        "step1Name": "1. Inner Thigh Braced",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Concentration_Curls/0.jpg",
        "step2Name": "2. Peak Isolation Squeeze",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Concentration_Curls/1.jpg"
      },
      {
        "id": "bi-4",
        "seq": "#4 FOURTH",
        "name": "Dumbbell Reverse Curls (Pronated)",
        "portionKey": "brachioradialis",
        "portionBadge": "Brachioradialis & Forearm Meat",
        "badgeColor": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Overhand grip places bicep at mechanical disadvantage, forcing the forearm brachioradialis to build thickness.",
        "cues": [
          "Overhand grip (palms facing downward toward feet).",
          "Curl upward with steady control, keeping wrists straight.",
          "Control the descent to build grip and forearm endurance."
        ],
        "step1Name": "1. Overhand Grip Hang",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Standing_Dumbbell_Reverse_Curl/0.jpg",
        "step2Name": "2. Pronated Forearm Flex",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Standing_Dumbbell_Reverse_Curl/1.jpg"
      },
      {
        "id": "bi-5",
        "seq": "#5 FIFTH",
        "name": "Palms-Up Dumbbell Wrist Curls",
        "portionKey": "flexors",
        "portionBadge": "Wrist Flexors (Inner Forearm)",
        "badgeColor": "bg-rose-500/10 text-rose-400 border-rose-500/20",
        "volume": "3 Sets × 15–20 Reps • Rest 45s",
        "why": "Directly targets inner forearm flexors, increasing crush grip strength.",
        "cues": [
          "Forearms rested flat across thighs or couch with wrists hanging off edge.",
          "Let dumbbell roll down to fingertips for full stretch.",
          "Curl wrists upward tightly and hold peak contraction."
        ],
        "step1Name": "1. Fingertip Roll Down",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Dumbbell_Palms-Up_Wrist_Curl/0.jpg",
        "step2Name": "2. Upward Wrist Curl",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Dumbbell_Palms-Up_Wrist_Curl/1.jpg"
      },
      {
        "id": "bi-6",
        "seq": "#6 SIXTH",
        "name": "Palms-Down Reverse Wrist Curls",
        "portionKey": "extensors",
        "portionBadge": "Wrist Extensors (Top Forearm)",
        "badgeColor": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "volume": "3 Sets × 15–20 Reps • Rest 45s",
        "why": "Builds the top side of the forearm, preventing elbow tendinitis and balancing forearm symmetry.",
        "cues": [
          "Forearms on thighs, palms facing downward over knee edge.",
          "Lower dumbbell until wrist flexes downward.",
          "Lift knuckles toward ceiling using pure forearm extensor force."
        ],
        "step1Name": "1. Knuckles Downward Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Dumbbell_Palms-Down_Wrist_Curl/0.jpg",
        "step2Name": "2. Knuckles Upward Contraction",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Dumbbell_Palms-Down_Wrist_Curl/1.jpg"
      }
    ]
  },
  "shoulders": {
    "title": "Day 5: Shoulders",
    "stats": {
      "exercises": 6,
      "totalSets": "18",
      "time": "~25 min"
    },
    "portions": [
      {
        "id": "all",
        "label": "All Shoulders (6)"
      },
      {
        "id": "overhead",
        "label": "Overhead Press"
      },
      {
        "id": "lateral",
        "label": "Lateral Raises (Width)"
      },
      {
        "id": "rear",
        "label": "Rear Delt Flyes"
      },
      {
        "id": "front",
        "label": "Front Raises"
      },
      {
        "id": "arnold",
        "label": "Arnold Press"
      },
      {
        "id": "upright_row",
        "label": "Dumbbell Upright Rows"
      }
    ],
    "warmup": {
      "title": "🔥 Shoulders Warmup (3 Mins)",
      "steps": [
        {
          "code": "W1",
          "name": "Arm Circles & Shoulder Rotations",
          "time": "60s",
          "desc": "Small to large arm circles forward/reverse to lubricate the glenohumeral joint.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Shoulder_Circles/0.jpg"
        },
        {
          "code": "W2",
          "name": "Scapular Shrugs & Rolls",
          "time": "12 reps",
          "desc": "Roll shoulders up, back, and down to activate upper traps and serratus anterior.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Shrug/0.jpg"
        },
        {
          "code": "W3",
          "name": "Wall / Doorway Angels",
          "time": "12 reps",
          "desc": "Back against wall, glide elbows and wrists up overhead without arching lower back.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Round_The_World_Shoulder_Stretch/0.jpg"
        }
      ]
    },
    "cooldown": {
      "title": "🧊 Shoulders Cooldown (3 Mins)",
      "steps": [
        {
          "code": "C1",
          "name": "Cross-Body Shoulder Stretch",
          "time": "30s / side",
          "desc": "Pull straight arm across chest to release posterior shoulder capsule.",
          "badge": "Rear Deltoid",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Chest_And_Front_Of_Shoulder_Stretch/0.jpg"
        },
        {
          "code": "C2",
          "name": "Behind-the-Back Shoulder Clasp",
          "time": "30s / side",
          "desc": "Clasp hands behind back, lift chest to open anterior delts and pectoralis minor.",
          "badge": "Anterior Deltoid",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Behind_Head_Chest_Stretch/0.jpg"
        },
        {
          "code": "C3",
          "name": "Child's Pose Shoulder Decompression",
          "time": "60s hold",
          "desc": "Sink hips back, press palms down into floor to release shoulder girdle tension.",
          "badge": "Joint Health",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Childs_Pose/0.jpg"
        }
      ]
    },
    "exercises": [
      {
        "id": "sh-1",
        "seq": "#1 FIRST",
        "name": "Seated Dumbbell Shoulder Press",
        "portionKey": "overhead",
        "portionBadge": "Anterior & Lateral Deltoids (Compound)",
        "badgeColor": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Heavy compound overhead press builds foundational shoulder mass and strength.",
        "cues": [
          "Sit upright on chair/couch, core braced, dumbbells at ear level.",
          "Press overhead in slight inward arc without clanking dumbbells.",
          "Lower under control to 90° ear level."
        ],
        "step1Name": "1. Dumbbells at Ear Height",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Shoulder_Press/0.jpg",
        "step2Name": "2. Overhead Press Lockout",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Shoulder_Press/1.jpg"
      },
      {
        "id": "sh-2",
        "seq": "#2 SECOND",
        "name": "Standing Dumbbell Lateral Raises",
        "portionKey": "lateral",
        "portionBadge": "Lateral Deltoids (Shoulder Width)",
        "badgeColor": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "volume": "3 Sets × 12–15 Reps • Rest 60s",
        "why": "Key movement for the V-taper aesthetic, broadening the side delts.",
        "cues": [
          "Slight forward lean (10°), lead with elbows, slight elbow bend.",
          "Raise out to sides until parallel to floor (avoid raising higher than shoulders).",
          "Pour a glass of water at the peak, lower with slow 2s tempo."
        ],
        "step1Name": "1. Resting at Sides",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Side_Lateral_Raise/0.jpg",
        "step2Name": "2. Lateral Sweep to Parallel",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Side_Lateral_Raise/1.jpg"
      },
      {
        "id": "sh-3",
        "seq": "#3 THIRD",
        "name": "Seated Bent-Over Rear Delt Flyes",
        "portionKey": "rear",
        "portionBadge": "Posterior Deltoids (3D Roundness)",
        "badgeColor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "volume": "3 Sets × 12–15 Reps • Rest 60s",
        "why": "Builds the rear delts to prevent forward-rounded shoulder posture.",
        "cues": [
          "Sit on edge of chair, hinge chest forward onto thighs.",
          "Keep elbows slightly bent, sweep arms wide like wings.",
          "Squeeze the back of shoulders hard without using momentum."
        ],
        "step1Name": "1. Torso on Thighs",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Bent-Over_Rear_Delt_Raise/0.jpg",
        "step2Name": "2. Wide Rear Wing Sweep",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Seated_Bent-Over_Rear_Delt_Raise/1.jpg"
      },
      {
        "id": "sh-4",
        "seq": "#4 FOURTH",
        "name": "Front Dumbbell Raises",
        "portionKey": "front",
        "portionBadge": "Anterior Deltoids",
        "badgeColor": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Isolates the front delt head for complete 3D shoulder shape.",
        "cues": [
          "Stand tall, raise dumbbell directly forward to eye level.",
          "Keep torso still with zero backward body rocking.",
          "Lower smoothly to thighs."
        ],
        "step1Name": "1. Dumbbell on Thighs",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Front_Dumbbell_Raise/0.jpg",
        "step2Name": "2. Eye Level Raise",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Front_Dumbbell_Raise/1.jpg"
      },
      {
        "id": "sh-5",
        "seq": "#5 FIFTH",
        "name": "Dumbbell Arnold Press",
        "portionKey": "arnold",
        "portionBadge": "Full Deltoid Rotation",
        "badgeColor": "bg-rose-500/10 text-rose-400 border-rose-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Rotational movement recruits all three heads through an extended range of motion.",
        "cues": [
          "Start with dumbbells in front of chest, palms facing your face.",
          "Rotate wrists outward as you press overhead.",
          "Finish with palms facing forward overhead, reverse rotation down."
        ],
        "step1Name": "1. Palms Facing Face",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Arnold_Dumbbell_Press/0.jpg",
        "step2Name": "2. Rotated Overhead Finish",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Arnold_Dumbbell_Press/1.jpg"
      },
      {
        "id": "sh-6",
        "seq": "#6 SIXTH",
        "name": "Dumbbell Upright Rows",
        "portionKey": "upright_row",
        "portionBadge": "Lateral Deltoids & Upper Traps",
        "badgeColor": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Vertical pulling mass builder that targets the side delts and upper traps, completing 3D shoulder shape without overhead strain or awkward body inversions.",
        "cues": [
          "Stand tall with feet shoulder-width, holding dumbbells in front of thighs with an overhand grip.",
          "Pull straight up along the front of your torso, leading with your elbows high and flared out wide.",
          "Lift until dumbbells reach mid-chest level (elbows at or slightly above shoulder level), pause for 1 second, and lower smoothly under control."
        ],
        "step1Name": "1. Thigh-Level Starting Hang",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Standing_Dumbbell_Upright_Row/0.jpg",
        "step2Name": "2. High-Elbows Peak Pull",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Standing_Dumbbell_Upright_Row/1.jpg"
      }
    ]
  },
  "upper_legs": {
    "title": "Day 6: Upper Legs",
    "stats": {
      "exercises": 6,
      "totalSets": "18",
      "time": "~25 min"
    },
    "portions": [
      {
        "id": "all",
        "label": "All Legs (6)"
      },
      {
        "id": "quads",
        "label": "Goblet Squats (Quads)"
      },
      {
        "id": "hamstrings",
        "label": "Romanian Deadlift"
      },
      {
        "id": "unilateral",
        "label": "Walking Lunges"
      },
      {
        "id": "bulgarian",
        "label": "Bulgarian Split Squats"
      },
      {
        "id": "adductors",
        "label": "Sumo Squats"
      },
      {
        "id": "isometric",
        "label": "Dumbbell Squat Hold"
      }
    ],
    "warmup": {
      "title": "🔥 Upper Legs Warmup (3 Mins)",
      "steps": [
        {
          "code": "W1",
          "name": "Bodyweight Air Squats",
          "time": "15 reps",
          "desc": "Smooth air squats to full depth to warm knees, hips, and ankles.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Squat/0.jpg"
        },
        {
          "code": "W2",
          "name": "Dynamic Lunges & Leg Swings",
          "time": "60s",
          "desc": "Front/back and lateral leg swings to open hip flexors and groin.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Lunge_Pass_Through/0.jpg"
        },
        {
          "code": "W3",
          "name": "Deep Squat Pry & Hip Openers",
          "time": "45s hold",
          "desc": "Sit deep in bottom of squat, press knees out with elbows to open adductors.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Adductor_Groin/0.jpg"
        }
      ]
    },
    "cooldown": {
      "title": "🧊 Upper Legs Cooldown (3 Mins)",
      "steps": [
        {
          "code": "C1",
          "name": "Standing / Kneeling Quad Stretch",
          "time": "30s / leg",
          "desc": "Pull ankle to glute, push hips slightly forward to stretch quadriceps and hip flexor.",
          "badge": "Quadriceps",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/All_Fours_Quad_Stretch/0.jpg"
        },
        {
          "code": "C2",
          "name": "90/90 Hamstring Stretch",
          "time": "45s / leg",
          "desc": "Hinge forward with straight spine over extended leg to lengthen hamstring bellies.",
          "badge": "Hamstrings",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/90_90_Hamstring/0.jpg"
        },
        {
          "code": "C3",
          "name": "Adductor / Groin Stretch",
          "time": "45s hold",
          "desc": "Wide stance, shift weight to side to release inner thigh adductors.",
          "badge": "Adductors & Hips",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Adductor_Groin/1.jpg"
        }
      ]
    },
    "exercises": [
      {
        "id": "leg-1",
        "seq": "#1 FIRST",
        "name": "Dumbbell Goblet Squat",
        "portionKey": "quads",
        "portionBadge": "Quadriceps & Glute Mass",
        "badgeColor": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Front-loaded weight reinforces an upright torso, maximizing quad tension while protecting the lower back.",
        "cues": [
          "Hold 1 heavy dumbbell vertically against chest with palms cupping top bell.",
          "Feet shoulder-width, toes turned out 15°.",
          "Squat deep between knees until thighs hit parallel, drive through mid-foot."
        ],
        "step1Name": "1. Chest-Loaded Stance",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Goblet_Squat/0.jpg",
        "step2Name": "2. Deep Parallel Squat",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Goblet_Squat/1.jpg"
      },
      {
        "id": "leg-2",
        "seq": "#2 SECOND",
        "name": "Dumbbell Romanian Deadlift",
        "portionKey": "hamstrings",
        "portionBadge": "Hamstrings & Glute Fold",
        "badgeColor": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 90s",
        "why": "Loaded eccentric stretch on the hamstrings triggers rapid muscle growth.",
        "cues": [
          "Feet hip-width, knees softly unlocked with fixed 15° bend.",
          "Hinge hips straight backward as dumbbells travel down shins.",
          "Squeeze glutes and hamstrings to snap hips forward to standing."
        ],
        "step1Name": "1. Upright Stance",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Romanian_Deadlift/0.jpg",
        "step2Name": "2. Deep Hamstring Stretch",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Romanian_Deadlift/1.jpg"
      },
      {
        "id": "leg-3",
        "seq": "#3 THIRD",
        "name": "Dumbbell Walking / Reverse Lunges",
        "portionKey": "unilateral",
        "portionBadge": "Unilateral Quad & Glute Focus",
        "badgeColor": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "volume": "3 Sets × 10 Reps / Leg • Rest 60s",
        "why": "Eliminates leg strength disparities, builds knee stability and dynamic hip drive.",
        "cues": [
          "Hold dumbbells at sides, step back smoothly into lunge.",
          "Lower until back knee gently hovers 1 inch off floor (both knees at 90°).",
          "Drive into front heel to return to start."
        ],
        "step1Name": "1. Upright Dumbbell Stance",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Lunges/0.jpg",
        "step2Name": "2. Deep 90° Knee Lunge",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Lunges/1.jpg"
      },
      {
        "id": "leg-4",
        "seq": "#4 FOURTH",
        "name": "Dumbbell Bulgarian Split Squats",
        "portionKey": "bulgarian",
        "portionBadge": "Quad Tear & Glute Max Overload",
        "badgeColor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "volume": "3 Sets × 8–10 Reps / Leg • Rest 90s",
        "why": "Most demanding leg builder for home training, placing intense isolation load on the working quad.",
        "cues": [
          "Rear foot elevated on couch or chair, front foot placed forward.",
          "Lower hips down and slightly back until front thigh is parallel.",
          "Push through front foot without letting front knee collapse inward."
        ],
        "step1Name": "1. Rear Foot Elevated",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Split_Squat_with_Dumbbells/0.jpg",
        "step2Name": "2. Deep Working Quad Descent",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Split_Squat_with_Dumbbells/1.jpg"
      },
      {
        "id": "leg-5",
        "seq": "#5 FIFTH",
        "name": "Dumbbell Sumo Squats",
        "portionKey": "adductors",
        "portionBadge": "Inner Thighs (Adductors) & Glutes",
        "badgeColor": "bg-rose-500/10 text-rose-400 border-rose-500/20",
        "volume": "3 Sets × 10–12 Reps • Rest 60s",
        "why": "Wide stance targets inner thigh adductors and gluteus medius for balanced leg development.",
        "cues": [
          "Wide stance (1.5x shoulder width), toes flared out at 45°.",
          "Hold 1 heavy dumbbell hanging between legs.",
          "Knees track outward in line with toes throughout the squat."
        ],
        "step1Name": "1. Wide Sumo Stance",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Plie_Dumbbell_Squat/0.jpg",
        "step2Name": "2. Deep Adductor Stretch",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Plie_Dumbbell_Squat/1.jpg"
      },
      {
        "id": "leg-6",
        "seq": "#6 SIXTH",
        "name": "Dumbbell Squat Hold / Wall Sit",
        "portionKey": "isometric",
        "portionBadge": "Isometric Quad Burnout & Tendon Health",
        "badgeColor": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "volume": "3 Sets × 30–45s Hold • Rest 60s",
        "why": "Isometric time-under-tension floods quads with blood and reinforces patellar tendon strength.",
        "cues": [
          "Back flat against wall or free squat hold at 90° thigh level.",
          "Hold dumbbells on thighs or at chest for added resistance.",
          "Breathe steadily, keeping weight balanced through mid-foot."
        ],
        "step1Name": "1. Setup at Parallel",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Squat/0.jpg",
        "step2Name": "2. 90° Isometric Hold",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Squat/1.jpg"
      }
    ]
  },
  "lower_legs_abs": {
    "title": "Day 7: Calves & Abs",
    "stats": {
      "exercises": 6,
      "totalSets": "18",
      "time": "~25 min"
    },
    "portions": [
      {
        "id": "all",
        "label": "All Calves & Abs (6)"
      },
      {
        "id": "gastrocnemius",
        "label": "Standing Calf Raises"
      },
      {
        "id": "soleus",
        "label": "Seated Calf Raises"
      },
      {
        "id": "upper_abs",
        "label": "Floor Crunches"
      },
      {
        "id": "obliques",
        "label": "Russian Twists"
      },
      {
        "id": "lower_abs",
        "label": "Lying Leg Raises"
      },
      {
        "id": "core_brace",
        "label": "Plank Hold"
      }
    ],
    "warmup": {
      "title": "🔥 Calves & Abs Warmup (3 Mins)",
      "steps": [
        {
          "code": "W1",
          "name": "Ankle Circles & Calf Bounces",
          "time": "60s",
          "desc": "Roll ankles both ways, perform light calf bounces to warm Achilles tendon.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Ankle_Circles/0.jpg"
        },
        {
          "code": "W2",
          "name": "Cat-Cow Spine Mobilization",
          "time": "45s",
          "desc": "Arch and round spine to awaken core stabilizers and loosen lumbar spine.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Cat_Stretch/0.jpg"
        },
        {
          "code": "W3",
          "name": "Deadbug Core Primer",
          "time": "12 reps",
          "desc": "Opposite arm and leg reach while pressing lower back flat into the floor.",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dead_Bug/0.jpg"
        }
      ]
    },
    "cooldown": {
      "title": "🧊 Calves & Abs Cooldown (3 Mins)",
      "steps": [
        {
          "code": "C1",
          "name": "Standing Wall Calf Stretch",
          "time": "30s / leg",
          "desc": "Step back, press rear heel firmly into floor with straight knee to lengthen gastrocnemius.",
          "badge": "Gastrocnemius",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Standing_Gastrocnemius_Calf_Stretch/0.jpg"
        },
        {
          "code": "C2",
          "name": "Abdominal Bridge / Cobra Stretch",
          "time": "45s hold",
          "desc": "Gentle pelvic tilt and abdominal extension to lengthen rectus abdominis.",
          "badge": "Rectus Abdominis",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Pelvic_Tilt_Into_Bridge/0.jpg"
        },
        {
          "code": "C3",
          "name": "Child's Pose Full Relax",
          "time": "60s hold",
          "desc": "Hips to heels, arms outstretched, deep slow diaphragmatic breathing.",
          "badge": "Total Recovery",
          "img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Childs_Pose/0.jpg"
        }
      ]
    },
    "exercises": [
      {
        "id": "ca-1",
        "seq": "#1 FIRST",
        "name": "Standing Dumbbell Single-Leg Calf Raises",
        "portionKey": "gastrocnemius",
        "portionBadge": "Gastrocnemius (Calf Diamond)",
        "badgeColor": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "volume": "3 Sets × 15–20 Reps / Leg • Rest 45s",
        "why": "Straight-knee calf raise targets the outer diamond head (gastrocnemius).",
        "cues": [
          "Ball of foot on book or edge of step, hold 1 dumbbell in working side hand.",
          "Drop heel down below step level for deep Achilles stretch.",
          "Explode up onto big toe ball, hold peak contraction for 1 full second."
        ],
        "step1Name": "1. Deep Heel Drop Stretch",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Standing_Dumbbell_Calf_Raise/0.jpg",
        "step2Name": "2. Peak Big-Toe Squeeze",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Standing_Dumbbell_Calf_Raise/1.jpg"
      },
      {
        "id": "ca-2",
        "seq": "#2 SECOND",
        "name": "Seated Dumbbell Calf Raises",
        "portionKey": "soleus",
        "portionBadge": "Soleus (Lower Calf Width)",
        "badgeColor": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "volume": "3 Sets × 15–20 Reps • Rest 45s",
        "why": "Bent-knee positioning slackens the gastrocnemius, forcing the underlying soleus to work.",
        "cues": [
          "Sit on chair, balls of feet elevated on book, dumbbells rested on knees.",
          "Drop heels down deep into full calf stretch.",
          "Push through balls of feet and squeeze lower calves at peak."
        ],
        "step1Name": "1. Seated Heel Drop",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Seated_One-Leg_Calf_Raise/0.jpg",
        "step2Name": "2. Seated Ball-of-Foot Squeeze",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Dumbbell_Seated_One-Leg_Calf_Raise/1.jpg"
      },
      {
        "id": "ca-3",
        "seq": "#3 THIRD",
        "name": "Dumbbell Floor Crunches",
        "portionKey": "upper_abs",
        "portionBadge": "Upper Rectus Abdominis",
        "badgeColor": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "volume": "3 Sets × 15–20 Reps • Rest 45s",
        "why": "Forces true thoracic spine flexion, loading the upper abdominal wall without hip flexor takeover.",
        "cues": [
          "Lie flat, knees bent, dumbbell held securely on chest or overhead.",
          "Exhale hard and curl ribs down toward your pelvis.",
          "Pause and squeeze abs tightly at the peak, do not pull with neck."
        ],
        "step1Name": "1. Flat Floor Setup",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Crunch_-_Hands_Overhead/0.jpg",
        "step2Name": "2. Peak Rib-to-Pelvis Flex",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Crunch_-_Hands_Overhead/1.jpg"
      },
      {
        "id": "ca-4",
        "seq": "#4 FOURTH",
        "name": "Dumbbell Russian Twists",
        "portionKey": "obliques",
        "portionBadge": "Obliques & Transverse Abdominis",
        "badgeColor": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "volume": "3 Sets × 20 Total Twists • Rest 45s",
        "why": "Builds rotational core stability and carves the side waistline.",
        "cues": [
          "Sit in 'V' shape with torso angled back at 45°, heels lightly touching floor.",
          "Hold dumbbell with both hands, rotate shoulders fully to tap weight beside hip.",
          "Control the rotation without rocking hips."
        ],
        "step1Name": "1. V-Sit Center Balance",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Russian_Twist/0.jpg",
        "step2Name": "2. Full Torso Rotation Tap",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Russian_Twist/1.jpg"
      },
      {
        "id": "ca-5",
        "seq": "#5 FIFTH",
        "name": "Lying Leg Raises",
        "portionKey": "lower_abs",
        "portionBadge": "Lower Abdominal Wall",
        "badgeColor": "bg-rose-500/10 text-rose-400 border-rose-500/20",
        "volume": "3 Sets × 12–15 Reps • Rest 45s",
        "why": "Posterior pelvic tilt recruits the stubborn lower abdominal fibers.",
        "cues": [
          "Lie flat, hands under glutes, lower back glued firmly to floor.",
          "Raise legs straight up until perpendicular to floor.",
          "Lower legs under control, stopping 2 inches before floor without arching back."
        ],
        "step1Name": "1. 2 Inches Off Floor",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Flat_Bench_Lying_Leg_Raise/0.jpg",
        "step2Name": "2. Vertical Pelvic Tilt Lift",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Flat_Bench_Lying_Leg_Raise/1.jpg"
      },
      {
        "id": "ca-6",
        "seq": "#6 SIXTH",
        "name": "Core Plank Hold",
        "portionKey": "core_brace",
        "portionBadge": "Total Core Anti-Extension Stability",
        "badgeColor": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "volume": "3 Sets × 45–60s Hold • Rest 45s",
        "why": "Develops deep transverse abdominis endurance and rigid spinal protection.",
        "cues": [
          "Forearms on floor under shoulders, body in rock-solid plank.",
          "Squeeze glutes and quads tight, pull belly button into spine.",
          "Breathe calmly while maintaining maximum anti-extension tension."
        ],
        "step1Name": "1. Forearm Plank Setup",
        "step1Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Plank/0.jpg",
        "step2Name": "2. Full Rigid Plank Tension",
        "step2Img": "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Plank/1.jpg"
      }
    ]
  }
};

  readonly currentMuscleData = computed(() => this.database[this.activeMuscle()]);

  readonly filteredExercises = computed<Exercise[]>(() => {
    const data = this.currentMuscleData();
    if (!data?.exercises) return [];
    const portion = this.activePortion();
    const query = this.searchQuery().trim().toLowerCase();

    return data.exercises.filter(ex => {
      const matchPortion = portion === 'all' || ex.portionKey === portion;
      const matchSearch = !query ||
        ex.name.toLowerCase().includes(query) ||
        ex.portionBadge.toLowerCase().includes(query) ||
        ex.why.toLowerCase().includes(query);
      return matchPortion && matchSearch;
    });
  });

  setMuscle(muscle: MuscleGroup) {
    this.activeMuscle.set(muscle);
    this.activePortion.set('all');
    this.searchQuery.set('');
  }

  setPortion(portionId: string) {
    this.activePortion.set(portionId);
  }

  setSearch(query: string) {
    this.searchQuery.set(query);
  }
}
