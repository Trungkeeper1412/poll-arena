import { _saveQuestionAnswer } from "../_DATA";

describe("_saveQuestionAnswer", () => {
  it("should return true when correct data is passed to the function", async () => {
    const data = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    const result = await _saveQuestionAnswer(data);
    expect(result).toBe(true);
  });

  it("should return an error when incorrect data is passed to the function", async () => {
    const data = {
      authedUser: "user123",
    };

    await expect(_saveQuestionAnswer(data)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
