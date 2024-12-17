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
  // Function to create a hero
function generateHero(name: string, heroType: HeroType): Hero {
    const defaultStats: Record<HeroType, HeroAttributes> = {
        [HeroType.Knight]: { health: 150, attackPower: 30, defense: 20, agility: 10 },
        [HeroType.Sorcerer]: { health: 90, attackPower: 35, defense: 10, agility: 15 },
        [HeroType.Rogue]: { health: 110, attackPower: 25, defense: 15, agility: 25 },
    };
  
    return {
        id: Math.floor(Math.random() * 10000),
        name,
        heroType,
        attackType: heroType === HeroType.Sorcerer ? AttackType.Magic : heroType === HeroType.Rogue ? AttackType.Stealth : AttackType.Melee,
        attributes: defaultStats[heroType],
        alive: true
    };
  }
  
  // Function to calculate attack damage
  function computeDamage(attacker: Hero, defender: Hero): BattleResult {
    const baseDamage = Math.max(0, attacker.attributes.attackPower - defender.attributes.defense);
    const criticalHit = Math.random() < 0.25;
    const damage = criticalHit ? baseDamage * 2 : baseDamage;
  
    defender.attributes.health -= damage;
    if (defender.attributes.health <= 0) {
        defender.alive = false;
        defender.attributes.health = 0;
    }
  
    return {
        damageDealt: damage,
        wasCritical: criticalHit,
        remainingHealth: defender.attributes.health
    };
  }
  
  // Generic function to find hero by property
  function locateHero<T extends keyof Hero>(heroes: Hero[], property: T, value: Hero[T]): Hero | undefined {
    return heroes.find(hero => hero[property] === value);
  }
  
  // Function to execute a battle round
function executeBattle(attacker: Hero, defender: Hero): string {
    if (!attacker.alive || !defender.alive) {
        return `${!attacker.alive ? attacker.name : defender.name} is already defeated.`;
    }
  
    const attackResult = computeDamage(attacker, defender);
    return `${attacker.name} attacks ${defender.name} dealing ${attackResult.damageDealt} damage ${attackResult.wasCritical ? '(CRITICAL!)' : ''}. Remaining health of ${defender.name}: ${attackResult.remainingHealth}.`;
  }
  // Initialize heroes
const heroCollection: Hero[] = [
    generateHero("Arthur", HeroType.Knight),
    generateHero("Morgan", HeroType.Sorcerer),
    generateHero("Shadow", HeroType.Rogue)
  ];
  
  console.log("<<< Battle Setup >>>");
  console.log(heroCollection);
  
  // Simulate multiple rounds
  console.log("\n<<< Battle Rounds >>>");
  for (let round = 1; round <= 6; round++) {
    console.log(`\nRound ${round}:`);
    console.log(executeBattle(heroCollection[0], heroCollection[1]));
    console.log(executeBattle(heroCollection[1], heroCollection[2]));
    console.log(executeBattle(heroCollection[2], heroCollection[0]));
  }
  
  // Final hero stats
  console.log("\n<<< Final Hero Stats >>>");
  heroCollection.forEach(hero => {
    console.log(`${hero.name} - Health: ${hero.attributes.health}, Alive: ${hero.alive}`);
  });
  
  // Searching for a specific hero
  const foundHero = locateHero(heroCollection, "heroType", HeroType.Sorcerer);
  console.log("\n<<< Searched Hero >>>");
  console.log(foundHero);