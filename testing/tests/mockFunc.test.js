const mail = require('../mail');
const lib = require('../lib');
const db = require('../db');
// mail module을 require해도 실제 메모리에는 single instance 만 있기 때문에
// 실제 lib.js 에서 사용하는 mail module가 동일한 module이라 생각해도된다.

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        // real db를 대신해서 unit-test 이기 때문에
        // We call this function fake or mock function
        db.getCustomerSync = function (customerId) {
            console.log('Fake Reading Customer...')
            return { id: customerId, points: 20 };
        }

        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })
})

// Interaction Testing
describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = function (customerId) {
            return { email: 'a' }
        }

        let mailSent = false;
        mail.send = function (email, message) {
            mailSent = true;
        }

        // 만약에 notifyCustomer 함수가 정상적으로 호출되면, mail.send가 호출되고,
        // 앞서 언급한 것 처럼 require 한 mail module은 lib.js의 module과 완전히 동일한
        // instance 이기 때문에 아래와 같이 mailSent의 변화 여부를 확인하면된다.
        // Test interaction of one object with another object
        lib.notifyCustomer({ customerId: 1 });
        expect(mailSent).toBe(true);
    })
})

// Jest Mock Functions
describe('notifyCustomer', () => {
    // This function has no implementation
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error('...'));
    // const result = await mockFunction();

    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
    // db.getCustomerSync = function (customerId) {
    //     return { email: 'a' }
    // }

    mail.send = jest.fn();

    // let mailSent = false;
    // mail.send = function (email, message) {
    //     mailSent = true;
    // }

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
})

describe('notifyCustomer', () => {

    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
    // db.getCustomerSync = function (customerId) {
    //     return { email: 'a' }
    // }

    mail.send = jest.fn();

    // let mailSent = false;
    // mail.send = function (email, message) {
    //     mailSent = true;
    // }

    lib.notifyCustomer({ customerId: 1 });

    // expect(mail.send).toHaveBeenCalledWith('a', '...');
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
    console.log(mail.send.mock.calls)
    console.log(mail.send.mock.calls[0])
})

describe('notifyCustomer', () => {

    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    exepct(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    /* notifyCustomer이라는 함수 실행시
    1. db.getCustomerSync(order.customerId);
    2. mail.send(customer.email, 'Your order was ...');

    이 두개 함수를 앞서 require로 받고 호출에 overrap 시켜도 되지만 귀찮기 때문에,  Jest의
    mock 함수를 이용해서 간단하게 실행여부와 실행시 mockReturnValue 등을 설정해줘서
    실행의 여부만 확인하는 방식을 취해 호출되는지 안되는지 unit-test를 진행한다.
    */
})