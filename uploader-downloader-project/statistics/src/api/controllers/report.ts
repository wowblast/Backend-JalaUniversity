

export const createReport = async (req, res): Promise<void> => {
  try {
    res.json({createReport:'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteReport = async (req, res): Promise<void> => {
  try {
    res.json({deleteReport:'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};


export const updateReport = async (req, res): Promise<void> => {
  try {
    res.json({updateReport:'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};


export const getReport = async (req, res): Promise<void> => {
  try {
    res.json({getReport:'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};

