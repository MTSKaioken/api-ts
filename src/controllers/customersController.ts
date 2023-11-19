export async function createCustomerController(req: any, res: any){
    let statusCode = 500;
    let message = "Erro inesperado";

    try {
        const { db } = req.app;

        const {name, email, phone, address } = req.body;

        if(!name){
            statusCode = 400;
            message = 'Name is required';
        }

        if(!email){
            statusCode = 400;
            message = 'Email is required';
        }
        
        // checando se ja existe
        const existingCustomer = await db.collection('customers').findOne({
            email: email.toLowerCase()
        }); 

        if(existingCustomer) {
            statusCode = 400;
            message = 'Customer already exists';
        }


        const result = await db.collection('customers').insertOne({
            name, 
            email: email.toLowerCase(), 
            phone, 
            address, 
        });

        console.log(result);

        statusCode = 200;
        message = 'Customer created'
        // res.status(200).json({message: 'Customer created'});
    } catch (error) {
        console.log(error);
        //res.status(500).json({error: error.toString()});
    } finally {
        res.status(statusCode).json({message: message});
    }
}

// export async function getAllCustomers(req: any, res: any) {
//    try {
//      // get all customers
//      const { db } = req.app;

//      const customers = await db.collection('customers').find().toArray();
 
//      res.status(200).json({
//         message: "Customers retrieved",
//         customers
//      });
     
//    } catch (error) {
//     res.status(500).json({error: error.toString()});
//    }
// }