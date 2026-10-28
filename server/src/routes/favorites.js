const express = require('express');
const prisma = require('../prisma');
const {requireAuth} = require('../middleware/auth.js');

const router = express.Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
    try{
        const rows = await prisma.favorite.findMany({
            where: { userId: req.user.id },
            include:{quote:true}
        })

        res.json({favorites:rows.map((r)=> r.quote)})
    }catch(err){
        next(err)
    }
})

router.post("/",  async (req, res, next) => {
    try{
       const quoteId = Number(req.body.quoteId);
       if(!Number.isInteger(quoteId)){
           return res.status(400).json({error:"Invalid Id"})
       }

       const quote = await prisma.quote.findUnique({where:{id: quoteId}});
       if(!quote) return res.status(400).json({error:"Invalid Quote"})

        await prisma.favorite.upsert({
            where:{userId_quoteId:{userId: req.user.id, quoteId }},
            create: {userId: req.user.id, quoteId},
            update: {}
        })

        res.status(200).json(quote)



    }catch(err){
        next(err)
    }
})

router.delete("/:quoteId", async (req, res, next) => {
    try{
        await prisma.favorite.deleteMany({
            where: { userId: req.user.id, quoteId: Number(req.params.quoteId) },
        })
        res.status(204).end();
    }catch(err){
        next(err)
    }
})

module.exports = router;