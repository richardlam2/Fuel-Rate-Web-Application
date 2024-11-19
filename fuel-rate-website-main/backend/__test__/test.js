/* 
 test.js (your test file)
 To install jest: npm install --save-dev jest 
 Also install supertest: npm install supertest
 To test: npm test -- --coverage

 describe('Login Route', () => {                        This describes what you're testing, it can be called anything
  it('should log in successfully', async () => {        This describes what it should do
    const response = await request(app)     
      .post('/login')                                   Add in the route you're using
      .send({                                           Hardcode the vals
        username: 'johnny',
        password: '12345'
      });
    expect(response.status).toBe(200);                  Use 200 when it should be successful submission, 500 when it should fail
  });
*/

const request = require('supertest');
const app = require('../server.js');
// Define your routes and middleware

describe('Login Route', () => {
  it('should log in successfully', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'johnny',
        password: '12345'
      });
    expect(response.status).toBe(200);
  });
  
  it('should return an error for a non-existent username', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'notexist',
        password: 'testpass'
      });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank username', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: '',
        password: 'testpass'
      });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: ''
      });
    expect(response.status).toBe(500);
  });

  it('should return an error for an incorrect password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpass'
      });
    expect(response.status).toBe(500);
  });
});



describe('Quotehistory Route', () => {
  it('fetch quotehistory correctly', async () => {
    const response = await request(app)
      .get('/quotehistory/16')
    expect(response.status).toBe(200);
  });

  it('checks if inputs are invalid in quotehistory router', async () => {
    const response = await request(app).get('/quotehistory/0');
    expect(typeof response.body).toBe(typeof []);
    expect(response.body).toHaveLength(0);
    expect(response.status).toBe(200);
  });
});

describe('Profile Route', () => {
  it('should get a users profile information', async () => {
    const response = await request(app)
    .get('/profile/16');
    expect(response.status).toBe(200);
  });

  it('should submit the profile form successfully', async () => {
    const response = await request(app)
      .post('/profile')
      .send({
        userId: 16,
        name: 'Archibald Humphrey',
        address1: '4300 Martin Luther King Blvd',
        address2: '',
        city: 'Houston',
        state: 'TX',
        zipcode: '77204'
      });
      expect(response.status).toBe(200);
  });

  it('should return an error for a blank full name', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: '',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid full name', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank address1', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid address1', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });    

  it('should return an error for an invalid address2', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      city: 'Houston',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank city', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: '',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a invalid city', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      state: 'TX',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank state', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: '',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a invalid state', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      zipcode: '77204'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for a blank zipcode', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: ''
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid zipcode', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '7720'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid zipcode w/ letters', async () => {
    const response = await request(app)
    .post('/profile')
    .send({
      userId: 16,
      name: 'Archibald Humphrey',
      address1: '4300 Martin Luther King Blvd',
      address2: '', 
      city: 'Houston',
      state: 'TX',
      zipcode: '7720a'
    });
    expect(response.status).toBe(500);
  });
});

describe('Fuel Rate Route', () => {
  it('should return the calculated fuel rate', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote')
    .send({
      userId: 2,
      gallonsRequested: 5000,
      address: '4300 Martin Luther King Blvd',
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalPrice: 50000000
    });
    expect(response.status).toBe(200);
  });

  it('should return an error for an invalid gallons req', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote')
    .send({
      userId: 2,
      gallonsRequested: 0,
      address: '4300 Martin Luther King Blvd', 
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalPrice: 15000
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid delivery date', async () => {
    const response = await request(app)
    .post('/fuelrate/getquote')
    .send({
      userId: 2,
      gallonsRequested: 5000,
      address: '4300 Martin Luther King Blvd', 
      deliveryDate: '1776-02-16',
      suggestedPrice: 10000,
      totalPrice: 15000
    });
    expect(response.status).toBe(500);
  });

  it('should successfully save the fuel quote', async () => {
    const response = await request(app)
    .post('/fuelrate/savequote')
    .send({
      userId: 2,
      gallonsRequested: 5000,
      address: '4300 Martin Luther King Blvd',
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalPrice: 50000000,
    });
    expect(response.status).toBe(200);
  });

  it('should return a error for unsuccessful form saving', async () => {
    const response = await request(app)
    .post('/fuelrate/savequote')
    .send({
      gallonsRequested: 5000,
      address: '4300 Martin Luther King Blvd',
      deliveryDate: '2025-02-16',
      suggestedPrice: 10000,
      totalPrice: 50000000
    });
    expect(response.status).toBe(500);
  });


});

function generateRandomUsername() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomUsername = '';
  for (let i = 0; i < 8; i++) {
    randomUsername += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomUsername;
}

describe('Signup Route', () => {
  it('should return a successful sign up creation', async () => {
    const username = generateRandomUsername();
    
    const response = await request(app)
      .post('/signup')
      .send({
        username: username,
        password: 'lefuelrate',
      });
    expect(response.status).toBe(200);
  });

  it('should return an error for username that already exists', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'johnny',
      password: '12345'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for invalid username', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fuel tracker',
      password: 'lepookie123'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for long username', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fueltrackerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
      password: 'lepookie123'
    });
    expect(response.status).toBe(500);
  });

  it('should return an error for an invalid password', async () => {
    const response = await request(app)
    .post('/signup')
    .send({
      username: 'fueltracker',
      password: 'lepookie123111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
    });
    expect(response.status).toBe(500);
  });
})