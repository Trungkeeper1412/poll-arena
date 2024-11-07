import { _saveQuestion } from "../_DATA";

describe("_saveQuestion", () => {
  it("Should return expected fields  when correctly data is passed to the function.", async () => {
    const data = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "user123",
    };

    const result = await _saveQuestion(data);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("author", data.author);
    expect(result).toHaveProperty("optionOne.text", data.optionOneText);
    expect(result).toHaveProperty("optionTwo.text", data.optionTwoText);
    expect(result.optionOne.votes).toEqual([]);
    expect(result.optionTwo.votes).toEqual([]);
  });

  it("Should return an error if incorrect data is passed to the function.", async () => {
    const data = {
      optionOneText: "Option One",
    };

    await expect(_saveQuestion(data)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
