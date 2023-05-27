
import express from 'express';
const router = express.Router();

import { createTeam, deleteTeam, getTeams,getTeam, updateTeam} from '@libs/teams/teams';

router.get('/', (_req, res)=>{
    res.json({version:1, scope:'teams'})
})

// /api/Teams/echo/hola?variable1=a&variable2=b

router.get('/echo/:msg',(req, res)=>{
    const {msg}= req.params;
    const {variable1="Hola", variable2="Mundo"} = req.query;
    res.json({msg, variable1, variable2});
});
router.post('/echo2',(req, res)=>{
    const {variable1="Hola", variable2="Mundo"} = req.body;
    res.json({variable1, variable2});
});

router.get('/all',async (_req, res)=>{
    try{
    const teams = await getTeams();
    return res.json(teams);
    }catch (ex:any){
        return res.status(500).json({error:ex?.message})
    }
});

router.get('/byid/:id',async (req, res)=>{
    try{
    const {id =''}=req.params;
    const team = await getTeam(id);
    return res.json(team);
    }catch (ex:any){
        return res.status(500).json({error:ex?.message})
    }
});

router.post('/new', async (req,res)=> {
    try{
    const { name, description, isActive= false}= req.body;
    const newTeam = { name, description, isActive:(isActive && true)};
    const createdTeam = await createTeam(newTeam);
    return res.json(createdTeam);
    }catch (ex:any){
        return res.status(500).json({error:ex?.message})
    }
});

router.put('/upt/:id',async (req, res) => {
    try {
        const { id = ''}= req.params;
        const { name ='', description= '', isActive= false}= req.body;
        const updatedTeam = await updateTeam(id,{name, description, isActive: (isActive && true)});
        return res.json(updatedTeam);
    } catch (ex:any){
      return res.status(500).json({error:ex?.message});
    }
});

router.delete('/del/:id',async (req, res)=>{
    try{
    const { id=''}= req.params;
    const deletedTeam = await deleteTeam(id);
    return res.json({deleted: deletedTeam, id});
    }catch (ex: any){
        return res.status(500).json({error:ex?.message});
    }
});

export default router;