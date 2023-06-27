import * as tenderService from '../services/tender.js';

export const getAll = async(req, res) => {
  try {
    const result = await tenderService.getAll();

    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const add = async(req, res) => {
  const { _id: user } = req.user;

  const newTender = {
    ...req.body,
    createdBy: user,
  };

  try {
    const result = await tenderService.add(newTender);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async(req, res) => {
  const { tenderId } = req.params;

  try {
    const result = await tenderService.getById(tenderId);

    if (!result) {
      return res.sendStatus(404);
    }

    res.send(result);
  } catch (error) {
    res.sendStatus(404);
  }
};

export const remove = async(req, res) => {
  const { tenderId } = req.params;

  try {
    const result = await tenderService.getById(tenderId);

    if (!result) {
      return res.sendStatus(404);
    }

    await tenderService.remove(tenderId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

export const update = async(req, res) => {
  const { tenderId } = req.params;

  try {
    const result = await tenderService.update(
      { _id: tenderId },
      { ...req.body },
      { new: true },
    );

    if (!result) {
      res.sendStatus(404);
    }

    res.send(result);
  } catch (error) {

  }
};
