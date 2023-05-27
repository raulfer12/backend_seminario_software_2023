export interface ITeam {
    _id?: string;
    name: string;
    description: string;
    isActive:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


//const newPrject: Required<ITeam> ={}
const memoryTeams: ITeam[]=[];
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
let createdTeams: number=0;

export const createTeam = async (team: ITeam)=>{
    const newTeam={...team};//shallow copy
    newTeam._id=(++createdTeams).toString();
    newTeam.createdAt = new Date();
    newTeam.updatedAt = newTeam.createdAt;
    memoryTeams.push(newTeam);
    return newTeam;
}

export const getTeams= async()=>{
    return memoryTeams;
}

export const getTeam= async(id:string)=>{
  const Team = memoryTeams.find(t=>t._id===id);
  if(!Team)throw new Error('Team not found');
  return Team;
}

export const updateTeam = ( id:string, team:Partial<ITeam>) => {

    const index = memoryTeams.findIndex(p => p._id === id);
    if (index === -1) throw new Error('Team not found');

    memoryTeams[index] = { ...memoryTeams[index], ...team, updatedAt: new Date() };
    return memoryTeams[index];
  }
  
  export const deleteTeam = (id:string) => {
    const index = memoryTeams.findIndex(t => t._id === id);
    if (index === -1) throw new Error('Team not found');
    memoryTeams.splice(index, 1);
    return true;
  }