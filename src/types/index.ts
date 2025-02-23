import { characters } from "../constant";

export type Character = (typeof characters)[number];

export type Choice = "rock" | "paper" | "scissors" | "lizard" | "spock";
