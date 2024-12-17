// Enum for hero types
enum HeroType {
    Knight = "KNIGHT",
    Sorcerer = "SORCERER",
    Rogue = "ROGUE"
  }
  
  // Enum for attack types
  enum AttackType {
    Melee = "MELEE",
    Magic = "MAGIC",
    Stealth = "STEALTH"
  }
  
  // Interface for hero attributes
  interface HeroAttributes {
    health: number;
    attackPower: number;
    defense: number;
    agility: number;
  }
  
  // Interface for hero definition
  interface Hero {
    id: number;
    name: string;
    heroType: HeroType;
    attackType: AttackType;
    attributes: HeroAttributes;
    alive: boolean;
  }
  
  // Type for battle outcome
  type BattleResult = {
    damageDealt: number;
    wasCritical: boolean;
    remainingHealth: number;
  };