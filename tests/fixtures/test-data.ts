export interface TestCombatant {
  id: string;
  name: string;
  img: string;
  level: number;
  ego: number;
}

export interface TestPartner {
  id: string;
  name: string;
  img: string;
  level: number;
  ego: number;
}

export interface TestFragment {
  id: string;
  setType: string;
  piece: number;
  level: number;
  img: string;
  mainStat: Record<string, number>;
  subStats: unknown[];
}

export interface TestBuild {
  id: string;
  name: string;
  img: string;
}

export interface TestSaveData {
  id: string;
  name: string;
  img: string;
  saveData: unknown[];
  equipment: {
    weapon: unknown | null;
    armor: unknown | null;
    ring: unknown | null;
  };
  owned: boolean;
}

export interface TestTeam {
  id: string;
  member1: unknown | null;
  member2: unknown | null;
  member3: unknown | null;
}

let idCounter = 0;

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${++idCounter}`;
}

export function createCombatant(overrides: Partial<TestCombatant> = {}): TestCombatant {
  return {
    id: generateId('combatant'),
    name: 'TestCombatant',
    img: '/combatants/testcombatant.png',
    level: 1,
    ego: 0,
    ...overrides
  };
}

export function createPartner(overrides: Partial<TestPartner> = {}): TestPartner {
  return {
    id: generateId('partner'),
    name: 'TestPartner',
    img: '/partners/testpartner.png',
    level: 1,
    ego: 0,
    ...overrides
  };
}

export function createFragment(overrides: Partial<TestFragment> = {}): TestFragment {
  return {
    id: generateId('fragment'),
    setType: 'atk',
    piece: 1,
    level: 1,
    img: '/fragments/test.png',
    mainStat: { ATK: 100 },
    subStats: [],
    ...overrides
  };
}

export function createBuild(overrides: Partial<TestBuild> = {}): TestBuild {
  return {
    id: generateId('build'),
    name: 'TestBuild',
    img: '/combatants/testcombatant.png',
    ...overrides
  };
}

export function createSaveData(overrides: Partial<TestSaveData> = {}): TestSaveData {
  return {
    id: generateId('savedata'),
    name: 'TestSaveData',
    img: '/combatants/testcombatant.png',
    saveData: [],
    equipment: { weapon: null, armor: null, ring: null },
    owned: false,
    ...overrides
  };
}

export function createTeam(overrides: Partial<TestTeam> = {}): TestTeam {
  return {
    id: generateId('team'),
    member1: null,
    member2: null,
    member3: null,
    ...overrides
  };
}
