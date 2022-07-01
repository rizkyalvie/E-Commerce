const { transaction, profile, product, user } = require("../../models")

const midtransClient = require("midtrans-client");

exports.buyProduct = async (req, res) => {
    try {
      // Prepare transaction data from body here ...
      let data = req.body;
  
      data = {
        id: parseInt(data.idProduct + Math.random().toString().slice(3, 8)),
        ...data,
        idBuyer: req.user.id,
        status: "pending",
      };
  
      
      // Insert transaction data here ...
      const newData = await transaction.create(data);
  
      // Get buyer data here ...
      const buyerData = await user.findOne({
        include: {
          model: profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser"],
          },
        },
        where: {
          id: newData.idBuyer,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
  
      // Create Snap API instance here ...
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
  
      // Create parameter for Snap API here ...
      let parameter = {
        transaction_details: {
          order_id: newData.id,
          gross_amount: newData.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          full_name: buyerData?.name,
          email: buyerData?.email,
          phone: buyerData?.profile?.phone,
        },
      };
  
      // Create trasaction token & redirect_url with snap variable here ...
      const payment = await snap.createTransaction(parameter);
  
      res.send({
        status: "pending",
        message: "Pending transaction payment gateway",
        payment,
        product: {
          id: data.idProduct,
        },
      });
    } catch (error) {
      (error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };
  
  // Create configurate midtrans client with CoreApi here ...
  const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY
  const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY
  
  const core = new midtransClient.CoreApi();
  
  core.apiConfig.set({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY
  })
  
  /**
   *  Handle update transaction status after notification
   * from midtrans webhook
   * @param {string} status
   * @param {transactionId} transactionId
   */

exports.getTransaction = async (req, res) => {
    try {
        const data = await transaction.findAll({
            attributes: {
                exclude: ['idProduct', 'idBuyer', 'idSeller', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: product,
                    as: "product",
                    attributes: {
                        exclude: ['desc', 'price', 'qty', 'idUser', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: user,
                    as: "buyer",
                    attributes: {
                        exclude: ['password', 'idUser', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: user,
                    as: "seller",
                    attributes: {
                        exclude: ['password', 'idUser', 'createdAt', 'updatedAt']
                    }
                }
            ]
        })

        res.status(200).send({
            status: "Get data Transaction Success",
            data,
        })
    } catch (error) {
        (error);
        res.status(404).send({
            status: "Get data Transactions Failed",
            message: "Server Error",
        });
    }
}


exports.notification = async (req,res) => {
    try {
  
      const statusResponse = await core.transaction.notification(req.body)
  
      const orderId = statusResponse.order_id;
      const transactionStatus = statusResponse.transaction_status
      const fraudStatus = statusResponse.fraud_status
  
      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          // TODO set transaction status on your database to 'challenge'
          // and response with 200 OK
          updateTransaction("pending", orderId);
          res.status(200);
        } else if (fraudStatus == "accept") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          updateProduct(orderId);
          updateTransaction("success", orderId);
          res.status(200);
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        updateTransaction("success", orderId);
        res.status(200);
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        updateTransaction("failed", orderId);
        res.status(200);
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        updateTransaction("pending", orderId);
        res.status(200);
      }
  
      
    } catch (error) {
      (error)
      res.send({
        message: 'Server Error'
      })
    }
  }
  
  // Create function for handle transaction update status here ...
  const updateTransaction = async (status, transactionId) => {
    await transaction.update(
      {
        status,
      },
      {
        where: {
          id: transactionId,
        },
      }
    );
  }; 
  
  // Create function for handle product update stock/qty here ...
  const updateProduct = async (orderId) => {
    const transactionData = await transaction.findOne({
      where: {
        id: orderId,
      },
    });
  
    const productData = await product.findOne({
      where: {
        id: transactionData.idProduct,
      },
    });
    
    const qty = productData.qty - 1;
    await product.update({ qty }, { where: { id: productData.id } });
  };