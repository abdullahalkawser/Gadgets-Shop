import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OptiBGH41gt1tTCIHIU2a0X5K6v4UMqvhwe2unj2sKrOyUKJw1lmvHzjeQ0aKCIu51WkuYznxplSaEncB3CF5k800sZrK35CD', {
    apiVersion: '2023-10-16', // সর্বশেষ API ভার্সন
    appInfo: {
        name: 'FullStack App', // তোমার অ্যাপের নাম
        version: '1.0.0'
    }
});

export default stripe;
