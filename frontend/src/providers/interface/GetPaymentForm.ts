// export type FormPayloadData = {
//   invoiceDescription: string; // Invoice description ��י��ו�� מ��מך  Required
//   price: number; // The total amount of the order
//   name: string; // Customer's name  Required
//   email: string; // Customer's email  Required
//   phone: string; // Customer's phone number  Required
//   address: string; // Customer's address  Required
//   city: string; // Customer's city  Required
//   zipCode: string; // Customer's zip code  Required
//   itemDescription: string; // Description of the item purchased  Required
// };
// const pluginId = import.meta.env.PLUGIN_ID;

  // const getPaymentForm = (requestBody: PaymentFormPayload) => {
  //   const url = "/api/payments/form";
  //   // const url = "https://sandbox.d.greeninvoice.co.il/api/v1/payments/form";
  //   try {
  //     axios.post(url,requestBody, {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },

  //     }).then(response => {
  //       if (response.data.success){
  //         navigate(response.data.url) 
  //       }else{
  //         console.log("Payment Failed", response, response.data)
  //       }
  //     }).catch(error => {
  //       console.error(error);
  //     });
  //     // console.log("response obj:", );
  //     // if (status >= 400) {
  //     //   console.log("responseCode: ", statusText  );
  //     //   throw new Error("Payment Failed")
  //     // }
  //     // // const data = await response.json()
  //     // console.log(data, "Payment form data");
  //     // navigate(data.url)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


// EXAMPLE OF BODY FOR PAYMENT FORM REQUEST
// body = {
//   'description': 'תיאור מסמך',
//   'type': 320,
//   'lang': 'he',
//   'currency': 'ILS',
//   'vatType': 0,
//   'amount': 20,
//   'maxPayments': 1,
//   'pluginId': '7944827a-c664-11e4-8231-080027271115',
//   'group': 100,
//   'client': {
//     'id': '7944827a-c664-11e4-8231-080027271114',
//     'name': 'name',
//     'emails': [
//       'email1@example.com',
//       'email2@example.com'
//     ],
//     'taxId': '0123456789',
//     'address': '1 Luria st',
//     'city': 'Tel Aviv',
//     'zip': '1234567',
//     'country': 'IL',
//     'phone': '+972-54-1234567',
//     'fax': '+972-54-1234567',
//     'mobile': '+972-54-1234567',
//     'add': true
//   },
//   'income': [
//     {
//       'catalogNum': 'MXDFSDD',
//       'description': 'Item description',
//       'quantity': 1,
//       'price': 20,
//       'currency': 'ILS',
//       'vatType': 1
//     }
//   ],
//   'remarks': 'Some remarks',
//   'successUrl': 'https://www.your-site-here.com/successful-payment-redirection-page-here',
//   'failureUrl': 'https://www.your-site-here.com/failed-payment-redirection-page-here',
//   'notifyUrl': 'https://www.your-site-here.com/notification-endpoint-here',
//   'custom': 'Some custom data comes here'
// };