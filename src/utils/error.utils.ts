export const handleError = (res: any, error: any) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  };
  