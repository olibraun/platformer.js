export class SpriteSheetDTO {
  imageURL: string = "";
  frames?: { name: string; rect: [number, number, number, number] }[] = [];
  animations?: { name: string; frameLen: number; frames: string[] }[] = [];
  tileW?: number;
  tileH?: number;
  tiles?: { name: string; index: number[] }[] = [];
}

export class TilesDTO {
  name: string = "";
  type?: string;
  pattern?: string;
  ranges: (
    | [number, number]
    | [number, number, number]
    | [number, number, number, number]
  )[] = [];
}

export class PatternDTO {
  [key: string]: any; // generisch für die Patterns
}

export class LevelSpecDTO {
  spritesheet: string = "";
  layers: { tiles: TilesDTO[] }[] = [];
  patterns: PatternDTO = {};
  entities: { name: string; pos: [number, number] }[] = [];
}
