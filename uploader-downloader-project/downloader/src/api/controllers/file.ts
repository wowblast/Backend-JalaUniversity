

export const downloadFile = async (req, res): Promise<void> => {
  try {
    res.json({uploadFile: 'pending', status: 'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const listFile = async (req, res): Promise<void> => {
  try {
    res.json({list: [], status: 'ok'});
  } catch (err) {
    res.status(500).send(err);
  }
};

