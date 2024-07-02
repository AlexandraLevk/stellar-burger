const testUrl = 'http://localhost:4000';

describe('проверяем работу конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });

  it('добавление булки', () => {
    cy.getBun().contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="constructor-bun-2"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('добавление начинки', () => {
    cy.getMain().contains('Добавить').click();
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('открытие модального окна ингредиента', () => {
    cy.getMain()
      .contains('Биокотлета из марсианской Магнолии')
      .click();
    cy.contains('Детали ингредиента').should('exist');
    cy.getModal()
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
  });

  it('закрытие модального окна по крестику', () => {
    cy.getMain()
      .contains('Биокотлета из марсианской Магнолии')
      .click();
    cy.contains('Детали ингредиента').should('exist');
    cy.getCloseButton().click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрытие модального окна по оверлею', () => {
    cy.getMain()
      .contains('Биокотлета из марсианской Магнолии')
      .click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy="overlay"]').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('проверяем авторизацию и создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.setCookie('accessToken', 'testAccessToken');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.visit(testUrl);
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
  });

  it('создание заказа', () => {
    cy.getBun().contains('Добавить').click();
    cy.getMain().contains('Добавить').click();
    cy.get('[data-cy=sauce]').contains('Добавить').click();
    cy.get('[data-cy="order-button"]').contains('Оформить заказ').click();
    cy.getModal().contains('11111').should('exist');
    cy.getCloseButton().click();
    cy.contains('11111').should('not.exist');
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
