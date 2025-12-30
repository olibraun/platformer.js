export class SpriteSheetDTO {
  imageURL: string = "";
  frames?: { name: string; rect: [number, number, number, number] }[] = [];
  animations?: { name: string; frameLen: number; frames: string[] }[] = [];
  tileW?: number;
  tileH?: number;
  tiles?: { name: string; index: number[] }[] = [];
}
