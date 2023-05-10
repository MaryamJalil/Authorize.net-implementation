const http = require('http');
const express = require('express');
const app = express();
const PORT = 8080;
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
app.use(express.json()); // parse JSON request bodies

  
  
app.post('/api/charge_a_credit_card', async (req, res) => {
  try {
    console.log(req.body, 'hjcnjenjcjn');
    const { cardNumber, expirationDate, cardCode, amount } =
      req.body;
    const merchantAuthenticationType =
      new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName('7wL79Us6QTzL');
    merchantAuthenticationType.setTransactionKey(
      '3U5PuqL9c43F445v'
    );

    // Set up creditCard object
    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(expirationDate);
    creditCard.setCardCode(cardCode);

    // Set up paymentType object
    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    // Set up orderDetails object
    const orderDetails = new ApiContracts.OrderType();
    const randomNumber =
      Math.floor(Math.random() * 9000000) + 1000000;
    const invoiceNumber = `INV-${randomNumber}`;
    orderDetails.setInvoiceNumber(invoiceNumber);
    orderDetails.setDescription('Product Description');

    // Set up transactionRequestType object
    const transactionRequestType =
      new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
      ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(amount);
    transactionRequestType.setOrder(orderDetails);

    // Set up createRequest object
    const createRequest =
      new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(
      merchantAuthenticationType
    );
    createRequest.setTransactionRequest(transactionRequestType);

    // Execute API call using chargeCreditCard function
    const response = await new Promise((resolve, reject) => {
      chargeCreditCard(createRequest, (err, response) => {
        if (err) {
          console.log(
            '🚀 ~ file: index.route.js:130 ~ chargeCreditCard ~ err:',
            err
          );
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    console.log(response, 'response');

    if (
      response.getMessages().getResultCode() === 'Ok' &&
      response.getMessages().getMessage()[0].getText() ===
        'Successful.'
    ) {
      return res.status(200).json({
        status: 200,
        message: 'Transaction is successful',
        data: { response },
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Transaction failed',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});
function chargeCreditCard(request, callback) {
  const ctrl = new ApiControllers.CreateTransactionController(
    request.getJSON()
  );
  ctrl.execute(() => {
    const apiResponse = ctrl.getResponse();
    const response = new ApiContracts.CreateTransactionResponse(
      apiResponse
    );

    callback(null, response);
  });
}
app.post('/authorize-credit-card', (req, res) => {
  const { cardNumber, expirationDate, cardCode, amount } = req.body;

  var merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName('7wL79Us6QTzL');
  merchantAuthenticationType.setTransactionKey('3U5PuqL9c43F445v');

  var creditCard = new ApiContracts.CreditCardType();
  creditCard.setCardNumber(cardNumber);
  creditCard.setExpirationDate(expirationDate);
  creditCard.setCardCode(cardCode);
  var paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  var orderDetails = new ApiContracts.OrderType();
  const randomNumber =
    Math.floor(Math.random() * 9000000) + 1000000;
  const invoiceNumber = `INV-${randomNumber}`;
  orderDetails.setInvoiceNumber(invoiceNumber);
  orderDetails.setDescription('Product Description');

  var tax = new ApiContracts.ExtendedAmountType();
  tax.setAmount('4.26');
  tax.setName('level2 tax name');
  tax.setDescription('level2 tax');

  var duty = new ApiContracts.ExtendedAmountType();
  duty.setAmount('8.55');
  duty.setName('duty name');
  duty.setDescription('duty description');

  var shipping = new ApiContracts.ExtendedAmountType();
  shipping.setAmount('8.55');
  shipping.setName('shipping name');
  shipping.setDescription('shipping description');

  var billTo = new ApiContracts.CustomerAddressType();
  billTo.setFirstName('Ellen');
  billTo.setLastName('Johnson');
  billTo.setCompany('Souveniropolis');
  billTo.setAddress('14 Main Street');
  billTo.setCity('Pecan Springs');
  billTo.setState('TX');
  billTo.setZip('44628');
  billTo.setCountry('USA');

  var shipTo = new ApiContracts.CustomerAddressType();
  shipTo.setFirstName('China');
  shipTo.setLastName('Bayles');
  shipTo.setCompany('Thyme for Tea');
  shipTo.setAddress('12 Main Street');
  shipTo.setCity('Pecan Springs');
  shipTo.setState('TX');
  shipTo.setZip('44628');
  shipTo.setCountry('USA');

  var lineItem_id1 = new ApiContracts.LineItemType();
  lineItem_id1.setItemId('1');
  lineItem_id1.setName('vase');
  lineItem_id1.setDescription('cannes logo');
  lineItem_id1.setQuantity('18');
  lineItem_id1.setUnitPrice(45.0);

  var lineItem_id2 = new ApiContracts.LineItemType();
  lineItem_id2.setItemId('2');
  lineItem_id2.setName('vase2');
  lineItem_id2.setDescription('cannes logo2');
  lineItem_id2.setQuantity('28');
  lineItem_id2.setUnitPrice('25.00');

  var lineItemList = [];
  lineItemList.push(lineItem_id1);
  lineItemList.push(lineItem_id2);

  var lineItems = new ApiContracts.ArrayOfLineItem();
  lineItems.setLineItem(lineItemList);

  var userField_a = new ApiContracts.UserField();
  userField_a.setName('A');
  userField_a.setValue('Aval');

  var userField_b = new ApiContracts.UserField();
  userField_b.setName('B');
  userField_b.setValue('Bval');

  var userFieldList = [];
  userFieldList.push(userField_a);
  userFieldList.push(userField_b);

  var userFields =
    new ApiContracts.TransactionRequestType.UserFields();
  userFields.setUserField(userFieldList);

  var transactionSetting1 = new ApiContracts.SettingType();
  transactionSetting1.setSettingName('duplicateWindow');
  transactionSetting1.setSettingValue('120');

  var transactionSetting2 = new ApiContracts.SettingType();
  transactionSetting2.setSettingName('recurringBilling');
  transactionSetting2.setSettingValue('false');

  var transactionSettingList = [];
  transactionSettingList.push(transactionSetting1);
  transactionSettingList.push(transactionSetting2);

  var transactionSettings = new ApiContracts.ArrayOfSetting();
  transactionSettings.setSetting(transactionSettingList);

  var transactionRequestType =
    new ApiContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION
  );
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(utils.getRandomAmount());
  transactionRequestType.setLineItems(lineItems);
  transactionRequestType.setUserFields(userFields);
  transactionRequestType.setOrder(orderDetails);
  transactionRequestType.setTax(tax);
  transactionRequestType.setDuty(duty);
  transactionRequestType.setShipping(shipping);
  transactionRequestType.setBillTo(billTo);
  transactionRequestType.setShipTo(shipTo);
  transactionRequestType.setTransactionSettings(
    transactionSettings
  );

  var createRequest = new ApiContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(
    merchantAuthenticationType
  );
  createRequest.setTransactionRequest(transactionRequestType);

  //pretty print request
  // console.log(JSON.stringify(createRequest.getJSON(), null, 2));

  var ctrl = new ApiControllers.CreateTransactionController(
    createRequest.getJSON()
  );
  console.log(ctrl._request, 'pkc kkjn');
  ctrl.execute(function () {
    var apiResponse = ctrl.getResponse();
    console.log(apiResponse, '7900');
    console.log(apiResponse.messages, '7900');
    console.log(apiResponse.messages.resultCode, 'ijdjnj');

    var response = new ApiContracts.CreateTransactionResponse(
      apiResponse
    );
    console.log(response.getMessages().getResultCode());

    if (
      response.getMessages().getResultCode() === 'Ok' &&
      apiResponse.messages.message[0].text === 'Successful.'
    ) {
      return res.status(200).json({
        status: 200,
        message: 'Authentication of credit card completed',
        data: { response },
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: 'Authentication of credit card failed',
      });
    }
  });
});
app.post('/get-transaction-details', (req, res) => {
  const { batchId } = req.body;
  var merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName('7wL79Us6QTzL');
  merchantAuthenticationType.setTransactionKey('3U5PuqL9c43F445v');

  var paging = new ApiContracts.Paging();
  paging.setLimit(10);
  paging.setOffset(1);

  var sorting = new ApiContracts.TransactionListSorting();
  sorting.setOrderBy(ApiContracts.TransactionListOrderFieldEnum.ID);
  sorting.setOrderDescending(true);

  var getRequest = new ApiContracts.GetTransactionListRequest();
  getRequest.setMerchantAuthentication(merchantAuthenticationType);
  getRequest.setBatchId(batchId);
  getRequest.setPaging(paging);
  getRequest.setSorting(sorting);

  console.log(JSON.stringify(getRequest.getJSON(), null, 2));

  var ctrl = new ApiControllers.GetTransactionListController(
    getRequest.getJSON()
  );

  ctrl.execute(function () {
    var apiResponse = ctrl.getResponse();

    var response = new ApiContracts.GetTransactionListResponse(
      apiResponse
    );

    console.log(JSON.stringify(response, null, 2));

    if (
      response.getMessages().getResultCode() ==
      ApiContracts.MessageTypeEnum.OK
    ) {
      res.status(200).json(response);
    } else {
      console.log(
        'API Error: ' +
          response.getMessages().getMessage()[0].getText()
      );
    }
  });
});
app.use('/withdraw-payment', (req, res) => {
  const { cardNumber, expirationDate, cardCode, amount } = req.body;
  var merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName('7wL79Us6QTzL');
  merchantAuthenticationType.setTransactionKey('3U5PuqL9c43F445v');

  var creditCard = new ApiContracts.CreditCardType();
  creditCard.setCardNumber(cardNumber);
  creditCard.setExpirationDate(expirationDate);

  var paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  var transactionRequestType =
    new ApiContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(
    ApiContracts.TransactionTypeEnum.REFUNDTRANSACTION
  );
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(utils.getRandomAmount());
  transactionRequestType.setRefTransId(transactionId);

  var createRequest = new ApiContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(
    merchantAuthenticationType
  );
  createRequest.setTransactionRequest(transactionRequestType);

  //pretty print request
  console.log(JSON.stringify(createRequest.getJSON(), null, 2));

  var ctrl = new ApiControllers.CreateTransactionController(
    createRequest.getJSON()
  );

  ctrl.execute(function () {
    var apiResponse = ctrl.getResponse();

    var response = new ApiContracts.CreateTransactionResponse(
      apiResponse
    );

    //pretty print response
    console.log(JSON.stringify(response, null, 2));

    if (response != null) {
      if (
        response.getMessages().getResultCode() ==
        ApiContracts.MessageTypeEnum.OK
      ) {
        if (
          response.getTransactionResponse().getMessages() != null
        ) {
          console.log(
            'Successfully created transaction with Transaction ID: ' +
              response.getTransactionResponse().getTransId()
          );
          console.log(
            'Response Code: ' +
              response.getTransactionResponse().getResponseCode()
          );
          console.log(
            'Message Code: ' +
              response
                .getTransactionResponse()
                .getMessages()
                .getMessage()[0]
                .getCode()
          );
          console.log(
            'Description: ' +
              response
                .getTransactionResponse()
                .getMessages()
                .getMessage()[0]
                .getDescription()
          );
        } else {
          console.log('Failed Transaction.');
          if (
            response.getTransactionResponse().getErrors() != null
          ) {
            console.log(
              'Error Code: ' +
                response
                  .getTransactionResponse()
                  .getErrors()
                  .getError()[0]
                  .getErrorCode()
            );
            console.log(
              'Error message: ' +
                response
                  .getTransactionResponse()
                  .getErrors()
                  .getError()[0]
                  .getErrorText()
            );
          }
        }
      } else {
        console.log('Failed Transaction. ');
        if (
          response.getTransactionResponse() != null &&
          response.getTransactionResponse().getErrors() != null
        ) {
          console.log(
            'Error Code: ' +
              response
                .getTransactionResponse()
                .getErrors()
                .getError()[0]
                .getErrorCode()
          );
          console.log(
            'Error message: ' +
              response
                .getTransactionResponse()
                .getErrors()
                .getError()[0]
                .getErrorText()
          );
        } else {
          console.log(
            'Error Code: ' +
              response.getMessages().getMessage()[0].getCode()
          );
          console.log(
            'Error message: ' +
              response.getMessages().getMessage()[0].getText()
          );
        }
      }
    } else {
      console.log('Null Response.');
    }
  });
});


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
