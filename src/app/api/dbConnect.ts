import { neon } from '@neondatabase/serverless';


    const sql = neon(process.env.POSTGRESSQL_URL!);

    export default sql;

    

  

