import { rest } from 'msw';

const SLOWNESS = 1;

const ORDER_IDS = [
  [1, 2],
  [3, 4, 5],
];

setInterval(() => {
  const CHANCE = 0.1;
  const random = Math.random();
  const [giver, receiver] =
    random < CHANCE ? [0, 1] : random > 1 - CHANCE ? [1, 0] : [null, null];
  if (giver != null && receiver != null) {
    const pop = ORDER_IDS[giver].pop();
    if (pop) ORDER_IDS[receiver].push(pop);
  }
}, 10000);

export const handlers = [
  rest.get('/api/fetch_header_data', (req, res, ctx) => {
    return res(
      ctx.delay(5000 * SLOWNESS),
      ctx.json({
        data: 'Header Data Fetched',
      })
    );
  }),

  rest.get('/api/fetch_product_list', (req, res, ctx) => {
    const PRODUCT_IDS = Array.from({ length: 10 }).map(
      () => ~~(Math.random() * 100)
    );

    return res(
      ctx.delay(3500 * SLOWNESS),
      ctx.json({
        data: PRODUCT_IDS,
      })
    );
  }),

  rest.get('/api/fetch_product_detail', (req, res, ctx) => {
    return res(
      ctx.delay(1000 * SLOWNESS),
      ctx.json({
        data: 'ProductId',
      })
    );
  }),

  rest.get('/api/fetch_order_list', (req, res, ctx) => {
    const orderIds = () => {
      switch (req.url.searchParams.get('tab')) {
        case '2':
          return ORDER_IDS[0];
        case '3':
          return ORDER_IDS[1];
        case '1':
        default:
          return ORDER_IDS.flat();
      }
    };

    return res(
      ctx.delay(3000 * SLOWNESS),
      ctx.json({
        data: orderIds(),
      })
    );
  }),

  rest.get('/api/fetch_order_count', (req, res, ctx) => {
    return res(
      ctx.delay(2000 * SLOWNESS),
      ctx.json({
        data: [ORDER_IDS[0].length, ORDER_IDS[1].length],
      })
    );
  }),

  rest.get('/api/fetch_order_detail', (req, res, ctx) => {
    return res(
      ctx.delay(2000 * SLOWNESS),
      ctx.json({
        data: 'order_Id',
      })
    );
  }),
];
