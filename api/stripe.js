import { instance } from './api'

import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

export const fetchPaymentSheetParams = async (priceId) => {
    try{
        const uri = "/payment-sheet/";
        console.log(priceId);
        const res = await instance.post(uri, {price_id: priceId,});

        return res.data;
    }catch(err){
        console.error("Error fetching PaymentSheet params: ", err);
        return null;
    }
}

export const getPublishableKey = async () => {
    res = await instance.get('/pk/');
    return (res.data.publishableKey);
}

export const initializePayment = async (setLoading, priceId) => {
    setLoading(true);
    const data = await fetchPaymentSheetParams(priceId);

    const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: data.paymentIntent,
        merchantDisplayName: 'Mi Tienda',
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
    });

    setLoading(false);

    if (initError) {
        Alert.alert("Error al iniciar pago", initError.message);
        return false;  // o throw, o manejar el error
    }

    return true;
}

export const openPaymentSheet = async (setLoading) => {
    setLoading(true);
    const result = await presentPaymentSheet();
    console.log(result.error);
    setLoading(false);
    if (result.error) {
        alert("Error en el pago", result.error.message || JSON.stringify(result.error.stripeErrorCode));
    } else {
        alert("Pago completado", "El pago fue aceptado. (Confirma por webhook antes de enviar producto)");
    }
    
}