export const postColor = async (req, res) => {
  try {
    // if (!req.body) return res.json({ error: "Form Data is not provided" });

    // const color = req.body;
    // console.log(color);
    // res.json({
    //   color: `${req.body.color}`,
    // });
    const color = await req.json();
    return res.json({ color: `this is color ${color.color}` });
    // console.log(color.color);
  } catch (error) {
    res.json({ error: "Error while posting" });
  }
};
