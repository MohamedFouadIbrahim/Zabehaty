

const DeliveryOptions = [
    {
        id: 7,
        name: 'Option 1',
        description: 'Standart Delivery',
        shippingMethods: 1,
        Times: [
            { id: 1, day: '31Jan Sun', time: [{ id: 2, range: '10 AM to 12 PM' }, { id: 3, range: '12 AM to 10 PM' }] },
            { id: 2, day: '28Jul mon', time: [{ id: 4, range: '4 AM to 10 PM' }, { id: 44, range: '6 AM to 2 PM' }] },
            { id: 3, day: '12 mar', time: [{ id: 40, range: '5 AM to 11 PM' }, { id: 455, range: '8 AM to 1 PM' }] },
        ],
        note:"grt one out of 2",
        items: 5
    }
];

export default DeliveryOptions;
