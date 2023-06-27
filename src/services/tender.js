import Tender from '../models/tender.js';

export const getAll = async() => {
  try {
    const result = await Tender.find();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getById = async(tenderId) => {
  try {
    const result = await Tender.findById(tenderId);

    return result;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

export const add = async(tenderData) => {
  try {
    const result = await Tender.create(tenderData);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const remove = async(tenderId) => {
  console.log('services tenedr id===>>>', tenderId);

  try {
    await Tender.findByIdAndRemove(tenderId);
  } catch (error) {
    throw new Error('Tender not found');
  }
};

export const update = async(tenderId, tenderData) => {
  try {
    const result = await Tender.findOneAndUpdate(
      { _id: tenderId },
      tenderData,
      { new: true },
    );

    return result;
  } catch (error) {
    throw new Error('Tender not found');
  }
};

export const getTimeToUpdate = async() => {
  try {
    const firstToStartTender = await Tender
      .find({ status: 'scheduled' })
      .sort({ startTenderDate: 'ascending' })
      .limit(1);

    const firstToEndTender = await Tender
      .find({ status: 'active' })
      .sort({ endTenderDate: 'ascending' })
      .limit(1);

    const firsTimeStart = firstToStartTender[0]?.startTenderDate.getTime();
    const firstTimeEnd = firstToEndTender[0]?.endTenderDate.getTime();

    console.log('firsTimeStart --->', firsTimeStart);
    console.log('firstTimeEnd --->', firstTimeEnd);

    if (firsTimeStart === undefined) {
      console.log('firsTimeStart === undefined --->'
        , firsTimeStart === undefined
        , 'firstTimeEnd - (new Date()).getTime() --->'
        , firstTimeEnd - (new Date()).getTime());

      return firstTimeEnd - (new Date()).getTime();
    }

    if (firstTimeEnd === undefined) {
      console.log('firstTimeEnd === undefined --->'
        , firstTimeEnd === undefined
        , 'firsTimeStart - (new Date()).getTime() --->'
        , firsTimeStart - (new Date()).getTime());

      return firsTimeStart - (new Date()).getTime();
    }

    if (firsTimeStart > firstTimeEnd) {
      console.log('firsTimeStart > firstTimeEnd --->'
        , firsTimeStart > firstTimeEnd
        , 'firstTimeEnd - firstTimeEnd --->'
        , firstTimeEnd - firstTimeEnd);

      return firsTimeStart - firstTimeEnd;
    }

    if (firstTimeEnd > firsTimeStart) {
      console.log('firstTimeEnd > firsTimeStart --->'
        , firstTimeEnd > firsTimeStart
        , 'firstTimeEnd - firsTimeStart --->'
        , firstTimeEnd - firsTimeStart);

      return firstTimeEnd - firsTimeStart;
    }
  } catch (error) {
    console.error('Error updating tender status:', error);
  }
};

export const startTenderUpdater = async() => {
  const updateTenders = async() => {
    // const currentDate = new Date(formatDate(new Date())).getTime();
    const currentDate = new Date().getTime();

    console.log('currentDate --->', currentDate);
    // const currentDate = new Date().toUTCString().getTime(true);

    const tenders = await Tender.find();

    tenders.forEach((tender) => {
      const startDate = tender.startTenderDate.getTime();
      const endDate = tender.endTenderDate.getTime();

      console.log(`startDate ---> ${startDate}`);
      console.log(`endDate ---> ${endDate}`);

      console.log(`currentDate >= startDate ---> ${currentDate >= startDate}`);
      console.log(`currentDate >= endDate ---> ${currentDate >= endDate}`);

      if (startDate <= currentDate) {
        console.log(`${tender.tenderNumber} status ---> 'active'`);

        // console.log('startDate <= currentDate'
        //   , startDate <= currentDate < endDate);

        tender.status = 'active';
      }

      if (currentDate >= endDate) {
        console.log(`${tender.tenderNumber} status ---> 'archived'`);

        // console.log('currentDate >= endDate'
        //   , currentDate >= endDate);

        tender.status = 'archived';
      }

      tender.save();
    });
  };

  updateTenders();

  let number = await getTimeToUpdate();

  if (number < 0 || isNaN(number)) {
    number = 600000;
  }

  console.log('number --->', number);

  setTimeout(startTenderUpdater, number);
};
