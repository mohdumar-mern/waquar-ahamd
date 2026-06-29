export interface Skill {
  _id     : string;
  name    : string;
  category: "Software"|"Rendering"|"Animation"|"VFX"|"General";
  level   : number;
  icon?   : string;
  order   : number;
}
