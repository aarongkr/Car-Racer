# Car Racer — Design Document

## Concept

A long-term, polished browser-based car game built with p5.js. The core experience is an endurance-based driving loop where the player manages resources over time, gradually unlocking new content, tracks, and game modes through persistent progression.

---

## Core Game Loop

The game is round-based. Each run ends when any one of three resource meters hits zero:

- **Fuel** — depletes faster when driving in straight lines, conserved when drifting
- **Tyres** — degrade faster when drifting, conserved on straights
- **Damage** — reduced by crashing into anything

Passing the start/finish line awards the player:
- **Cash** — temporary, used for mid-run purchases, disappears at run end
- **Coins** — permanent, used between runs for lasting upgrades

The progression loop is intentionally self-reinforcing: longer runs → more currency → better permanent upgrades → longer runs.

---

## Currency System

| Currency | Earned By | Spent On | Persists? |
|----------|-----------|----------|-----------|
| Cash | Passing start/finish | Mid-run non-permanent upgrades | No — lost at run end |
| Coins | Passing start/finish | Permanent upgrades between runs | Yes |

Unspent cash at run end is lost. This is intentional — cash is a risk/reward mid-run resource.

---

## Progression & Prestige

Players start on a small track with limited gate slots (e.g. 4). For a large coin cost, they can **prestige** — resetting progress but unlocking a larger, more complex track with more gate slots.

There are approximately 5 tracks of increasing size and complexity. Larger tracks allow more gates, which enables longer and more varied runs.

---

## Gates

Gates are placeable objects on the track, purchased with coins. Each track tier has a maximum number of gate slots.

Gate types include:
- **Refuel gate** — restores fuel
- **Tyre gate** — restores tyre health
- **Repair gate** — restores damage
- **Economy gate** — grants bonus cash or coins on pass

Gate placement strategy is a meaningful player decision — balancing survival gates vs economy gates.

---

## Upgrades

### Permanent Upgrades (Coins)
Bought between runs. Persist across all future runs. Stored in save data as a level integer per upgrade. Effects are modelled as exponential functions taking the level as a parameter.

### Temporary Upgrades (Cash)
Bought mid-run. Lost at run end. Stored in run state only.

Each upgrade tracks two values:
- `permLevel` — the permanent baseline, persists between runs
- `tempLevel` — the current in-run level, reset each run

---

## Cars

There are three distinct cars, each used for different game modes. They share a similar underlying structure but have separate upgrade trees and visual styles.

| Car | Game Mode | Notes |
|-----|-----------|-------|
| Endurance Car | Main loop | Fuel/tyre/damage matter |
| Race Car | PVE Racing | No resource management |
| Street Car | City mode | Resource management with pickups |

---

## Game Modes

### Main Endurance Loop (default)
Round-based survival driving on a track. Manage fuel, tyres, and damage. Core progression mode.

### PVE Racing (unlockable)
Race against AI opponents for prize money. No fuel/tyre/damage. Supports tournaments and championships. Uses the Race Car with its own upgrade tree.

### City Mode (unlockable)
Procedurally generated city navigation. Survive as long as possible. Fuel/tyre/damage pellets scattered throughout. Earn coins through drift/skill score. Uses the Street Car.

### Future Modes (to be designed)
- Rally
- Drag Racing
- Others TBD — each with their own car and minigame-style gameplay

---

## Track Builder

Players will be able to build custom tracks using track tiles. Community-built tracks will support online leaderboards. Backend infrastructure required for this feature.

---

## Save System

Two-layer architecture separating what persists from what only exists during a run.

### Persistent State (localStorage)
Survives between runs. Written whenever something permanent changes.

```javascript
{
  playerId: string,
  coins: number,
  trackTier: number,
  unlockedModes: string[],       // e.g. ["racing", "street"]
  enduranceUpgrades: { [key: string]: number },  // upgrade level
  raceUpgrades: { [key: string]: number },
  streetUpgrades: { [key: string]: number },
  lifetimeStats: {
    fastestLap: string,
    maxLaps: number,
    lifetimeCoins: number
  }
}
```

### Run State (temporary)
Only exists during an active run. Saved to localStorage only if pause-and-resume is implemented.

```javascript
{
  cash: number,
  lapNo: number,
  fuel: number,
  tyres: number,
  damage: number,
  tempUpgrades: { [key: string]: number },
  carPos: { x: number, y: number },
  carVel: { x: number, y: number },
  carAngle: number
}
```

### Unlock System
Game mode unlocks are stored as an array of lowercase strings. Always use named constants when checking or setting unlocks — never raw strings. Constants are defined close to the system they belong to (e.g. in `GameModes.js`).

---

## Folder Structure

```
Car Racer/
  assets/               — images and other static assets
  effects/              — Particle.js, TyreMark.js
  objects/              — Car.js, Track.js, Gate.js (future)
  ui/                   — UI.js, menus, HUD
  state/                — save system, persistent and run state
  systems/
    physics/            — movement, collision, drift detection
    gameplay/           — lap counting, resource drain, gate effects
  upgrades/             — upgrade definitions, effects, constants
  constants.js          — global config values (base resolution etc)
  utils.js              — generic reusable functions
  sketch.js             — entry point, setup/draw loop
  index.html
  DESIGN.md
```

---

## Coding Conventions

- **ES Modules** — all files use `import`/`export`, no globals
- **p5 Instance Mode** — p5 is passed as `p` into the sketch, then passed into classes that need it via constructor
- **Constants near their system** — upgrade constants in `upgrades/`, gamemode constants in `GameModes.js` etc. Truly generic constants in `constants.js`
- **Relative asset paths** — no leading slashes, for GitHub Pages compatibility
- **Small commits** — commit after each verified working step with a descriptive message
- **Discuss before building** — no new feature gets coded without talking through the design first

---

## Development Principles

- Understand every piece of code before it's written — if you can't explain it, don't add it yet
- Build expandably — early systems should support features not yet designed
- Balance matters — avoid single linear progression paths, give players meaningful choices
- Polish over speed — this is a long-term project, do it right rather than fast