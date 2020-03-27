const Trade = require('../../models/Trade');
const User = require('../../models/User');

const getAllTrades = async (req, res) => {
    const events = await Trade.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        }
      ],
      order: [['id']],
    });
    return res.status(200).send(events);
  };
  
const createTrade = async (trade) => {
    const {
      id, type, user, symbol, shares, price, timestamp
    } = trade;
    await Trade.create({
      id,
      type,
      symbol,
      shares,
      price,
      timestamp,
      userId: user.id
    });
  };
  
  const createUser = async (user) => {
    const { id, name } = user;
    await User.create({
      id,
      name
    });
  };
  
  
  const addTrade = async (req, res, next) => {
    // basic same id check, if present return 400
    // else insert
    const { id, user } = req.body;
    const [userInDB, tradeInDB] = await Promise.all([
      User.findByPk(user.id),
      Trade.findByPk(id)
    ]);
    if (tradeInDB) {
      return res.status(400).send({});
    }
    // check this event
    if (!userInDB) {
      await createUser(actor);
    }
    await createTrade(req.body);
    return res.status(201).send({});
  };

const deleteTrades = async (req, res) => {
  await Promise.all([
    Trade.destroy({
      where: {},
      truncate: true,
    }),
    User.destroy({
      where: {},
      truncate: true,
    })
  ]);

  return res.status(200).send({});
};

const getByUser = async (req, res) => {
    // 404 if actor does not exist
    // return all the events
    const { id } = req.params;
    const trades = await Trade.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        }
      ],
      order: [['id']],
    });
    return res.status(200).send(trades);
  };

module.exports = {
  getAllTrades,
  addTrade,
  getByUser,
  deleteTrades
};