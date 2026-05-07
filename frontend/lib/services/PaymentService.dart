import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:stripe_payment/stripe_payment.dart';
import 'package:hospital_management_system/services/NetworkHelper.dart';

class StripeTransactionResponse {
  String message;
  bool success;
  String paymentId;
  StripeTransactionResponse({this.message, this.success, this.paymentId});
}

class StripeService {
  // We NO LONGER keep the secret key here! It's moved to the backend for security.
  
  static init() {
    StripePayment.setOptions(StripeOptions(
        publishableKey: "pk_test_N8TwbIpKjy2iARMwNS5ciGAX00qpc7eyeq",
        merchantId: "Test",
        androidPayMode: 'test'));
  }

  static Future<StripeTransactionResponse> payWithNewCard(
      {String amount, String currency, String paymentFor}) async {
    try {
      // 1. Ask the user for their card details
      var paymentMethod = await StripePayment.paymentRequestWithCardForm(
          CardFormPaymentRequest());

      // 2. Ask our SECURE backend to create a Payment Intent
      var paymentIntent = await StripeService.createPaymentIntent(amount, currency, paymentFor);

      if (paymentIntent == null || paymentIntent['error'] == true) {
        return StripeTransactionResponse(message: 'Could not initialize payment with server', success: false);
      }

      // 3. Confirm the payment with Stripe using the client_secret from our backend
      var response = await StripePayment.confirmPaymentIntent(PaymentIntent(
          clientSecret: paymentIntent['client_secret'],
          paymentMethodId: paymentMethod.id));

      if (response.status == 'succeeded') {
        return StripeTransactionResponse(
            message: 'Transaction successful!',
            success: true,
            paymentId: paymentMethod.id);
      } else {
        return StripeTransactionResponse(
            message: 'Transaction failed!', success: false);
      }
    } on PlatformException catch (err) {
      return StripeService.getPlatformExceptionErrorResult(err);
    } catch (err) {
      return StripeTransactionResponse(
        message: 'Transaction failed: ${err.toString()}',
        success: false,
      );
    }
  }

  static getPlatformExceptionErrorResult(err) {
    String message = 'Something went wrong';
    if (err.code == 'cancelled') {
      message = 'Transaction cancelled!';
    }
    return StripeTransactionResponse(message: message, success: false);
  }

  // This now calls our SECURE Express backend instead of talking to Stripe directly
  static Future<Map<String, dynamic>> createPaymentIntent(
      String amount, String currency, String paymentFor) async {
    try {
      final response = await Network().postData({
        'amount': amount,
        'currency': currency,
        'payment_for': paymentFor,
      }, '/payments/create-intent');

      return jsonDecode(response.body);
    } catch (err) {
      print('Error creating payment intent: ${err.toString()}');
    }
    return null;
  }
}
