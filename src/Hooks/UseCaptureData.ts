
export function sanitizedLineItems(lineItems:any) {
    return lineItems?.reduce((data:any, lineItem:any) => {
      const item = data;
      let variantData = null;
      if (lineItem?.selected_options.length) {
        variantData = {
          [lineItem?.selected_options[0].group_id]: lineItem?.selected_options[0]?.option_id,
        };
      }
      item[lineItem?.id] = {
        quantity: lineItem?.quantity,
        variants: variantData,
      };
    return item;
    }, {});
  };

export function handleCaptureCheckout(cart:any, addressData:any) {
    const orderData = {
      line_items: sanitizedLineItems(cart?.line_items),
      customer: {
        firstname: addressData?.FirstName,
        lastname: addressData?.LastName,
        email: addressData?.Email,
      },
      shipping: {
        name: `${addressData?.FirstName} ${addressData?.LastName}`,
        street: addressData?.Address,
        town_city: addressData?.ShippingState,
        county_state: addressData?.ShippingState,
        postal_zip_code: addressData?.postal_zip_code,
        country: addressData?.ShippingCountry,
      },
      fulfillment: {
        shipping_method:addressData?.ShippingOptions,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: '4242424242424242',
          expiry_month: '02',
          expiry_year: '24',
          cvc: '123',
          postal_zip_code: '94107',
        },
      },
    };
    return {orderData}
  };