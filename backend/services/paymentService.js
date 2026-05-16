const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? require('stripe')(stripeKey) : null;

const Appointment = require('../models/Appointment');
const LabTest = require('../models/LabTest');

const createPaymentIntent = async (amount, currency, description) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: currency || 'usd',
      description: description,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`Stripe Error: ${error.message}`);
  }
};

const recordPayment = async (paymentData) => {
  const { appointment_id, lab_test_id, payment_for } = paymentData;

  if (payment_for === 'APPOINTMENT') {
    const appointment = await Appointment.findByIdAndUpdate(
      appointment_id,
      { status: 'PAID' },
      { new: true }
    );
    if (!appointment) throw new Error('Appointment not found');
    return { message: 'Payment recorded for Appointment!' };
  } else if (payment_for === 'LAB_TEST') {
    const labTest = await LabTest.findByIdAndUpdate(
      lab_test_id,
      { status: 'PAID' },
      { new: true }
    );
    if (!labTest) throw new Error('Lab test not found');
    return { message: 'Payment recorded for Lab Test!' };
  } else {
    throw new Error('Invalid payment_for type');
  }
};

module.exports = { createPaymentIntent, recordPayment };
