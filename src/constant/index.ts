export const characters = [
  "Mickey Mouse",
  "Donald Duck",
  "Goofy",
  "Minnie Mouse",
  "Pluto",
  "Daisy Duck",
  "Scrooge McDuck",
  "Huey Duck",
  "Dewey Duck",
  "Louie Duck",
] as const;

export const rules: {
  [key: string]: { winsAgainst: string[]; reason: string[] };
} = {
  rock: {
    winsAgainst: ["scissors", "lizard"],
    reason: ["Crushes Scissors", "Crushes Lizard"],
  },
  paper: {
    winsAgainst: ["rock", "spock"],
    reason: ["Covers Rock", "Disproves Spock"],
  },
  scissors: {
    winsAgainst: ["paper", "lizard"],
    reason: ["Cuts Paper", "Decapitates Lizard"],
  },
  lizard: {
    winsAgainst: ["paper", "spock"],
    reason: ["Eats Paper", "Poisons Spock"],
  },
  spock: {
    winsAgainst: ["scissors", "rock"],
    reason: ["Smashes Scissors", "Vaporizes Rock"],
  },
};
