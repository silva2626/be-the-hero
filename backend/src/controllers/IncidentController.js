const connection = require('../database/connection');

module.exports =  {
    async Index(req, res){
        const { page = 1 } = req.query;
        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=','incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf');
        const [count] = await connection('incidents').count();
        res.header('X-Total-Count', count['count(*)']);
        res.header('X-Total-Pages', count['count(*)'] / 5);
        return res.json(incidents);
    },
    async Store(req,res){
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const result = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return res.json({id : result[0]});
    },
    async Destroy(req,res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        const count = await connection('incidents').where('id',id);
        if( count == 0){
            return res.status(400).json({ error : 'Incident not found'})
        }
        const incident = await connection('incidents').where('id', id).select('ong_id').first();
        if(incident.ong_id != ong_id){
            return res.status(401).json({ error: 'Operation not permitted.'});
        }
        await connection('incidents').where('id',id).delete();
        return res.status(204).send();
    }

}