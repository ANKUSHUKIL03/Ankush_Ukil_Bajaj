const express = require("express");
const app = express();

app.use(express.json());

function alternateCapsReverse(arr) {
  let str = arr.join("");
  let reversed = str.split("").reverse().join("");
  let result = "";
  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      result += reversed[i].toUpperCase();
    } else {
      result += reversed[i].toLowerCase();
    }
  }
  return result;
}

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    try {
      const data = req.body.data || [];
      const even_numbers = [];
      const odd_numbers = [];
      const alphabets = [];
      const special_characters = [];
      let sum = 0;

      for (const item of data) {
        if (/^-?\d+$/.test(item)) {
          
          let num = parseInt(item);
          if (num % 2 === 0) {
            even_numbers.push(item);
          } else {
            odd_numbers.push(item);
          }
          sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
          
          alphabets.push(item.toUpperCase());
        } else {
          // special chars
          special_characters.push(item);
        }
      }

      const concat_string = alternateCapsReverse(alphabets);

      res.status(200).json({
        is_success: true,
        user_id: "ankush_ukil_15122003", 
        email: "ukilankushjob@gmail.com",
        roll_number: "22BIT0179",
        odd_numbers: odd_numbers,
        even_numbers: even_numbers,
        alphabets: alphabets,
        special_characters: special_characters,
        sum: sum.toString(),
        concat_string: concat_string,
      });
    } catch (err) {
      res.status(500).json({
        is_success: false,
        message: err.message,
      });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
